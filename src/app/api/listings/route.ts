import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { demoListings } from '@/lib/listings-data';
import { requireWriteAccess } from '@/lib/api-auth';
import { hasDashboardAuth } from '@/lib/dashboard-auth';

// Cache public listing reads at the CDN edge: serve instantly for 60s, then
// serve stale while revalidating in the background for up to 5 minutes.
const LISTINGS_CACHE_HEADER =
  'public, s-maxage=60, stale-while-revalidate=300';

export async function GET(request: NextRequest) {
  const isKeepWarm = request.headers.get('x-keep-warm') === 'true';
  if (isKeepWarm) {
    console.log('[api/listings] Keep-warm ping received');
  }

  const includeHidden =
    request.nextUrl.searchParams.get('includeHidden') === 'true' &&
    hasDashboardAuth(request);

  try {
    const result = await query(
      includeHidden
        ? 'SELECT *, COALESCE(hidden, FALSE) AS hidden FROM listings ORDER BY created_at DESC'
        : 'SELECT *, COALESCE(hidden, FALSE) AS hidden FROM listings WHERE COALESCE(hidden, FALSE) = FALSE ORDER BY created_at DESC'
    );
    if (result.rows.length > 0) {
      return NextResponse.json(result.rows, {
        headers: {
          'Cache-Control': includeHidden ? 'private, no-store' : LISTINGS_CACHE_HEADER,
        },
      });
    }
  } catch (error) {
    console.error('Error fetching listings from DB, using demo data:', error);
  }

  const fallback = includeHidden
    ? demoListings
    : demoListings.filter((listing) => !listing.hidden);

  return NextResponse.json(fallback, {
    headers: {
      'Cache-Control': includeHidden ? 'private, no-store' : LISTINGS_CACHE_HEADER,
    },
  });
}

export async function POST(request: NextRequest) {
  const unauthorizedResponse = await requireWriteAccess(request);
  if (unauthorizedResponse) {
    return unauthorizedResponse;
  }

  try {
    const body = await request.json();
    const { 
      title, description, price, bedrooms, bathrooms, area, address, city, postal_code, 
      property_type, status, listing_type, image_url, featured, hidden, images, year_built, energy_label, 
      garden, garden_area, parking, parking_spaces, balcony, terrace, furnished, 
      basement, elevator, floors, source_url 
    } = body;

    if (!title) {
      return NextResponse.json({ error: 'Title is required' }, { status: 400 });
    }

    let result;
    try {
      result = await query(
        `INSERT INTO listings (
          title, description, price, bedrooms, bathrooms, area, address, city, postal_code, 
          property_type, status, listing_type, image_url, featured, hidden, images, year_built, energy_label, 
          garden, garden_area, parking, parking_spaces, balcony, terrace, furnished, 
          basement, elevator, floors, source_url
        ) VALUES (
          $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16,
          $17, $18, $19, $20, $21, $22, $23, $24, $25, $26, $27, $28
        ) RETURNING *`,
        [
          title, description, price, bedrooms, bathrooms, area, address, city, postal_code, 
          property_type, status || 'available', listing_type || 'sale', image_url, featured || false,
          hidden || false, images ? JSON.stringify(images) : null, year_built, energy_label,
          garden, garden_area, parking, parking_spaces, balcony, terrace, furnished, 
          basement, elevator, floors, source_url
        ]
      );
    } catch (insertError) {
      // Compatibility fallback for older listings schema without luxury columns.
      result = await query(
        `INSERT INTO listings (
          title, description, price, bedrooms, bathrooms, area, address, city, postal_code,
          property_type, status, listing_type, image_url, featured, hidden
        ) VALUES (
          $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15
        ) RETURNING *`,
        [
          title, description, price, bedrooms, bathrooms, area, address, city, postal_code,
          property_type, status || 'available', listing_type || 'sale', image_url, featured || false,
          hidden || false,
        ]
      );
      console.warn('Listings table missing luxury fields; inserted using legacy schema.', insertError);
    }

    return NextResponse.json(result.rows[0], { status: 201 });
  } catch (error) {
    console.error('Error creating listing:', error);
    return NextResponse.json({ error: 'Failed to create listing' }, { status: 500 });
  }
}
