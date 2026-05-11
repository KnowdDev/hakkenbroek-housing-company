# Hakkenbroek.com Scraping & Dashboard Enhancement Progress

## Discovery (Done)
- hakkenbroek.com is protected by AWS WAF bot challenge — Firecrawl direct scraping blocked.
- Funda.nl agency page accessible. Scraped current listings.
- Pararius snippets found via web search with additional rental listing data.

## Real Listings Scraped from Funda

### For Sale (1 active)
1. **Jacob Catskade 51-2, 1052 BV Amsterdam**
   - Price: €600,000 (k.k.)
   - Type: Apartment (bovenwoning / dubbel bovenhuis)
   - Area: 68m² living + 14m² outdoor + 24m² external storage
   - Bedrooms: 3
   - Bathrooms: 2 + 1 separate toilet
   - Floors: 2 + attic
   - Year built: 1903
   - Energy label: A
   - Features: Roof terrace + balcony, paid parking, municipal leasehold (€3,828/year), VvE €163.55/month
   - Status: Available
   - Image: https://cloud.funda.nl/valentina_media/221/766/528.jpg

### For Rent (1 active)
2. **Eem 87, 1273 PE Huizen**
   - Price: €1,650/month (no service costs)
   - Deposit: €3,000
   - Type: Apartment (bovenwoning)
   - Area: 92m² living + 4m² outdoor + 3m² external storage
   - Bedrooms: 2
   - Bathrooms: 1 (shower + sink)
   - Floors: 3
   - Year built: 1981-1990
   - Energy label: Not available
   - Features: Loggia (covered terrace), public parking, no upstairs/downstairs neighbors, bicycle storage
   - Status: Available
   - Images: https://cloud.funda.nl/valentina_media/226/227/107.jpg, https://cloud.funda.nl/valentina_media/226/227/110.jpg

### Sold (from Funda history)
3. **Van Linschotenlaan 12, Hilversum**
   - Price: €385,000
   - Status: Sold (9 Jan 2026)

## Additional Rental Data from Pararius Search Snippets
- 1078 DN Amsterdam (Scheldebuurt) — €3,250/mo · 127m² · 4 rooms · Furnished
- 1068 ST Amsterdam (Osdorp-Oost) — €2,200/mo · 85m² · 3 rooms · Furnished
- 1015 DL Amsterdam (Grachtengordel-West) — €4,100/mo

## Implementation Tasks
- [x] Scrape hakkenbroek.com (via Funda/Pararius proxy)
- [x] Add `listing_type` (sale | rent) to DB schema + migrations
- [x] Add `listing_type` to TypeScript interfaces (listings-data.ts, dashboard pages, public pages)
- [x] Update API routes (POST /api/listings, PUT /api/listings/[id]) to accept/persist `listing_type`
- [x] Update dashboard listings page: form field, table column, filter tabs
- [x] Update dashboard home page stats: sale vs rent counts
- [x] Update public **Properties** listing page: sale/rent filter, badges on cards, translations (en/nl/es)
- [x] Update public **Property Detail** page: sale/rent badge, details row, "Monthly Rent" vs "Asking Price" label
- [x] Update public **Home** page: sale/rent badges on featured property cards
- [x] Create seed script with real scraped listings
- [x] Smoke-test dashboard and API (build passes)
