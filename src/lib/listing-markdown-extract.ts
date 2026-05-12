/**
 * Best-effort extraction of listing fields from marketing / export markdown (Hakkenbroek format).
 * Returns draft objects for agent review — not a substitute for validation + tool calls.
 */

export interface ListingMarkdownDraft {
  title?: string;
  description?: string;
  price?: number;
  listing_type?: 'sale' | 'rent';
  property_type?: string;
  status?: string;
  area?: number;
  bedrooms?: number;
  bathrooms?: number;
  address?: string;
  city?: string;
  postal_code?: string;
  image_url?: string;
  images?: string[];
  furnished?: boolean;
  balcony?: boolean;
  terrace?: boolean;
  parking?: boolean;
  elevator?: boolean;
  basement?: boolean;
  garden?: boolean;
  garden_area?: number;
  parking_spaces?: number;
  floors?: number;
  energy_label?: string;
  year_built?: number;
  /** Free-text lines the parser could not map cleanly */
  unparsed?: string[];
}

function stripMdBold(s: string): string {
  return s.replace(/^\*\*|\*\*$/g, '').trim();
}

function matchGroup(text: string, re: RegExp): string | undefined {
  const m = text.match(re);
  return m?.[1]?.trim();
}

/** Parse Dutch/EN price strings like € 2.250,- / €2.250 / 2250 per month */
function parseEuroPrice(raw: string): number | undefined {
  const cleaned = raw.replace(/\s/g, ' ').replace(/€|eur|per\s*maand|p\/m|\/month/gi, '');
  const num = cleaned.match(/[\d.,]+/);
  if (!num) return undefined;
  const normalized = num[0].includes('.') && num[0].includes(',')
    ? num[0].replace(/\./g, '').replace(',', '.')
    : num[0].includes(',') && !num[0].includes('.')
      ? num[0].replace(',', '.')
      : num[0].replace(/\./g, '');
  const v = parseFloat(normalized);
  return Number.isFinite(v) ? v : undefined;
}

function detectListingType(line: string): 'sale' | 'rent' | undefined {
  const l = line.toLowerCase();
  if (/\bhuur\b|rent|per\s*maand|p\/m|maand/.test(l) && !/\bkoop\b|kauf|sale|verkoop/.test(l)) return 'rent';
  if (/\bkoop\b|kauf|te\s*koop|sale|verkoop/.test(l)) return 'sale';
  return undefined;
}

function normalizePropertyType(raw: string): string | undefined {
  const l = raw.toLowerCase();
  if (/\bappartement|apartment|flat\b/.test(l)) return 'apartment';
  if (/\bhuis|house|townhouse|villa\b/.test(l)) return l.includes('villa') ? 'villa' : 'house';
  if (/\bstudio\b/.test(l)) return 'studio';
  if (/\bpenthouse\b/.test(l)) return 'penthouse';
  return undefined;
}

function extractUrls(text: string): string[] {
  const urls = text.match(/https?:\/\/[^\s)\]>"']+/g) ?? [];
  return [...new Set(urls.map((u) => u.replace(/[),.;]+$/, '')))];
}

function parseBoolFromLine(rest: string): boolean | undefined {
  const l = rest.toLowerCase();
  if (/^(yes|ja|true|y|j)\b/i.test(l)) return true;
  if (/^(no|nee|false|n)\b/i.test(l)) return false;
  return undefined;
}

function extractKeyValueBlock(section: string): Record<string, string> {
  const out: Record<string, string> = {};
  const lines = section.split('\n');
  for (const line of lines) {
    const bullet = line.match(/^[-*]\s*\*\*([^*]+)\*\*:\s*(.+)$/);
    const boldLine = line.match(/^\*\*([^*]+)\*\*:\s*(.+)$/);
    const m = bullet || boldLine;
    if (m) {
      const key = stripMdBold(m[1]).toLowerCase();
      out[key] = m[2].trim();
    }
  }
  return out;
}

/**
 * Pull a markdown section starting at a ## heading until the next ## or end.
 */
function sectionAfterHeading(src: string, heading: string): string | undefined {
  const esc = heading.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const re = new RegExp(`^##\\s+${esc}\\s*$`, 'im');
  const m = src.match(re);
  if (!m || m.index === undefined) return undefined;
  const start = m.index + m[0].length;
  const rest = src.slice(start);
  const next = rest.search(/^##\s+/m);
  return (next === -1 ? rest : rest.slice(0, next)).trim();
}

export function extractListingDraftsFromMarkdown(markdown: string): ListingMarkdownDraft[] {
  const src = markdown.trim();
  if (!src) return [];

  const drafts: ListingMarkdownDraft[] = [];
  const unparsed: string[] = [];

  const h1 = src.match(/^#\s+(.+)$/m);
  const draft: ListingMarkdownDraft = {};

  if (h1) draft.title = h1[1].trim();

  const detailsSection = sectionAfterHeading(src, 'Property Details') ?? '';
  const kv = extractKeyValueBlock(detailsSection + '\n' + src);

  const titleFromKv = kv['title'];
  if (titleFromKv) draft.title = stripMdBold(titleFromKv);

  const priceRaw = kv['price'] || matchGroup(src, /\*\*Price:\*\*\s*(.+)/i);
  if (priceRaw) {
    draft.price = parseEuroPrice(priceRaw);
    const lt = detectListingType(priceRaw);
    if (lt) draft.listing_type = lt;
  }

  const ltKv = kv['listing type'];
  if (ltKv) {
    const lt = detectListingType(ltKv);
    if (lt) draft.listing_type = lt;
  }

  const pt = kv['property type'] || kv['type'];
  if (pt) {
    draft.property_type = normalizePropertyType(pt);
  }

  const statusRaw = kv['status'];
  if (statusRaw) draft.status = statusRaw;

  const desc =
    sectionAfterHeading(src, 'Description') ||
    sectionAfterHeading(src, 'Beschrijving') ||
    '';
  if (desc) draft.description = desc.trim();

  const areaRaw = kv['area'];
  if (areaRaw) {
    const am = areaRaw.match(/([\d.,]+)\s*m(?:²|2)?/i);
    if (am) draft.area = parseFloat(am[1].replace(',', '.'));
  }

  const bedRaw = kv['bedrooms'] || kv['slaapkamers'];
  if (bedRaw) {
    const n = parseInt(bedRaw.match(/\d+/)?.[0] ?? '', 10);
    if (Number.isFinite(n)) draft.bedrooms = n;
  }

  const bathRaw = kv['bathrooms'] || kv['badkamers'];
  if (bathRaw) {
    const n = parseInt(bathRaw.match(/\d+/)?.[0] ?? '', 10);
    if (Number.isFinite(n)) draft.bathrooms = n;
  }

  const street = kv['street'];
  if (street) draft.address = street;

  if (kv['city']) draft.city = kv['city'];

  if (kv['postal code'] || kv['postcode']) {
    draft.postal_code = kv['postal code'] || kv['postcode'];
  }

  const imgSection = sectionAfterHeading(src, 'Images') || '';
  const primaryUrl =
    matchGroup(imgSection + '\n' + src, /(?:^|\n)-?\s*URL:\s*(https?:\/\/\S+)/im) ||
    matchGroup(imgSection, /Primary Image[^\n]*\n[^\n]*URL:\s*(https?:\/\/\S+)/im);
  if (primaryUrl) draft.image_url = primaryUrl.trim();

  const galleryUrls = extractUrls(imgSection).filter((u) => /\.(jpe?g|png|webp|gif)(\?|$)/i.test(u));
  if (galleryUrls.length) {
    draft.images = [...new Set(galleryUrls)];
    if (!draft.image_url && draft.images[0]) draft.image_url = draft.images[0];
  }

  const lines = src.split('\n');
  for (const line of lines) {
    const bullet = line.match(/^[-*]\s*\*\*([^*]+)\*\*:\s*(.+)$/);
    if (!bullet) continue;
    const key = bullet[1].toLowerCase().trim();
    const rest = bullet[2].trim();

    if (/balcony|balkon/.test(key)) {
      const b = parseBoolFromLine(rest);
      if (b !== undefined) draft.balcony = b;
      else if (/yes|ja|\bm2\b|\bm²\b/i.test(rest)) draft.balcony = true;
    }
    if (/terrace|terras/.test(key)) {
      const b = parseBoolFromLine(rest);
      if (b !== undefined) draft.terrace = b;
    }
    if (/elevator|lift/.test(key)) {
      const b = parseBoolFromLine(rest);
      if (b !== undefined) draft.elevator = b;
    }
    if (/parking|parkeer/.test(key)) {
      const b = parseBoolFromLine(rest);
      if (b !== undefined) {
        draft.parking = b;
        const n = rest.match(/(\d+)\s*(space|plaats)/i);
        if (n) draft.parking_spaces = parseInt(n[1], 10);
      } else draft.parking = true;
    }
    if (/storage|basement|kelder|berging/.test(key)) {
      const b = parseBoolFromLine(rest);
      if (b !== undefined) draft.basement = b;
      else if (/yes|ja/i.test(rest)) draft.basement = true;
    }
    if (/furnished|gemeubileerd|gestoffeerd/.test(key)) {
      const b = parseBoolFromLine(rest);
      if (b !== undefined) draft.furnished = b;
      else if (/fully|volledig|yes|ja/i.test(rest)) draft.furnished = true;
    }
    if (/energy|energie/.test(key) && /^[A-G]/i.test(rest)) {
      draft.energy_label = rest.match(/^([A-G]{1}[+]{0,2})/i)?.[1]?.toUpperCase();
    }
    if (/year|bouwjaar/.test(key)) {
      const y = rest.match(/\b(19|20)\d{2}\b/);
      if (y) draft.year_built = parseInt(y[0], 10);
    }
    if (/floor|verdieping|floors/.test(key)) {
      const n = rest.match(/\d+/);
      if (n) draft.floors = parseInt(n[0], 10);
    }
  }

  const notes = sectionAfterHeading(src, 'Additional Notes');
  if (notes) {
    for (const line of notes.split('\n').map((l) => l.replace(/^[-*]\s*/, '').trim())) {
      if (line) unparsed.push(line);
    }
  }

  if (unparsed.length) draft.unparsed = unparsed;

  if (
    draft.title ||
    draft.description ||
    draft.price !== undefined ||
    draft.images?.length ||
    draft.address ||
    draft.city
  ) {
    drafts.push(draft);
  }

  return drafts;
}
