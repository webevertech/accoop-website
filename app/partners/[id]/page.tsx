import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import PartnerDetailView from './PartnerDetailView'
import type { PartnerDetail } from '../../lib/partnersApi'

async function fetchPartner(id: string): Promise<PartnerDetail | null> {
  const base =
    process.env.NEXT_PUBLIC_ONECONNECT_API_BASE || 'https://socialimpact.accoop.com'
  try {
    const res = await fetch(`${base}/api/partners/${id}`, { cache: 'no-store' })
    if (!res.ok) return null
    const json = await res.json()
    return (json?.data as PartnerDetail) ?? null
  } catch {
    return null
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>
}): Promise<Metadata> {
  const { id } = await params
  const partner = await fetchPartner(id)
  if (!partner) return { title: 'Partner Not Found — ACCOOP' }
  return {
    title: `${partner.name} — ACCOOP Partners`,
    description: partner.additional_notes
      ? partner.additional_notes.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim().slice(0, 160)
      : `Learn about ${partner.name}, a verified community partner in the ACCOOP network.`,
  }
}

export default async function PartnerDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const partner = await fetchPartner(id)
  if (!partner) notFound()
  return <PartnerDetailView partner={partner} />
}
