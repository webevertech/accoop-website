import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import sanitizeHtml from 'sanitize-html'
import PartnerDetailView from './PartnerDetailView'
import type { PartnerDetail } from '../../lib/partnersApi'

// Partner rich-text fields are partner-submitted content that the view renders
// as HTML, so strip anything executable here, server-side, before it reaches
// the page. Defaults keep the formatting tags the backend editor emits.
const RICH_TEXT_OPTIONS: sanitizeHtml.IOptions = {
  allowedAttributes: { ...sanitizeHtml.defaults.allowedAttributes, '*': ['dir'] },
}

function cleanHtml(html: string | null): string | null {
  return html ? sanitizeHtml(html, RICH_TEXT_OPTIONS) : html
}

async function fetchPartner(id: string): Promise<PartnerDetail | null> {
  // Partner IDs are numeric; anything else could walk the upstream path (../).
  if (!/^\d+$/.test(id)) return null
  const base =
    process.env.NEXT_PUBLIC_ONECONNECT_API_BASE || 'https://socialimpact.accoop.com'
  try {
    const res = await fetch(`${base}/api/partners/${id}`, { cache: 'no-store' })
    if (!res.ok) return null
    const json = await res.json()
    const partner = (json?.data as PartnerDetail) ?? null
    if (!partner) return null
    return {
      ...partner,
      population_served: cleanHtml(partner.population_served),
      programs: (partner.programs ?? []).map((program) => ({
        ...program,
        program_summary: cleanHtml(program.program_summary),
        mission_statement: cleanHtml(program.mission_statement),
      })),
    }
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
