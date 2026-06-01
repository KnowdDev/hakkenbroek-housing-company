import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { demoListings } from '@/lib/listings-data';
import { requireWriteAccess } from '@/lib/api-auth';
import { hasDashboardAuth } from '@/lib/dashboard-auth';
import { mergeListingPutBody } from '@/lib/listing-put-merge';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const isDashboardRequest = hasDashboardAuth(request);

  try {
    const result = await query(
      'SELECT *, COALESCE(hidden, FALSE) AS hidden FROM listings WHERE id = $1',
      [id]
    );

    if (result.rows.length > 0) {
      const listing = result.rows[0] as Record<string, unknown>;
      if (listing.hidden && !isDashboardRequest) {
        return NextResponse.json({ error: 'Listing not found' }, { status: 404 });
      }

      return NextResponse.json(result.rows[0], {
        headers: {
          'Cache-Control': isDashboardRequest
            ? 'private, no-store'
            : 'public, s-maxage=60, stale-while-revalidate=60',
        },
      });
    }
  } catch (error) {
    console.error('Error fetching listing from DB, using demo data:', error);
  }

  const listing = demoListings.find((l) => l.id === parseInt(id));
  if (!listing) {
    return NextResponse.json({ error: 'Listing not found' }, { status: 404 });
  }

  if (listing.hidden && !isDashboardRequest) {
    return NextResponse.json({ error: 'Listing not found' }, { status: 404 });
  }

  return NextResponse.json(listing);
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const unauthorizedResponse = await requireWriteAccess(request);
  if (unauthorizedResponse) {
    return unauthorizedResponse;
  }

  try {
    const { id } = await params;
    const body = (await request.json()) as Record<string, unknown>;

    const existing = await query('SELECT * FROM listings WHERE id = $1 LIMIT 1', [id]);
    if (existing.rows.length === 0) {
      return NextResponse.json({ error: 'Listing not found' }, { status: 404 });
    }

    const merged = mergeListingPutBody(existing.rows[0] as Record<string, unknown>, body);

    const {
      title,
      description,
      description_en,
      description_nl,
      price,
      bedrooms,
      bathrooms,
      area,
      address,
      city,
      postal_code,
      property_type,
      status,
      listing_type,
      image_url,
      featured,
      hidden,
      images,
      year_built,
      energy_label,
      garden,
      garden_area,
      parking,
      parking_spaces,
      balcony,
      terrace,
      furnished,
      basement,
      elevator,
      floors,
      source_url,
    } = merged;

    const imagesPayload =
      images === undefined || images === null ? null : JSON.stringify(images);

    let result;
    try {
      result = await query(
        `UPDATE listings SET
          title = $1, description = $2, description_en = $3, description_nl = $4, price = $5, bedrooms = $6, bathrooms = $7,
          area = $8, address = $9, city = $10, postal_code = $11, property_type = $12,
          status = $13, listing_type = $14, image_url = $15, featured = $16, hidden = $17, images = $18, year_built = $19,
          energy_label = $20, garden = $21, garden_area = $22, parking = $23,
          parking_spaces = $24, balcony = $25, terrace = $26, furnished = $27,
          basement = $28, elevator = $29, floors = $30, source_url = $31, updated_at = CURRENT_TIMESTAMP
          WHERE id = $32 RETURNING *`,
        [
          title,
          description,
          description_en,
          description_nl,
          price,
          bedrooms,
          bathrooms,
          area,
          address,
          city,
          postal_code,
          property_type,
          status,
          (listing_type as string) || 'sale',
          image_url,
          featured,
          hidden,
          imagesPayload,
          year_built,
          energy_label,
          garden,
          garden_area,
          parking,
          parking_spaces,
          balcony,
          terrace,
          furnished,
          basement,
          elevator,
          floors,
          source_url,
          id,
        ]
      );
    } catch (updateError) {
      // Compatibility fallback for older listings schema without luxury columns.
      result = await query(
        `UPDATE listings SET
          title = $1, description = $2, price = $3, bedrooms = $4, bathrooms = $5,
          area = $6, address = $7, city = $8, postal_code = $9, property_type = $10,
          status = $11, listing_type = $12, image_url = $13, featured = $14, hidden = $15, updated_at = CURRENT_TIMESTAMP
          WHERE id = $16 RETURNING *`,
        [
          title,
          description,
          price,
          bedrooms,
          bathrooms,
          area,
          address,
          city,
          postal_code,
          property_type,
          status,
          (listing_type as string) || 'sale',
          image_url,
          featured,
          hidden,
          id,
        ]
      );
      console.warn('Listings table missing luxury fields; updated using legacy schema.', updateError);
    }

    if (result.rows.length === 0) {
      return NextResponse.json({ error: 'Listing not found' }, { status: 404 });
    }

    return NextResponse.json(result.rows[0]);
  } catch (error) {
    console.error('Error updating listing:', error);
    return NextResponse.json({ error: 'Failed to update listing' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const unauthorizedResponse = await requireWriteAccess(request);
  if (unauthorizedResponse) {
    return unauthorizedResponse;
  }

  try {
    const { id } = await params;
    const result = await query(
      'DELETE FROM listings WHERE id = $1 RETURNING *',
      [id]
    );

    if (result.rows.length === 0) {
      return NextResponse.json({ error: 'Listing not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Listing deleted successfully' });
  } catch (error) {
    console.error('Error deleting listing:', error);
    return NextResponse.json({ error: 'Failed to delete listing' }, { status: 500 });
  }
}
