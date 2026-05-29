import fs from 'fs';

const input = JSON.parse(fs.readFileSync('./scripts/scraped-listings.json', 'utf8'));

input.forEach(l => {
  // Fix area: the parser grabbed extra digits (e.g. "92 m2" → 922)
  // We know from the site structure that these should be reasonable sqm values
  if (l.area && l.area > 500) {
    // Likely parsed wrong - try to extract just the first number
    const str = String(l.area);
    // If it looks like "922" from "92 m2", it's probably 92
    // Heuristic: if >500, it's probably a 2-3 digit number with the "2" from m2 appended
    if (l.area >= 500 && l.area < 10000) {
      l.area = Math.round(l.area / 10);
    }
  }

  // Clean images: remove tiny 50x50 thumbs
  if (l.images) {
    l.images = l.images.filter(url => !url.includes('/50x50/'));
  }
  if (l.image && l.image.includes('/50x50/')) {
    l.image = l.images && l.images.length > 0 ? l.images[0] : null;
  }

  // Parse price to numeric value
  if (l.price) {
    const match = l.price.match(/[\d.]+/);
    if (match) {
      const cleaned = match[0].replace(/\./g, '');
      l.priceNumeric = parseInt(cleaned, 10);
    }
  }

  // Determine status from alerts/stickers
  if (l.alertText === 'sold') l.status = 'sold';
  else if (l.alertText === 'rented') l.status = 'rented';
  else if (l.sticker === 'for rent' || l.sticker === 'for sale') l.status = 'available';
  else l.status = 'available';

  // Map property types to MCP schema
  const typeMap = {
    'apartment': 'apartment',
    'residential building': 'house',
    'house': 'house',
    'villa': 'villa',
    'studio': 'studio',
    'penthouse': 'penthouse',
  };
  l.property_type = typeMap[l.property_type] || 'apartment';
});

fs.writeFileSync('./scripts/scraped-listings-clean.json', JSON.stringify(input, null, 2));
console.log(`Cleaned ${input.length} listings`);
