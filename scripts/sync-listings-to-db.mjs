import { Pool } from 'pg';
import fs from 'fs';

const pool = new Pool({
  connectionString: 'postgresql://neondb_owner:npg_GEonZ8peVD6j@ep-icy-glitter-al0foo46-pooler.c-3.eu-central-1.aws.neon.tech/neondb?channel_binding=require&sslmode=require',
  max: 5,
  ssl: { rejectUnauthorized: false },
});

const scraped = JSON.parse(fs.readFileSync('./scripts/scraped-listings-clean.json', 'utf8'));

async function sync() {
  const client = await pool.connect();
  try {
    // Get existing listings to map titles to IDs
    const existingResult = await client.query('SELECT id, title FROM listings');
    const existingMap = new Map(existingResult.rows.map(r => [r.title, r.id]));

    for (const item of scraped) {
      const id = existingMap.get(item.title);
      if (!id) {
        console.warn(`No existing listing found for: ${item.title}`);
        continue;
      }

      // Build update fields
      const updates = [];
      const values = [];
      let idx = 1;

      const fields = [
        ['price', item.priceNumeric ? String(item.priceNumeric) : null],
        ['bedrooms', item.bedrooms],
        ['bathrooms', item.bathrooms],
        ['area', item.area],
        ['address', item.address],
        ['city', item.city],
        ['property_type', item.property_type],
        ['status', item.status],
        ['image_url', item.image],
        ['listing_type', item.listing_type],
        ['images', item.images ? JSON.stringify(item.images) : null],
        ['description', item.description],
      ];

      for (const [field, value] of fields) {
        if (value !== undefined && value !== null) {
          updates.push(`${field} = $${idx}`);
          values.push(value);
          idx++;
        }
      }

      if (updates.length === 0) continue;

      values.push(id);
      const sql = `UPDATE listings SET ${updates.join(', ')}, updated_at = CURRENT_TIMESTAMP WHERE id = $${idx}`;
      await client.query(sql, values);
      console.log(`Updated ${item.title} (id=${id})`);
    }

    console.log('Sync complete');
  } finally {
    client.release();
    await pool.end();
  }
}

sync().catch(err => {
  console.error(err);
  process.exit(1);
});
