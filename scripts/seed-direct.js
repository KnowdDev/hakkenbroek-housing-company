const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgresql://lexvergroesen@localhost:5432/hakkenbroek_housing',
});

const listings = [
  {
    title: "Jacob Catskade 51-2, Amsterdam",
    description: "Elegant upper-floor apartment (dubbel bovenhuis) in the Frederik Hendrikbuurt-Noord, built in 1903 with energy label A. This 68m² residence features 3 bedrooms, 2 bathrooms plus a separate toilet, and spans 2 floors plus an attic. The home boasts both a roof terrace and a balcony, with 14m² of building-bound outdoor space and 24m² external storage. The property is on municipal leasehold (€3,828/year) with a VvE contribution of €163.55/month. Parking is paid with permit options.",
    price: 600000,
    bedrooms: 3,
    bathrooms: 2,
    area: 68,
    address: "Jacob Catskade 51-2",
    city: "Amsterdam",
    postal_code: "1052 BV",
    property_type: "apartment",
    status: "available",
    listing_type: "sale",
    image_url: "https://cloud.funda.nl/valentina_media/221/766/528.jpg?options=width=1200",
    images: ["https://cloud.funda.nl/valentina_media/221/766/528.jpg?options=width=1200"],
    featured: true,
    year_built: 1903,
    energy_label: "A",
    garden: false,
    parking: true,
    parking_spaces: 1,
    balcony: true,
    terrace: true,
    furnished: false,
    basement: false,
    elevator: false,
    floors: 2
  },
  {
    title: "Van Linschotenlaan 12, Hilversum",
    description: "Beautiful family home in Hilversum, successfully sold by Hakkenbroek Housing Company on 9 January 2026.",
    price: 385000,
    bedrooms: 3,
    bathrooms: 1,
    area: 110,
    address: "Van Linschotenlaan 12",
    city: "Hilversum",
    postal_code: "1213 CG",
    property_type: "house",
    status: "sold",
    listing_type: "sale",
    image_url: "https://cloud.funda.nl/valentina_media/216/649/506.jpg?options=width=1200",
    images: ["https://cloud.funda.nl/valentina_media/216/649/506.jpg?options=width=1200"],
    featured: false,
    year_built: 1965,
    energy_label: "C",
    garden: true,
    parking: true,
    parking_spaces: 1,
    balcony: false,
    terrace: false,
    furnished: false,
    basement: false,
    elevator: false,
    floors: 2
  },
  {
    title: "Eem 87, Huizen",
    description: "Attractive upper-floor apartment behind the Zomerkade, close to the water. The layout features an entrance on the ground floor with hall, wardrobe, hallway with guest toilet, and storage with washing machine. Stairs lead to the first floor with landing, spacious and bright living room with south-facing windows, separate kitchen with gas stove, oven, dishwasher, fridge and freezer, plus a lovely loggia on the front and side (southwest). The second floor offers a large bedroom, a smaller second bedroom/study, and a bathroom with shower. External storage for 2-3 bicycles. No upstairs or downstairs neighbors. Parking available in front of the building. The beach at Zomerkade is within 2 minutes walking distance, and the Regioliner bus stop is 5 minutes away. Available immediately. Deposit: €3,000.",
    price: 1650,
    bedrooms: 2,
    bathrooms: 1,
    area: 92,
    address: "Eem 87",
    city: "Huizen",
    postal_code: "1273 PE",
    property_type: "apartment",
    status: "available",
    listing_type: "rent",
    image_url: "https://cloud.funda.nl/valentina_media/226/227/107.jpg?options=width=1200",
    images: ["https://cloud.funda.nl/valentina_media/226/227/107.jpg?options=width=1200","https://cloud.funda.nl/valentina_media/226/227/110.jpg?options=width=1200"],
    featured: true,
    year_built: 1985,
    energy_label: "",
    garden: false,
    parking: true,
    parking_spaces: 1,
    balcony: false,
    terrace: true,
    furnished: false,
    basement: false,
    elevator: false,
    floors: 3
  },
  {
    title: "Scheldebuurt Family Rental, Amsterdam",
    description: "Spacious furnished family home in the popular Scheldebuurt neighborhood of Amsterdam. Ideal for expat families seeking a comfortable rental with excellent connections to the city center and Zuidas business district.",
    price: 3250,
    bedrooms: 3,
    bathrooms: 2,
    area: 127,
    address: "Scheldebuurt",
    city: "Amsterdam",
    postal_code: "1078 DN",
    property_type: "house",
    status: "available",
    listing_type: "rent",
    image_url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
    images: ["https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80"],
    featured: false,
    year_built: 1925,
    energy_label: "B",
    garden: true,
    parking: false,
    parking_spaces: 0,
    balcony: true,
    terrace: false,
    furnished: true,
    basement: true,
    elevator: false,
    floors: 3
  },
  {
    title: "Osdorp-Oost Apartment, Amsterdam",
    description: "Comfortable furnished apartment in Osdorp-Oost, perfect for expats or small families. Close to shops, parks, and public transport connections to Amsterdam city center.",
    price: 2200,
    bedrooms: 2,
    bathrooms: 1,
    area: 85,
    address: "Osdorp-Oost",
    city: "Amsterdam",
    postal_code: "1068 ST",
    property_type: "apartment",
    status: "available",
    listing_type: "rent",
    image_url: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=80",
    images: ["https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=80"],
    featured: false,
    year_built: 1970,
    energy_label: "C",
    garden: false,
    parking: true,
    parking_spaces: 1,
    balcony: true,
    terrace: false,
    furnished: true,
    basement: false,
    elevator: true,
    floors: 1
  },
  {
    title: "Grachtengordel-West Canal Apartment, Amsterdam",
    description: "Exceptional furnished canal apartment in the prestigious Grachtengordel-West. Experience authentic Amsterdam living with canal views, high ceilings, and period features. A rare rental opportunity in one of the city's most sought-after locations.",
    price: 4100,
    bedrooms: 3,
    bathrooms: 2,
    area: 140,
    address: "Grachtengordel-West",
    city: "Amsterdam",
    postal_code: "1015 DL",
    property_type: "apartment",
    status: "available",
    listing_type: "rent",
    image_url: "https://images.unsplash.com/photo-1600607687644-c7171b42498b?auto=format&fit=crop&w=1200&q=80",
    images: ["https://images.unsplash.com/photo-1600607687644-c7171b42498b?auto=format&fit=crop&w=1200&q=80"],
    featured: true,
    year_built: 1890,
    energy_label: "D",
    garden: false,
    parking: false,
    parking_spaces: 0,
    balcony: true,
    terrace: true,
    furnished: true,
    basement: true,
    elevator: false,
    floors: 2
  }
];

async function seed() {
  // Clear existing listings
  await pool.query('DELETE FROM listings');
  console.log('Cleared existing listings.');

  const columns = Object.keys(listings[0]).join(', ');
  const placeholders = Object.keys(listings[0]).map((_, i) => `$${i + 1}`).join(', ');
  const insertQuery = `INSERT INTO listings (${columns}) VALUES (${placeholders}) RETURNING id`;

  for (const listing of listings) {
    const row = { ...listing };
    if (Array.isArray(row.images)) row.images = JSON.stringify(row.images);
    const values = Object.values(row);
    const result = await pool.query(insertQuery, values);
    console.log(`Inserted: ${listing.title} (id=${result.rows[0].id})`);
  }

  const count = await pool.query('SELECT COUNT(*) FROM listings');
  console.log(`\nTotal listings in DB: ${count.rows[0].count}`);

  await pool.end();
}

seed().catch((err) => {
  console.error('Seed failed:', err);
  pool.end();
  process.exit(1);
});
