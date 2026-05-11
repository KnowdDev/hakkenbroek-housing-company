const { Client } = require('pg');

const demoListings = [
  {
    id: 1,
    title: "Canal House on Prinsengracht",
    description: "An extraordinary 17th-century canal house on Prinsengracht, recently restored to its original grandeur. This 285m² residence features four bedrooms, three bathrooms, a private garden, and uninterrupted canal views. Original marble fireplaces, ornate ceiling roses, and hand-crafted oak floors have been meticulously preserved. The gourmet kitchen opens onto a south-facing terrace. A rare opportunity to own one of Amsterdam's most prestigious addresses.",
    price: 3250000,
    bedrooms: 4,
    bathrooms: 3,
    area: 285,
    address: "Prinsengracht 287",
    city: "Amsterdam",
    postal_code: "1016 HR",
    property_type: "house",
    status: "available",
    listing_type: "sale",
    image_url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600573472592-401b489a3cdc?auto=format&fit=crop&w=1200&q=80",
    ],
    featured: true,
    created_at: "2026-04-15T10:00:00Z",
    year_built: 1685,
    energy_label: "D",
    floors: 4,
    furnished: false,
    garden: true,
    garden_area: 45,
    balcony: false,
    terrace: true,
    parking: false,
    elevator: false,
    basement: true,
  },
  {
    id: 2,
    title: "Penthouse at Zuidas Towers",
    description: "A breathtaking 210m² penthouse in the heart of Amsterdam's financial district. Floor-to-ceiling windows frame panoramic city views, while the 80m² rooftop terrace with private jacuzzi offers an unparalleled entertaining space. Three ensuite bedrooms, a Bulthaup kitchen, and smart home automation throughout. Two private parking spaces included.",
    price: 2850000,
    bedrooms: 3,
    bathrooms: 3,
    area: 210,
    address: "Gustav Mahlerlaan 1020",
    city: "Amsterdam",
    postal_code: "1082 MA",
    property_type: "penthouse",
    status: "available",
    listing_type: "sale",
    image_url: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600607687644-c7171b42498b?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80",
    ],
    featured: true,
    created_at: "2026-04-10T10:00:00Z",
    year_built: 2020,
    energy_label: "A+",
    floors: 1,
    furnished: false,
    garden: false,
    balcony: false,
    terrace: true,
    parking: true,
    parking_spaces: 2,
    elevator: true,
    basement: true,
  },
  {
    id: 3,
    title: "Jordaan Boutique Apartment",
    description: "A beautifully designed 125m² apartment in the historic Jordaan district. This two-bedroom residence blends modern Scandinavian design with original Amsterdam architectural details. Exposed brick walls, a mezzanine study, and a curated art collection make this a truly unique home. Steps from the Noordermarkt and the best cafés in the city.",
    price: 1250000,
    bedrooms: 2,
    bathrooms: 2,
    area: 125,
    address: "Elandsgracht 56",
    city: "Amsterdam",
    postal_code: "1016 SG",
    property_type: "apartment",
    status: "available",
    listing_type: "sale",
    image_url: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80",
    ],
    featured: false,
    created_at: "2026-04-08T10:00:00Z",
    year_built: 1890,
    energy_label: "C",
    floors: 2,
    furnished: true,
    garden: false,
    balcony: true,
    terrace: false,
    parking: false,
    elevator: false,
    basement: false,
  },
];

const client = new Client({
  connectionString: process.argv[2],
  connectionTimeoutMillis: 15000,
  query_timeout: 15000,
});

async function seed() {
  await client.connect();
  await client.query('DELETE FROM listings');
  console.log('Cleared existing listings');

  for (const l of demoListings) {
    const images = l.images ? JSON.stringify(l.images) : null;
    await client.query(
      `INSERT INTO listings (
        title, description, price, bedrooms, bathrooms, area, address, city, postal_code,
        property_type, status, listing_type, image_url, featured, images,
        year_built, energy_label, garden, garden_area, parking, parking_spaces,
        balcony, terrace, furnished, basement, elevator, floors
      ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,$21,$22,$23,$24,$25,$26,$27)`,
      [
        l.title, l.description, l.price, l.bedrooms, l.bathrooms, l.area,
        l.address, l.city, l.postal_code, l.property_type, l.status,
        l.listing_type || 'sale', l.image_url, l.featured, images,
        l.year_built, l.energy_label, l.garden, l.garden_area,
        l.parking, l.parking_spaces, l.balcony, l.terrace,
        l.furnished, l.basement, l.elevator, l.floors
      ]
    );
    console.log('Inserted:', l.title);
  }

  console.log('All listings seeded');
  await client.end();
}

seed().catch(e => {
  console.error('Error:', e.message);
  client.end().catch(() => {});
  process.exit(1);
});
