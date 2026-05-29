import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import os from 'os';

const urls = [
  { url: 'https://hakkenbroek.com/nl/', name: 'home' },
  { url: 'https://hakkenbroek.com/nl/over-ons/', name: 'about' },
  { url: 'https://hakkenbroek.com/nl/diensten/', name: 'services' },
  { url: 'https://hakkenbroek.com/nl/contact/', name: 'contact' },
];

const CHROME_PROFILE = process.env.HOME + '/Library/Application Support/Google/Chrome/Default';

function copyProfileToTemp() {
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'chrome-profile-'));
  console.log(`Copying Chrome profile to ${tempDir}...`);
  execSync(`cp -R "${CHROME_PROFILE}" "${tempDir}/Default"`, { stdio: 'inherit' });
  return tempDir;
}

async function scrapePageText(page, url) {
  console.log(`Navigating to: ${url}`);
  try {
    await page.goto(url, { waitUntil: 'networkidle', timeout: 60000 });
  } catch (e) {
    console.warn(`  Navigation issue: ${e.message}`);
  }

  await page.waitForTimeout(5000);

  const text = await page.evaluate(() => {
    // Remove nav, footer, scripts, styles
    const clone = document.body.cloneNode(true);
    clone.querySelectorAll('nav, footer, header, script, style, aside, .cookie-banner, .cookie, .consent, .gdpr').forEach(el => el.remove());
    
    // Try to find main content
    const main = clone.querySelector('main, .content, .page-content, article, .container');
    const content = main || clone;
    
    let text = content.innerText || '';
    text = text.replace(/\s+/g, ' ').trim();
    return text.substring(0, 15000);
  });

  return text;
}

async function main() {
  const tempProfileDir = copyProfileToTemp();
  const context = await chromium.launchPersistentContext(tempProfileDir, { headless: false });
  const page = await context.newPage();

  const results = [];
  for (const { url, name } of urls) {
    try {
      const text = await scrapePageText(page, url);
      results.push({ url, name, text });
      console.log(`OK: ${url} (${text.length} chars)`);
    } catch (e) {
      console.log(`FAIL: ${url}`, e.message);
    }
  }

  await context.close();
  execSync(`rm -rf "${tempProfileDir}"`);

  fs.writeFileSync('./scripts/hakkenbroek-tone-of-voice.json', JSON.stringify(results, null, 2));

  const md = results.map(r => `## ${r.name} — ${r.url}

${r.text}

---
`).join('\n');

  fs.writeFileSync('./hakkenbroek-tone-of-voice.md', `# Hakkenbroek.com Tone of Voice Analysis

Extracted text content from key pages on the original website for tone-of-voice reference.

${md}`);

  console.log('\nSaved:');
  console.log('  - scripts/hakkenbroek-tone-of-voice.json');
  console.log('  - hakkenbroek-tone-of-voice.md');
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
