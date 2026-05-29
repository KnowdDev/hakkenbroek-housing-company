import { NextRequest, NextResponse } from 'next/server';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { requireWriteAccess } from '@/lib/api-auth';

const R2_ACCOUNT_ID = process.env.R2_ACCOUNT_ID || '19a84e3c6953b94b400408ca5a605c0d';
const BUCKET = process.env.R2_BUCKET || 'hakkenbroek-listing-images';
const R2_ENDPOINT = `https://${R2_ACCOUNT_ID}.r2.cloudflarestorage.com`;
const PUBLIC_BASE = process.env.R2_PUBLIC_URL || 'https://pub-91c40fba6497449ab096d3657b550a87.r2.dev';

const s3 = new S3Client({
  region: 'auto',
  endpoint: R2_ENDPOINT,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID || '29691397d72d4f63eaa89676ae476de4',
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY || '73315842a872e9bb667016c4f7742a013e2f00f7b9c0db9d524ed1003ba409c1',
  },
});

export async function POST(request: NextRequest) {
  const unauthorizedResponse = await requireWriteAccess(request);
  if (unauthorizedResponse) {
    return unauthorizedResponse;
  }

  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    if (!file.type.startsWith('image/')) {
      return NextResponse.json({ error: 'Only image files are allowed' }, { status: 400 });
    }

    // Max 10MB
    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json({ error: 'File too large. Max 10MB.' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const timestamp = Date.now();
    const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_');
    const key = `uploads/${timestamp}-${safeName}`;

    await s3.send(
      new PutObjectCommand({
        Bucket: BUCKET,
        Key: key,
        Body: buffer,
        ContentType: file.type,
      })
    );

    const publicUrl = `${PUBLIC_BASE}/${key}`;

    return NextResponse.json({ url: publicUrl });
  } catch (error) {
    console.error('R2 upload error:', error);
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
  }
}
