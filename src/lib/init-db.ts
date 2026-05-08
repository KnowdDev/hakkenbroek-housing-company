import { Pool } from 'pg';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

async function initDatabase() {
  try {
    const schemaPath = join(__dirname, 'schema.sql');
    const schema = readFileSync(schemaPath, 'utf8');
    
    console.log('Creating database tables...');
    await pool.query(schema);
    console.log('Database tables created successfully!');
    
    // Insert sample data for testing
    console.log('Inserting sample listings...');
    await pool.query(`
      INSERT INTO listings (title, description, price, bedrooms, bathrooms, area, address, city, postal_code, property_type, status, featured)
      VALUES 
        ('Luxury Canal Apartment', 'Stunning 2-bedroom apartment overlooking the famous Amsterdam canals. Recently renovated with modern amenities.', 2500000, 2, 2, 85, 'Prinsengracht 123', 'Amsterdam', '1015 DN', 'apartment', 'available', true),
        ('Historic Canal House', 'Beautiful 17th-century canal house with original features. 4 bedrooms, spacious garden.', 3200000, 4, 3, 180, 'Keizersgracht 456', 'Amsterdam', '1015 CJ', 'house', 'available', true),
        ('Modern Studio in Jordaan', 'Cozy studio apartment in the trendy Jordaan neighborhood. Perfect for young professionals.', 185000, 1, 1, 45, 'Westerstraat 78', 'Amsterdam', '1015 LR', 'apartment', 'available', false)
      ON CONFLICT DO NOTHING
    `);
    console.log('Sample listings inserted!');
    
    await pool.end();
  } catch (error) {
    console.error('Error initializing database:', error);
    process.exit(1);
  }
}

initDatabase();
