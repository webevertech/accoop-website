import { NextRequest, NextResponse } from 'next/server';

/**
 * Server-side proxy for the partner directory.
 *
 * The browser hits this same-origin route; we fetch the upstream OneConnect
 * backend here on the server, so the backend's CORS policy never blocks the
 * client. Always runs dynamically (the directory is live data, not build-time).
 *
 * Upstream base resolution (first match wins):
 *   1. PARTNERS_API_BASE            — server-only override (e.g. local backend in dev)
 *   2. NEXT_PUBLIC_ONECONNECT_API_BASE — shared OneConnect base (prod default)
 *   3. https://socialimpact.accoop.com — hard fallback
 */

export const dynamic = 'force-dynamic';

const UPSTREAM_BASE = (
  process.env.PARTNERS_API_BASE ||
  process.env.NEXT_PUBLIC_ONECONNECT_API_BASE ||
  'https://socialimpact.accoop.com'
).replace(/\/$/, '');

export async function GET(req: NextRequest) {
  const page = req.nextUrl.searchParams.get('page');
  const upstream = `${UPSTREAM_BASE}/api/partners${page ? `?page=${encodeURIComponent(page)}` : ''}`;

  let res: Response;
  try {
    res = await fetch(upstream, {
      headers: { Accept: 'application/json' },
      cache: 'no-store',
    });
  } catch {
    return NextResponse.json(
      { message: 'Could not reach the partners service.' },
      { status: 502 },
    );
  }

  // Pass the upstream JSON (and status) straight through to the client.
  let body: unknown;
  try {
    body = await res.json();
  } catch {
    body = { message: 'Unexpected response from the partners service.' };
  }

  return NextResponse.json(body, { status: res.status });
}
