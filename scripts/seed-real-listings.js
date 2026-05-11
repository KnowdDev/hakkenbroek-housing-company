// Seed script for real Hakkenbroek listings scraped from Funda and Pararius
// Run with: node scripts/seed-real-listings.js
// Requires MCP_API_KEY or DASHBOARD_PASSWORD env var for auth

const API_KEY = process.env.MCP_API_KEY || process.env.DASHBOARD_PASSWORD;
const API_URL = 'http://localhost:3000/api/listings';

const listings = [
  // For Sale — scraped from Funda
  {
    title: "Jacob Catskade 51-2, Amsterdam",
    description: "Elegant upper-floor apartment (dubbel bovenhuis) in the Frederik Hendrikbuurt-Noord, built in 1903 with energy label A. This 68m² residence features 3 bedrooms, 2 bathrooms plus a separate toilet, and spans 2 floors plus an attic. The home boasts both a roof terrace and a balcony, with 14m² of building-bound outdoor space and 24m² external storage. The property is on municipal leasehold (€3,828/year) with a VvE contribution of €163.55/month. Parking is paid with permit options. Original period details combined with modern comfort make this a rare opportunity in one of Amsterdam's most charming neighborhoods.",
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
    images: [
      "https://cloud.funda.nl/valentina_media/221/766/528.jpg?options=width=1200"
    ],
    featured: true,
    year_built: 1903,
    energy_label: "A",
    garden: false,
    garden_area: 0,
    parking: true,
    parking_spaces: 1,
    balcony: true,
    terrace: true,
    furnished: false,
    basement: false,
    elevator: false,
    floors: 2
  },
  // Sold — scraped from Funda
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
    images: [
      "https://cloud.funda.nl/valentina_media/216/649/506.jpg?options=width=1200"
    ],
    featured: false,
    year_built: 1965,
    energy_label: "C",
    garden: true,
    garden_area: 150,
    parking: true,
    parking_spaces: 1,
    balcony: false,
    terrace: false,
    furnished: false,
    basement: false,
    elevator: false,
    floors: 2
  },
  // For Rent — scraped from Funda
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
    images: [
      "https://cloud.funda.nl/valentina_media/226/227/107.jpg?options=width=1200",
      "https://cloud.funda.nl/valentina_media/226/227/110.jpg?options=width=1200"
    ],
    featured: true,
    year_built: 1985,
    energy_label: "",
    garden: false,
    garden_area: 0,
    parking: true,
    parking_spaces: 1,
    balcony: false,
    terrace: true,
    furnished: false,
    basement: false,
    elevator: false,
    floors: 3
  },
  // For Rent — from Pararius search snippets
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
    images: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80"
    ],
    featured: false,
    year_built: 1925,
    energy_label: "B",
    garden: true,
    garden_area: 80,
    parking: false,
    parking_spaces: 0,
    balcony: true,
    terrace: false,
    furnished: true,
    basement: true,
    elevator: false,
    floors: 3
  },
  // For Rent — from Pararius search snippets
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
    images: [
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=80"
    ],
    featured: false,
    year_built: 1970,
    energy_label: "C",
    garden: false,
    garden_area: 0,
    parking: true,
    parking_spaces: 1,
    balcony: true,
    terrace: false,
    furnished: true,
    basement: false,
    elevator: true,
    floors: 1
  },
  // For Rent — from Pararius search snippets
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
    images: [
      "https://images.unsplash.com/photo-1600607687644-c7171b42498b?auto=format&fit=crop&w=1200&q=80"
    ],
    featured: true,
    year_built: 1890,
    energy_label: "D",
    garden: false,
    garden_area: 0,
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

async function addListings() {
  console.log(`Adding ${listings.length} real listings to dashboard...`);

  let successCount = 0;
  let failCount = 0;

  for (const listing of listings) {
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': API_KEY
        },
        body: JSON.stringify(listing)
      });

      if (response.ok) {
        const data = await response.json();
        console.log(`✓ Added: ${listing.title} (${listing.listing_type})`);
        successCount++;
      } else {
        const error = await response.json();
        console.error(`✗ Failed: ${listing.title} - ${error.error || response.statusText}`);
        failCount++;
      }
    } catch (error) {
      console.error(`✗ Error adding ${listing.title}:`, error.message);
      failCount++;
    }

    await new Promise(resolve => setTimeout(resolve, 100));
  }

  console.log(`\nSummary: ${successCount} added, ${failCount} failed`);
}

addListings().catch(console.error);
