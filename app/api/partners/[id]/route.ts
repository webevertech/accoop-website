import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params

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

  const json = await upstream.json()
  return NextResponse.json(json, { status: upstream.status })
}
