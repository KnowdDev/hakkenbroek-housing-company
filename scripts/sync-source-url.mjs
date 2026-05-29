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
    const existingResult = await client.query('SELECT id, title FROM listings');
    const existingMap = new Map(existingResult.rows.map(r => [r.title, r.id]));

    for (const item of scraped) {
      const id = existingMap.get(item.title);
      if (!id) continue;

      // Sync source_url and clear incorrect year_built
      await client.query(
        'UPDATE listings SET source_url = $1, year_built = NULL WHERE id = $2',
        [item.detailUrl, id]
      );
      console.log(`Updated source_url for ${item.title} (id=${id})`);
    }

    // Also clear year_built for any listing where it was set to 2006 from our bulk create
    const res = await client.query(
      "UPDATE listings SET year_built = NULL WHERE year_built = 2006 AND source_url IS NOT NULL"
    );
    console.log(`Cleared incorrect year_built for ${res.rowCount} listings`);

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
