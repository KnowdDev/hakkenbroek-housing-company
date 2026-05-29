import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { password } = await request.json();
    const expectedPassword = process.env.DASHBOARD_PASSWORD || 'Hakkenbroek2026!';

    if (!expectedPassword) {
      return NextResponse.json({ error: 'Dashboard password is not configured' }, { status: 500 });
    }

    if (!password || password !== expectedPassword) {
      return NextResponse.json({ error: 'Incorrect password' }, { status: 401 });
    }

    const response = NextResponse.json({ success: true });
    response.cookies.set('dashboard_token', expectedPassword, {
      httpOnly: true,
      sameSite: 'strict',
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      maxAge: 60 * 60 * 24,
    });

    return response;
  } catch (error) {
    console.error('Error during dashboard login:', error);
    return NextResponse.json({ error: 'Failed to login' }, { status: 500 });
  }
}
