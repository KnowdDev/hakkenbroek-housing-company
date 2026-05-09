import { NextRequest, NextResponse } from 'next/server';

export function hasDashboardAuth(request: NextRequest): boolean {
  const token = request.cookies.get('dashboard_token')?.value;
  const expectedToken = process.env.DASHBOARD_PASSWORD || 'hakkenbroek-admin-2024';
  return Boolean(token && token === expectedToken);
}

export function requireDashboardAuth(request: NextRequest): NextResponse | null {
  if (!hasDashboardAuth(request)) {
    return NextResponse.json({ error: 'Unauthorized dashboard access' }, { status: 401 });
  }

  return null;
}
