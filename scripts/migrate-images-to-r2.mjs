import { S3Client, PutObjectCommand, ListObjectsV2Command } from '@aws-sdk/client-s3';
import { Pool } from 'pg';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const R2_ACCOUNT_ID = '19a84e3c6953b94b400408ca5a605c0d';
const BUCKET = 'hakkenbroek-listing-images';
const R2_ENDPOINT = `https://${R2_ACCOUNT_ID}.r2.cloudflarestorage.com`;
const PUBLIC_BASE = 'https://pub-91c40fba6497449ab096d3657b550a87.r2.dev';

const s3 = new S3Client({
  region: 'auto',
  endpoint: R2_ENDPOINT,
  credentials: {
    accessKeyId: '29691397d72d4f63eaa89676ae476de4',
    secretAccessKey: '73315842a872e9bb667016c4f7742a013e2f00f7b9c0db9d524ed1003ba409c1',
  },
});

const pool = new Pool({
  connectionString: 'postgresql://neondb_owner:npg_GEonZ8peVD6j@ep-icy-glitter-al0foo46-pooler.c-3.eu-central-1.aws.neon.tech/neondb?channel_binding=require&sslmode=require',
  max: 2,
  ssl: { rejectUnauthorized: false },
});

// Public CDN URL for R2
function getPublicUrl(key) {
  return `${PUBLIC_BASE}/${key}`;
}

async function downloadImage(url) {
  const response = await fetch(url, { timeout: 30000 });
  if (!response.ok) throw new Error(`HTTP ${response.status}: ${url}`);
  const buffer = await response.arrayBuffer();
  return Buffer.from(buffer);
}

async function uploadToR2(key, buffer, contentType) {
  const cmd = new PutObjectCommand({
    Bucket: BUCKET,
    Key: key,
    Body: buffer,
    ContentType: contentType || 'image/jpeg',
  });
  await s3.send(cmd);
}

async function migrate() {
  const client = await pool.connect();
  try {
    const result = await client.query(
      "SELECT id, title, image_url FROM listings WHERE image_url IS NOT NULL AND image_url != ''"
    );

    const listings = result.rows;
    console.log(`Found ${listings.length} listings with images`);

    // Also handle images JSONB array
    const withGallery = await client.query(
      "SELECT id, title, images FROM listings WHERE images IS NOT NULL"
    );
    console.log(`Found ${withGallery.rows.length} listings with gallery images`);

    // Track success/failure
    let success = 0;
    let failed = 0;

    for (const listing of listings) {
      const imageUrl = listing.image_url;
      if (!imageUrl) continue;

      const ext = path.extname(new URL(imageUrl).pathname) || '.jpg';
      const key = `listings/${listing.id}/main${ext}`;

      try {
        const buffer = await downloadImage(imageUrl);
        await uploadToR2(key, buffer, 'image/jpeg');
        const publicUrl = getPublicUrl(key);

        // Update DB
        await client.query(
          'UPDATE listings SET image_url = $1 WHERE id = $2',
          [publicUrl, listing.id]
        );

        console.log(`✓ Migrated listing ${listing.id}: ${publicUrl}`);
        success++;
      } catch (err) {
        console.error(`✗ Failed listing ${listing.id}: ${err.message}`);
        failed++;
      }

      // Small delay to be nice to the source server
      await new Promise(r => setTimeout(r, 200));
    }

    // Migrate gallery images
    for (const listing of withGallery.rows) {
      const images = typeof listing.images === 'string' ? JSON.parse(listing.images) : listing.images;
      if (!Array.isArray(images) || images.length === 0) continue;

      const newImages = [];
      for (let i = 0; i < images.length; i++) {
        const imgUrl = images[i];
        if (!imgUrl || imgUrl.includes('.r2.dev')) { newImages.push(imgUrl); continue; }

        const ext = path.extname(new URL(imgUrl).pathname) || '.jpg';
        const key = `listings/${listing.id}/gallery-${i}${ext}`;

        try {
          const buffer = await downloadImage(imgUrl);
          await uploadToR2(key, buffer, 'image/jpeg');
          newImages.push(getPublicUrl(key));
          await new Promise(r => setTimeout(r, 200));
        } catch (err) {
          console.error(`✗ Gallery image failed for ${listing.id}: ${err.message}`);
          newImages.push(imgUrl); // keep original on failure
        }
      }

      await client.query(
        'UPDATE listings SET images = $1::jsonb WHERE id = $2',
        [JSON.stringify(newImages), listing.id]
      );
      console.log(`✓ Migrated gallery for listing ${listing.id}`);
    }

    console.log(`\nMigration complete: ${success} succeeded, ${failed} failed`);
  } finally {
    client.release();
    await pool.end();
  }
}

migrate().catch(err => {
  console.error(err);
  process.exit(1);
});
