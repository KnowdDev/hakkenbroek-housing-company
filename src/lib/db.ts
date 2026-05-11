import { Pool, types } from 'pg';

// Parse DECIMAL / NUMERIC as numbers instead of strings
// OID 1700 = numeric/decimal in PostgreSQL
// eslint-disable-next-line @typescript-eslint/no-explicit-any
types.setTypeParser(1700 as any, (val: string) => parseFloat(val));

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export async function query(text: string, params?: any[]) {
  const start = Date.now();
  try {
    const res = await pool.query(text, params);
    const duration = Date.now() - start;
    console.log('Executed query', { text, duration, rows: res.rowCount });
    return res;
  } catch (error) {
    console.error('Database query error:', error);
    throw error;
  }
}

export default pool;
