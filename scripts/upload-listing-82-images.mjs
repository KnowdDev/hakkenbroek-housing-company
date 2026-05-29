import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { Pool } from 'pg';

const R2_ACCOUNT_ID = '19a84e3c6953b94b400408ca5a605c0d';
const BUCKET = 'hakkenbroek-listing-images';
const R2_ENDPOINT = `https://${R2_ACCOUNT_ID}.r2.cloudflarestorage.com`;
const PUBLIC_BASE = 'https://pub-91c40fba6497449ab096d3657b550a87.r2.dev';

const LISTING_ID = 82;
// High-resolution Funda source images (1440x960)
const SOURCE = [
  'https://cloud.funda.nl/valentina_media/221/766/528_1440x960.jpg',
  'https://cloud.funda.nl/valentina_media/221/766/530_1440x960.jpg',
  'https://cloud.funda.nl/valentina_media/221/766/533_1440x960.jpg',
  'https://cloud.funda.nl/valentina_media/221/766/538_1440x960.jpg',
  'https://cloud.funda.nl/valentina_media/221/766/541_1440x960.jpg',
  'https://cloud.funda.nl/valentina_media/221/766/543_1440x960.jpg',
];

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

async function download(url) {
  const res = await fetch(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120 Safari/537.36',
      'Referer': 'https://www.funda.nl/',
      'Accept': 'image/avif,image/webp,image/png,image/jpeg,*/*',
    },
  });
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);
  return Buffer.from(await res.arrayBuffer());
}

async function upload(key, buffer) {
  await s3.send(new PutObjectCommand({
    Bucket: BUCKET, Key: key, Body: buffer, ContentType: 'image/jpeg',
  }));
  return `${PUBLIC_BASE}/${key}`;
}

async function run() {
  const gallery = [];
  let mainUrl = null;

  for (let i = 0; i < SOURCE.length; i++) {
    const buf = await download(SOURCE[i]);
    if (i === 0) {
      mainUrl = await upload(`listings/${LISTING_ID}/main.jpg`, buf);
      console.log(`main -> ${mainUrl} (${buf.length} bytes)`);
    }
    const key = `listings/${LISTING_ID}/gallery-${i}.jpg`;
    const url = await upload(key, buf);
    gallery.push(url);
    console.log(`gallery-${i} -> ${url} (${buf.length} bytes)`);
  }

  const client = await pool.connect();
  try {
    await client.query(
      'UPDATE listings SET image_url = $1, images = $2::jsonb WHERE id = $3',
      [mainUrl, JSON.stringify(gallery), LISTING_ID]
    );
    console.log(`\nDB updated for listing ${LISTING_ID}: 1 main + ${gallery.length} gallery images`);
  } finally {
    client.release();
    await pool.end();
  }
}

run().catch((e) => { console.error(e); process.exit(1); });
