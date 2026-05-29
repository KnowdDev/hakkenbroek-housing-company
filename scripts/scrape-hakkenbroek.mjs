#!/usr/bin/env node
/**
 * Scrape hakkenbroek.com listings using Playwright.
 * Uses the user's Chrome profile to inherit CAPTCHA session cookies.
 *
 * Usage:
 *   npx playwright install chromium
 *   node scripts/scrape-hakkenbroek.mjs
 */
import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import os from 'os';

const BASE_URL = 'https://hakkenbroek.com/en';
const OUTPUT_FILE = path.join(process.cwd(), 'scripts', 'scraped-listings.json');

// macOS Chrome profile path
const CHROME_PROFILE = process.env.HOME + '/Library/Application Support/Google/Chrome/Default';

function copyProfileToTemp() {
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'chrome-profile-'));
  console.log(`Copying Chrome profile to ${tempDir}...`);
  execSync(`cp -R "${CHROME_PROFILE}" "${tempDir}/Default"`, { stdio: 'inherit' });
  return tempDir;
}

async function scrapePage(page, url, name) {
  console.log(`Navigating to: ${url}`);
  try {
    await page.goto(url, { waitUntil: 'networkidle', timeout: 60000 });
  } catch (e) {
    console.warn(`  Navigation issue (might be redirect): ${e.message}`);
  }

  // Wait for listings to load
  await page.waitForTimeout(8000);

  // Log page title for debugging
  const title = await page.title().catch(() => 'unknown');
  const currentUrl = page.url();
  console.log(`  Page title: ${title}`);
  console.log(`  Current URL: ${currentUrl}`);

  // Save HTML for debugging
  try {
    const htmlPath = path.join(process.cwd(), 'scripts', `debug-${name}.html`);
    const html = await page.content();
    fs.writeFileSync(htmlPath, html);
    console.log(`  Saved debug HTML: ${htmlPath}`);
  } catch (e) {
    console.warn(`  Could not save HTML: ${e.message}`);
  }

  // Try to extract listing cards
  const listings = await page.evaluate(() => {
    const results = [];

    const cards = document.querySelectorAll('a.c-product-thumb');

    cards.forEach(card => {
      const titleEl = card.querySelector('h3.c-product-thumb__title');
      const title = titleEl ? titleEl.innerText.trim() : null;
      if (!title || title === 'Hakkenbroek Housing Company') return; // skip non-listings

      const priceEl = card.querySelector('.o-price.c-product-thumb__price');
      const price = priceEl ? priceEl.innerText.trim() : null;

      const imgEl = card.querySelector('.c-product-thumb__image img');
      const image = imgEl ? (imgEl.getAttribute('data-src') || imgEl.src) : null;

      const detailUrl = card.href || card.getAttribute('href');

      const stickerEl = card.querySelector('.c-product-thumb__sticker');
      const sticker = stickerEl ? stickerEl.innerText.trim().toLowerCase() : null;

      const alertEl = card.querySelector('.alert');
      const alertText = alertEl ? alertEl.innerText.trim().toLowerCase() : null;

      // Parse specs table
      const specs = {};
      const rows = card.querySelectorAll('.o-table tr');
      rows.forEach(row => {
        const th = row.querySelector('th');
        const td = row.querySelector('td');
        if (!th || !td) return;
        const label = th.innerText.toLowerCase();
        const value = td.innerText.trim();
        if (label.includes('type of house')) specs.property_type = value.toLowerCase();
        if (label.includes('square meters')) specs.area = parseInt(value.replace(/\D/g, ''), 10) || null;
        if (label.includes('bedroom')) specs.bedrooms = parseInt(value, 10) || null;
        if (label.includes('bathroom')) specs.bathrooms = parseInt(value, 10) || null;
      });

      // Parse title into address and city
      let address = null;
      let city = null;
      if (title && title.includes(' - ')) {
        const parts = title.split(' - ').map(s => s.trim());
        if (parts.length >= 2) {
          address = parts[0];
          city = parts[1];
        }
      }

      results.push({
        title,
        price,
        address,
        city,
        image,
        detailUrl,
        sticker,
        alertText,
        ...specs,
      });
    });

    return results;
  });

  return listings;
}

async function scrapeDetailPage(page, url) {
  console.log(`  Detail: ${url}`);
  try {
    await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });
    await page.waitForTimeout(2000);

    const data = await page.evaluate(() => {
      const getText = (sel) => {
        const el = document.querySelector(sel);
        return el ? el.innerText.trim() : null;
      };

      // Extract all images from the gallery
      const images = [...document.querySelectorAll('img')]
        .map(img => img.src)
        .filter(src => src && src.includes('hakkenbroek') && !src.includes('logo'));

      // Extract description
      const descEl = document.querySelector('[class*="description"], .description, .content, [class*="detail"]');
      const description = descEl ? descEl.innerText.trim() : null;

      // Extract specs from tables or lists
      const specs = {};
      document.querySelectorAll('table tr, dl, ul li, .specs li, [class*="feature"]').forEach(row => {
        const text = row.innerText;
        if (text.includes('Bedroom')) specs.bedrooms = text.match(/\d+/)?.[0];
        if (text.includes('Bathroom')) specs.bathrooms = text.match(/\d+/)?.[0];
        if (text.includes('m²') || text.includes('sqm')) specs.area = text.match(/(\d+)/)?.[1] || text.match(/(\d+)/)?.[0];
        if (text.includes('Year')) specs.year_built = text.match(/\d{4}/)?.[0];
        if (text.includes('Energy')) specs.energy_label = text.match(/[A-G]/)?.[0];
      });

      return { images, description, specs };
    });

    return data;
  } catch (e) {
    console.warn(`  Failed to scrape detail: ${e.message}`);
    return { images: [], description: null, specs: {} };
  }
}

async function main() {
  console.log('Launching browser with copied user profile...');

  const tempProfileDir = copyProfileToTemp();

  const context = await chromium.launchPersistentContext(tempProfileDir, {
    headless: false,
    args: ['--disable-blink-features=AutomationControlled'],
  });

  const page = await context.newPage();

  try {
    const allListings = [];

    // Scrape rental listings
    console.log('\n=== RENTAL LISTINGS ===');
    const rentalUrl = `${BASE_URL}/listings/rent/`;
    const rentals = await scrapePage(page, rentalUrl, 'rental');
    console.log(`Found ${rentals.length} rental listings`);

    for (const r of rentals) {
      r.listing_type = 'rent';
      if (r.detailUrl) {
        const detail = await scrapeDetailPage(page, r.detailUrl);
        r.images = detail.images;
        r.description = detail.description;
        Object.assign(r, detail.specs);
      }
      allListings.push(r);
    }

    // Scrape sale listings
    console.log('\n=== SALE LISTINGS ===');
    const salesUrl = `${BASE_URL}/listings/buy/`;
    const sales = await scrapePage(page, salesUrl, 'sales');
    console.log(`Found ${sales.length} sale listings`);

    for (const s of sales) {
      s.listing_type = 'sale';
      if (s.detailUrl) {
        const detail = await scrapeDetailPage(page, s.detailUrl);
        s.images = detail.images;
        s.description = detail.description;
        Object.assign(s, detail.specs);
      }
      allListings.push(s);
    }

    // Save results
    fs.writeFileSync(OUTPUT_FILE, JSON.stringify(allListings, null, 2));
    console.log(`\n✅ Saved ${allListings.length} listings to ${OUTPUT_FILE}`);

    // Print summary
    console.log('\n--- Summary ---');
    allListings.forEach((l, i) => {
      console.log(`${i + 1}. [${l.listing_type.toUpperCase()}] ${l.title || l.address || 'Untitled'} | ${l.price || 'No price'}`);
    });

  } finally {
    await context.close();
    console.log(`Cleaning up temp profile: ${tempProfileDir}`);
    execSync(`rm -rf "${tempProfileDir}"`);
  }
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
