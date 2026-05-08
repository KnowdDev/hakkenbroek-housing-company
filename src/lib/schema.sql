-- Create enquiries table
CREATE TABLE IF NOT EXISTS enquiries (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50),
  message TEXT NOT NULL,
  property_id INTEGER,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create listings table
CREATE TABLE IF NOT EXISTS listings (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  price DECIMAL(15, 2),
  bedrooms INTEGER,
  bathrooms INTEGER,
  area INTEGER, -- in square meters
  address VARCHAR(255),
  city VARCHAR(100),
  postal_code VARCHAR(20),
  property_type VARCHAR(50), -- apartment, house, villa, etc.
  status VARCHAR(50) DEFAULT 'available', -- available, sold, rented
  image_url TEXT,
  featured BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create index on property_id for enquiries
CREATE INDEX IF NOT EXISTS idx_enquiries_property_id ON enquiries(property_id);

-- Create index on status for listings
CREATE INDEX IF NOT EXISTS idx_listings_status ON listings(status);
