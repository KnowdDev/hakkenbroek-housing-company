import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function GET() {
  try {
    const result = await query(
      'SELECT * FROM enquiries ORDER BY created_at DESC'
    );
    return NextResponse.json(result.rows);
  } catch (error) {
    console.error('Error fetching enquiries:', error);
    return NextResponse.json({ error: 'Failed to fetch enquiries' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, message, property_id } = body;

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Fetch property title if property_id is provided
    let property_title = null;
    if (property_id) {
      try {
        const propertyResult = await query(
          'SELECT title FROM listings WHERE id = $1',
          [property_id]
        );
        if (propertyResult.rows.length > 0) {
          property_title = propertyResult.rows[0].title;
        }
      } catch (error) {
        console.error('Error fetching property title:', error);
      }
    }

    let result;
    try {
      result = await query(
        'INSERT INTO enquiries (name, email, phone, message, property_id, property_title) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
        [name, email, phone, message, property_id || null, property_title]
      );
    } catch (insertError) {
      // Backward compatibility with older DB schema missing property_title column.
      result = await query(
        'INSERT INTO enquiries (name, email, phone, message, property_id) VALUES ($1, $2, $3, $4, $5) RETURNING *',
        [name, email, phone, message, property_id || null]
      );
      console.warn('Enquiries table has no property_title column; inserted without it.', insertError);
    }

    return NextResponse.json(result.rows[0], { status: 201 });
  } catch (error) {
    console.error('Error creating enquiry:', error);
    return NextResponse.json({ error: 'Failed to create enquiry' }, { status: 500 });
  }
}
