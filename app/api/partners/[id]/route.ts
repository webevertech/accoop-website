import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params

  // Partner IDs are numeric; anything else could walk the upstream path (../).
  if (!/^\d+$/.test(id)) {
    return NextResponse.json({ message: 'Partner not found' }, { status: 404 })
  }

  const base =
    process.env.PARTNERS_API_BASE ||
    process.env.NEXT_PUBLIC_ONECONNECT_API_BASE ||
    'https://socialimpact.accoop.com'

  let upstream: Response
  try {
    upstream = await fetch(`${base}/api/partners/${id}`, { cache: 'no-store' })
  } catch {
    return NextResponse.json({ message: 'Upstream unavailable' }, { status: 502 })
  }

  let json: unknown
  try {
    json = await upstream.json()
  } catch {
    json = { message: 'Unexpected response from the partners service.' }
  }
  return NextResponse.json(json, { status: upstream.status })
}
