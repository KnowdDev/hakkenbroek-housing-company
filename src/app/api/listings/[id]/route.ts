import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { demoListings } from '@/lib/listings-data';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const result = await query(
      'SELECT * FROM listings WHERE id = $1',
      [id]
    );

    if (result.rows.length > 0) {
      return NextResponse.json(result.rows[0]);
    }
  } catch (error) {
    console.error('Error fetching listing from DB, using demo data:', error);
  }

  const listing = demoListings.find((l) => l.id === parseInt(id));
  if (!listing) {
    return NextResponse.json({ error: 'Listing not found' }, { status: 404 });
  }
  return NextResponse.json(listing);
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { title, description, price, bedrooms, bathrooms, area, address, city, postal_code, property_type, status, image_url, featured } = body;

    const result = await query(
      'UPDATE listings SET title = $1, description = $2, price = $3, bedrooms = $4, bathrooms = $5, area = $6, address = $7, city = $8, postal_code = $9, property_type = $10, status = $11, image_url = $12, featured = $13, updated_at = CURRENT_TIMESTAMP WHERE id = $14 RETURNING *',
      [title, description, price, bedrooms, bathrooms, area, address, city, postal_code, property_type, status, image_url, featured, id]
    );

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
