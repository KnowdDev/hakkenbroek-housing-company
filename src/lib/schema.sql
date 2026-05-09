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

-- Create API keys table for MCP/agent access
CREATE TABLE IF NOT EXISTS api_keys (
  id SERIAL PRIMARY KEY,
  key_id VARCHAR(32) NOT NULL UNIQUE,
  name VARCHAR(255) NOT NULL,
  key_hash VARCHAR(128) NOT NULL,
  key_preview VARCHAR(64) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  last_used_at TIMESTAMP,
  revoked_at TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_api_keys_active ON api_keys(key_id, revoked_at);
