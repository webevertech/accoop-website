/**
 * Partners API layer — fetches the public list of approved service providers /
 * impact partners for the "Our Partners" directory on the Social Impact page.
 *
 * The browser calls our OWN same-origin proxy at /api/partners (see
 * app/api/partners/route.ts), which fetches the upstream OneConnect backend
 * server-side. This avoids browser CORS issues entirely — the backend's CORS
 * policy is irrelevant because the cross-origin request happens on the server.
 */

export interface PartnerServiceTag {
  id: number;
  name: string;
}

export interface Partner {
  id: number;
  name: string;
  logo_url: string | null;
  is_approved: number;
  status: string;
  additional_notes: string | null;
  locations_count: number;
  service_tags: PartnerServiceTag[];
  created_at: string;
}

export interface PartnersMeta {
  total: number;
  per_page: number;
  current_page: number;
  last_page: number;
}

export interface PartnersResult {
  ok: boolean;
  partners: Partner[];
  meta?: PartnersMeta;
  /** Human-readable error summary when ok is false. */
  message?: string;
}

export interface PartnerProgram {
  id: number
  program_name: string
  service: string | null
  program_summary: string | null
  mission_statement: string | null
  geographic_coverage: string | null
  referral_requirements: string[] | null
  eligibility_criteria: string[] | null
  contact_person_name: string | null
  contact_person_number: string | null
}

export interface PartnerDetail {
  id: number
  name: string
  website_url: string | null
  contact_number: string | null
  additional_notes: string | null
  mission_statement: string | null
  population_served: string | null
  office_hours: string | null
  display_address: string | null
  logo_url: string | null
  banner_url: string | null
  social_media: {
    twitter: string | null
    facebook: string | null
    instagram: string | null
  }
  language: string | null
  service_tags: PartnerServiceTag[]
  programs: PartnerProgram[]
  created_at: string
}

export interface PartnerDetailResult {
  ok: boolean
  partner?: PartnerDetail
  message?: string
}

/** GET a single partner by ID via our same-origin proxy. */
export async function getPartner(id: string | number): Promise<PartnerDetailResult> {
  let res: Response
  try {
    res = await fetch(`/api/partners/${id}`, { headers: { Accept: 'application/json' } })
  } catch {
    return { ok: false, message: 'Network error — please check your connection.' }
  }

  if (res.status === 404) return { ok: false, message: 'Partner not found.' }
  if (!res.ok) return { ok: false, message: `Could not load partner (${res.status}).` }

  try {
    const json = await res.json()
    return { ok: true, partner: json?.data as PartnerDetail }
  } catch {
    return { ok: false, message: 'Unexpected response from the server.' }
  }
}

/** GET the partner directory via our same-origin proxy. Optional page (1-based). */
export async function getPartners(page = 1): Promise<PartnersResult> {
  const url = `/api/partners${page > 1 ? `?page=${encodeURIComponent(page)}` : ''}`;

  let res: Response;
  try {
    res = await fetch(url, { headers: { Accept: 'application/json' } });
  } catch {
    return { ok: false, partners: [], message: 'Network error — please check your connection and try again.' };
  }

  if (!res.ok) {
    return { ok: false, partners: [], message: `Could not load partners (${res.status}).` };
  }

  try {
    const json = await res.json();
    const partners = Array.isArray(json?.data) ? (json.data as Partner[]) : [];
    const meta = json?.meta as PartnersMeta | undefined;
    return { ok: true, partners, meta };
  } catch {
    return { ok: false, partners: [], message: 'Unexpected response from the server.' };
  }
}
