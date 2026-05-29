---
description: Scrape listings from hakkenbroek.com and sync to the new website database
---

# Scrape Listings from hakkenbroek.com

This workflow pulls property listings from the old hakkenbroek.com website and syncs them into the new website's database and image storage.

## Prerequisites

- Playwright installed (`npx playwright install chromium`)
- Database connection working (Neon PostgreSQL)
- Cloudflare R2 bucket `hakkenbroek-listing-images` configured with public access

## Step 1: Scrape listings

// turbo
1. Run the scraper:
   ```bash
   node scripts/scrape-hakkenbroek.mjs
   ```
   
   This launches a headless Chrome browser, navigates to:
   - `https://hakkenbroek.com/nl/te-huur/` (rentals)
   - `https://hakkenbroek.com/nl/te-koop/` (sales)
   
   It extracts for each listing:
   - Title (address + city)
   - Price
   - Main image
   - Detail page URL
   - Bedrooms, bathrooms, area, property type
   - From detail page: description, all gallery images, year built, energy label, etc.
   
   Output is saved to `scripts/scraped-listings.json`

## Step 2: Clean scraped data

// turbo
2. Clean and normalize the scraped JSON:
   ```bash
   node scripts/clean-scraped.mjs
   ```
   
   Output is saved to `scripts/scraped-listings-clean.json`
   This normalizes addresses, cities, prices, and deduplicates listings.

## Step 3: Sync to database

// turbo
3. Create/update listings in the database:
   ```bash
   node scripts/sync-listings-to-db.mjs
   ```
   
   This script:
   - Reads `scraped-listings-clean.json`
   - Matches existing listings by title
   - Creates new listings or updates existing ones with full property details
   - Sets `listing_type` (sale/rent) based on source page
   - Populates all fields: price, bedrooms, bathrooms, area, address, city, etc.

## Step 4: Sync source URLs

// turbo
4. Update source URLs for traceability:
   ```bash
   node scripts/sync-source-url.mjs
   ```
   
   This links each listing back to its original detail page on hakkenbroek.com via the `source_url` column.

## Step 5: Migrate images to R2 CDN

// turbo
5. Upload listing images to Cloudflare R2 for CDN delivery:
   ```bash
   node scripts/migrate-images-to-r2.mjs
   ```
   
   This:
   - Downloads main images and gallery images from CloudFront
   - Uploads them to `hakkenbroek-listing-images` R2 bucket
   - Updates database `image_url` and `images` columns with R2 CDN URLs
   - Clears placeholder `year_built` values from bulk import

## Complete workflow (one-liner)

Run everything in sequence:

```bash
node scripts/scrape-hakkenbroek.mjs && \
node scripts/clean-scraped.mjs && \
node scripts/sync-listings-to-db.mjs && \
node scripts/sync-source-url.mjs && \
node scripts/migrate-images-to-r2.mjs
```

## What to expect

- New listings added to hakkenbroek.com will be created as new records
- Existing listings (matched by title) will be updated with latest data
- Images are migrated from CloudFront → R2 CDN automatically
- Source URLs are preserved for traceability

## Troubleshooting

- If scraping fails: the script copies your Chrome profile to bypass bot detection. Make sure you are logged into hakkenbroek.com in Chrome before running.
- If DB sync creates duplicates: the script matches by title, so rename a listing in the DB manually if the title changed on the old site.
