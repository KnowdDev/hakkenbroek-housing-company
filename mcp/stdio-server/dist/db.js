import { Pool, types } from 'pg';
// Parse DECIMAL / NUMERIC as numbers
types.setTypeParser(1700, (val) => parseFloat(val));
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    max: 10,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 10000,
    ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : undefined,
});
export async function query(text, params) {
    const start = Date.now();
    try {
        const result = await pool.query(text, params);
        console.error(`[QUERY] ${text.substring(0, 80)} | ${Date.now() - start}ms`);
        return { rows: result.rows, rowCount: result.rowCount };
    }
    catch (err) {
        console.error(`[DB ERROR] ${text.substring(0, 120)} | ${err instanceof Error ? err.message : String(err)}`);
        throw err;
    }
}
export async function shutdown() {
    await pool.end();
}
