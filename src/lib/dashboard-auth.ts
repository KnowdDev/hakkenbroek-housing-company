import { NextRequest, NextResponse } from 'next/server';

export function requireDashboardAuth(request: NextRequest): NextResponse | null {
  const token = request.cookies.get('dashboard_token')?.value;
  const expectedToken = process.env.DASHBOARD_PASSWORD || 'hakkenbroek-admin-2024';

  if (!token || token !== expectedToken) {
    return NextResponse.json({ error: 'Unauthorized dashboard access' }, { status: 401 });
  }

  return null;
}
