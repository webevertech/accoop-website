'use client'

import { useState } from 'react'
import Image from 'next/image'
import {
  Clock,
  MapPin,
  ExternalLink,
  ChevronDown,
  Building2,
  FileText,
  CheckCircle,
  User,
  Star,
} from 'lucide-react'
import type { PartnerDetail } from '../../lib/partnersApi'

const BADGE_COLORS = [
  'bg-cyan-50 text-cyan-600 border-cyan-100',
  'bg-green-50 text-green-600 border-green-100',
  'bg-purple-50 text-purple-600 border-purple-100',
  'bg-yellow-50 text-yellow-600 border-yellow-100',
]

const PROGRAM_BADGE_COLORS = [
  'bg-cyan-50 text-cyan-600 border-cyan-100',
  'bg-purple-50 text-purple-600 border-purple-100',
  'bg-green-50 text-green-600 border-green-100',
  'bg-yellow-50 text-yellow-600 border-yellow-100',
  'bg-blue-50 text-blue-600 border-blue-100',
]

const POPULATION_METRICS = [
  { pct: '35%', label: 'TANF / GA Recipients', color: 'text-blue-500', bar: 'bg-blue-500', width: 'w-[35%]' },
  { pct: '28%', label: 'SNAP Recipients', color: 'text-green-500', bar: 'bg-green-500', width: 'w-[28%]' },
  { pct: '22%', label: 'Justice-Impacted', color: 'text-purple-500', bar: 'bg-purple-500', width: 'w-[22%]' },
  { pct: '15%', label: 'Reentry Individuals', color: 'text-yellow-500', bar: 'bg-yellow-500', width: 'w-[15%]' },
]

function stripHtml(html: string) {
  return html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim()
}

export default function PartnerDetailView({ partner }: { partner: PartnerDetail }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0)
  const [activeTab, setActiveTab] = useState<Record<number, number>>({})

  const partnerSinceYear = partner.created_at
    ? new Date(partner.created_at).getUTCFullYear()
    : null

  const websiteDisplay = partner.website_url
    ? partner.website_url.replace(/^https?:\/\//, '')
    : null

  function getTab(programIdx: number) {
    return activeTab[programIdx] ?? 0
  }

  const hasSocialMedia =
    partner.social_media.twitter ||
    partner.social_media.facebook ||
    partner.social_media.instagram

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex flex-col lg:flex-row gap-8">

        {/* ── Left Sidebar ───────────────────────────────────── */}
        <aside className="w-full lg:w-[320px] shrink-0 space-y-6">

          {/* Organization Header Card */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
            <div className="flex gap-4">
              <div className="w-16 h-16 shrink-0 rounded-lg overflow-hidden border border-gray-100 flex items-center justify-center bg-gray-50">
                {partner.logo_url ? (
                  <Image
                    src={partner.logo_url}
                    alt={partner.name}
                    width={64}
                    height={64}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <Building2 className="w-8 h-8 text-gray-400" />
                )}
              </div>
              <div className="min-w-0">
                <h2 className="text-xl font-heading font-bold text-gray-900 leading-tight mb-1">
                  {partner.name}
                </h2>
                {partner.website_url && (
                  <a
                    href={partner.website_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 text-sm hover:underline inline-flex items-center gap-1 mb-3"
                  >
                    <ExternalLink className="w-3.5 h-3.5 shrink-0" />
                    <span className="truncate max-w-[160px]">{websiteDisplay}</span>
                  </a>
                )}
                <div className="flex flex-wrap gap-2">
                  <span className="px-2.5 py-0.5 bg-green-50 text-green-600 text-[11px] font-semibold rounded-full flex items-center gap-1 border border-green-100">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 shrink-0" />
                    Active Partner
                  </span>
                  <span className="px-2.5 py-0.5 bg-blue-50 text-blue-600 text-[11px] font-semibold rounded-full border border-blue-100">
                    100+ Referrals
                  </span>
                </div>
              </div>
            </div>

            {partner.service_tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-gray-100">
                {partner.service_tags.map((tag, i) => (
                  <span
                    key={tag.id}
                    className={`px-3 py-1 border text-[11px] font-semibold rounded-full ${BADGE_COLORS[i % BADGE_COLORS.length]}`}
                  >
                    {tag.name}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Office Hours Card */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <Clock className="w-5 h-5 text-blue-500" />
              <h3 className="font-bold text-gray-800 text-sm">Office Hours</h3>
            </div>
            {partner.office_hours ? (
              <p className="text-sm text-gray-600 whitespace-pre-line">{partner.office_hours}</p>
            ) : (
              <div className="text-sm text-gray-600 space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-500">Mon–Fri</span>
                  <span className="font-medium text-gray-800">9:00 AM – 6:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Saturday</span>
                  <span className="font-medium text-gray-800">10:00 AM – 3:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Sunday</span>
                  <span className="font-medium text-gray-800">Closed</span>
                </div>
              </div>
            )}
          </div>

          {/* Location & Social Card */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-3">
              <MapPin className="w-5 h-5 text-blue-500" />
              <h3 className="font-bold text-gray-800 text-sm">1 Location</h3>
            </div>
            {partner.display_address && (
              <p className="text-sm text-gray-600 mb-5 pl-7">{partner.display_address}</p>
            )}
            {hasSocialMedia && (
              <div className="flex gap-2 pl-7">
                {partner.social_media.twitter && (
                  <a
                    href={partner.social_media.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Twitter / X"
                    className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-50 transition-colors"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                  </a>
                )}
                {partner.social_media.facebook && (
                  <a
                    href={partner.social_media.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Facebook"
                    className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-50 transition-colors"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                  </a>
                )}
                {partner.social_media.instagram && (
                  <a
                    href={partner.social_media.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram"
                    className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-50 transition-colors"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    </svg>
                  </a>
                )}
              </div>
            )}
          </div>

          {/* Advertisement placeholder */}
          <div className="rounded-xl border border-dashed border-gray-300 p-8 flex items-center justify-center text-gray-400 bg-gray-50 h-[120px]">
            <span className="text-sm font-medium">Advertisement</span>
          </div>
        </aside>

        {/* ── Right Main Column ─────────────────────────────── */}
        <div className="flex-1 min-w-0">

          {/* Banner */}
          <div
            className="rounded-2xl overflow-hidden relative mb-10 h-[240px]"
            style={{
              backgroundColor: '#1a202c',
              ...(partner.banner_url
                ? {
                    backgroundImage: `url('${partner.banner_url}')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }
                : {}),
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
            <div className="absolute inset-0 p-8 flex flex-col justify-center">
              <div className="flex gap-3 mb-4">
                <span className="px-3 py-1 bg-green-500/20 text-green-400 text-[11px] font-semibold rounded-full border border-green-500/30 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 shrink-0" />
                  Active Partner
                </span>
                <span className="px-3 py-1 bg-blue-500/20 text-blue-400 text-[11px] font-semibold rounded-full border border-blue-500/30 flex items-center gap-1">
                  <Star className="w-3 h-3 shrink-0" />
                  100+ Referrals
                </span>
              </div>
              <h1 className="text-3xl font-heading font-bold text-white mb-2">
                Partner Since {partnerSinceYear ?? '—'}
              </h1>
              {partner.additional_notes && (
                <p className="text-gray-300 max-w-xl text-sm line-clamp-2">
                  {stripHtml(partner.additional_notes)}
                </p>
              )}
            </div>
          </div>

          {/* Programs & Services */}
          <div className="mb-10">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-[13px] font-bold text-gray-800 uppercase tracking-wider">
                Programs &amp; Services
              </h2>
              <span className="text-sm text-gray-500">
                {partner.programs.length} program{partner.programs.length !== 1 ? 's' : ''}
              </span>
            </div>

            <div className="space-y-4">
              {partner.programs.length === 0 ? (
                <p className="text-sm text-gray-400 py-8 text-center">No programs listed.</p>
              ) : (
                partner.programs.map((program, idx) => {
                  const isOpen = openIndex === idx
                  const tab = getTab(idx)

                  return (
                    <div
                      key={program.id}
                      className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm"
                    >
                      {/* Accordion Header */}
                      <button
                        type="button"
                        onClick={() => setOpenIndex(isOpen ? null : idx)}
                        className="w-full px-6 py-4 flex items-center justify-between bg-white hover:bg-gray-50 transition-colors text-left"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <span className="w-2 h-2 rounded-full bg-blue-500 shrink-0" />
                          <h3 className="font-semibold text-gray-800 truncate">
                            {program.program_name}
                          </h3>
                        </div>
                        <div className="flex items-center gap-3 shrink-0 ml-4">
                          {program.service && (
                            <span
                              className={`hidden sm:inline-flex px-3 py-1 text-[11px] font-semibold rounded-full border ${PROGRAM_BADGE_COLORS[idx % PROGRAM_BADGE_COLORS.length]}`}
                            >
                              {program.service}
                            </span>
                          )}
                          <ChevronDown
                            className="w-5 h-5 text-gray-400 transition-transform duration-300"
                            style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
                          />
                        </div>
                      </button>

                      {/* Accordion Body */}
                      {isOpen && (
                        <div>
                          {/* Tab Header */}
                          <div className="flex border-t border-b border-gray-100 px-6 bg-white">
                            {['Program Info', 'Mission Statement'].map((label, tabIdx) => (
                              <button
                                key={label}
                                type="button"
                                onClick={() =>
                                  setActiveTab((prev) => ({ ...prev, [idx]: tabIdx }))
                                }
                                className={`px-4 py-3 text-[13px] font-semibold border-b-2 transition-colors focus:outline-none ${
                                  tab === tabIdx
                                    ? 'border-blue-500 text-blue-600'
                                    : 'border-transparent text-gray-400 hover:text-gray-600'
                                }`}
                              >
                                {label}
                              </button>
                            ))}
                          </div>

                          {/* Tab Content */}
                          <div className="p-6 bg-white">

                            {/* Program Info */}
                            {tab === 0 && (
                              <div>
                                <p className="text-sm text-gray-400 mb-4">
                                  Program Type:{' '}
                                  <span className="text-gray-500">{program.service ?? '—'}</span>
                                </p>

                                {program.program_summary && (
                                  <div
                                    className="text-gray-700 text-[14.5px] leading-relaxed mb-8"
                                    dangerouslySetInnerHTML={{ __html: program.program_summary }}
                                  />
                                )}

                                <div className="space-y-6">
                                  {program.geographic_coverage && (
                                    <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-2 items-start border-b border-gray-50 pb-4">
                                      <div className="flex items-center gap-3 text-gray-500 text-sm font-medium">
                                        <MapPin className="w-5 h-5 text-gray-400 shrink-0" />
                                        <span>Serving:</span>
                                      </div>
                                      <div className="text-blue-500 text-[14.5px]">
                                        {program.geographic_coverage}
                                      </div>
                                    </div>
                                  )}

                                  {program.referral_requirements &&
                                    program.referral_requirements.length > 0 && (
                                      <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-2 items-start border-b border-gray-50 pb-4">
                                        <div className="flex items-center gap-3 text-gray-500 text-sm font-medium">
                                          <FileText className="w-5 h-5 text-gray-400 shrink-0" />
                                          <span>Referral Requirements:</span>
                                        </div>
                                        <ul className="list-disc list-inside space-y-1 text-blue-500 text-[14.5px]">
                                          {program.referral_requirements.map((r, i) => (
                                            <li key={i}>{r}</li>
                                          ))}
                                        </ul>
                                      </div>
                                    )}

                                  {program.eligibility_criteria &&
                                    program.eligibility_criteria.length > 0 && (
                                      <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-2 items-start border-b border-gray-50 pb-4">
                                        <div className="flex items-center gap-3 text-gray-500 text-sm font-medium">
                                          <CheckCircle className="w-5 h-5 text-gray-400 shrink-0" />
                                          <span>Eligibility Criteria:</span>
                                        </div>
                                        <ul className="list-disc list-inside space-y-1 text-blue-500 text-[14.5px]">
                                          {program.eligibility_criteria.map((c, i) => (
                                            <li key={i}>{c}</li>
                                          ))}
                                        </ul>
                                      </div>
                                    )}

                                  {(program.contact_person_name ||
                                    program.contact_person_number) && (
                                    <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-2 items-start">
                                      <div className="flex items-center gap-3 text-gray-500 text-sm font-medium">
                                        <User className="w-5 h-5 text-gray-400 shrink-0" />
                                        <span>Program Contact:</span>
                                      </div>
                                      <div className="text-blue-500 text-[14.5px]">
                                        {[
                                          program.contact_person_name,
                                          program.contact_person_number,
                                        ]
                                          .filter(Boolean)
                                          .join(', ')}
                                      </div>
                                    </div>
                                  )}
                                </div>
                              </div>
                            )}

                            {/* Mission Statement */}
                            {tab === 1 && (
                              <div>
                                <h3 className="font-bold text-gray-900 mb-4 text-[15px]">
                                  Mission Statement
                                </h3>
                                {program.mission_statement ? (
                                  <div
                                    className="text-blue-500 text-[14.5px] leading-relaxed space-y-3"
                                    dangerouslySetInnerHTML={{ __html: program.mission_statement }}
                                  />
                                ) : (
                                  <p className="text-gray-400 text-sm">
                                    No mission statement available.
                                  </p>
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  )
                })
              )}
            </div>
          </div>

          {/* Population Served */}
          <div className="mb-10">
            <h2 className="text-[13px] font-bold text-gray-800 uppercase tracking-wider mb-4">
              Population Served
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {POPULATION_METRICS.map((m) => (
                <div
                  key={m.label}
                  className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm"
                >
                  <div className={`text-3xl font-bold ${m.color} mb-1`}>{m.pct}</div>
                  <div className="text-[13px] text-gray-500 font-medium mb-4">{m.label}</div>
                  <div className="w-full h-1 bg-gray-100 rounded-full overflow-hidden">
                    <div className={`h-full ${m.bar} ${m.width}`} />
                  </div>
                </div>
              ))}
            </div>

            {partner.population_served && (
              <div
                className="mt-4 text-sm text-gray-600 bg-white p-4 rounded-xl border border-gray-100"
                dangerouslySetInnerHTML={{ __html: partner.population_served }}
              />
            )}
          </div>

        </div>
      </div>
    </div>
  )
}
