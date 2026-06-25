'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { MapPin, Check, CalendarDays } from 'lucide-react';
import { getPartners, type Partner } from '../lib/partnersApi';

/** Two-letter monogram fallback when a partner has no logo. */
function initials(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (!parts.length) return '–';
  return (parts[0][0] + (parts[1]?.[0] ?? '')).toUpperCase();
}

/** "June 19, 2026" — formatted in UTC so server and client render identically. */
function joinedDate(iso: string) {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return '';
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' });
}

function PartnerCard({ p }: { p: Partner }) {
  return (
    <article className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 h-full flex flex-col hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
      <div className="flex items-center gap-3 mb-4">
        <span className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0 overflow-hidden font-heading font-bold">
          {p.logo_url ? (
            <Image src={p.logo_url} alt="" width={48} height={48} className="w-full h-full object-cover" />
          ) : (
            initials(p.name)
          )}
        </span>
        <div className="min-w-0">
          <h3 className="font-heading font-semibold text-foreground leading-tight truncate">{p.name}</h3>
          {p.status && (
            <span className="inline-flex items-center gap-1 text-xs font-heading font-semibold text-primary mt-0.5">
              <Check className="w-3 h-3" strokeWidth={3} aria-hidden="true" /> {p.status}
            </span>
          )}
        </div>
      </div>

      {p.service_tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {p.service_tags.map((t) => (
            <span key={t.id} className="px-3 py-1 rounded-full text-xs font-heading font-semibold bg-accent/10 text-foreground/70">
              {t.name}
            </span>
          ))}
        </div>
      )}

      {p.additional_notes && (
        <p className="text-sm text-foreground/70 leading-relaxed mb-4 grow">{p.additional_notes}</p>
      )}

      <div className="mt-auto flex flex-wrap items-center gap-x-4 gap-y-1.5 text-sm text-foreground/55 pt-1">
        {joinedDate(p.created_at) && (
          <span className="inline-flex items-center gap-1.5">
            <CalendarDays className="w-4 h-4 shrink-0" aria-hidden="true" />
            Joined {joinedDate(p.created_at)}
          </span>
        )}
        <span className="inline-flex items-center gap-1.5">
          <MapPin className="w-4 h-4 shrink-0" aria-hidden="true" />
          {p.locations_count} {p.locations_count === 1 ? 'location' : 'locations'}
        </span>
      </div>
    </article>
  );
}

export default function PartnersList() {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    getPartners()
      .then((res) => {
        if (!active) return;
        if (res.ok) {
          setPartners(res.partners);
          setError(null);
        } else {
          setError(res.message ?? 'Could not load partners.');
        }
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, []);

  return (
    <div>
      <div className="text-center mb-8">
        <span className="inline-flex items-center gap-3 mb-4">
          <span className="w-7 h-0.5 rounded-full bg-primary" aria-hidden="true" />
          <span className="text-xs font-heading font-bold uppercase tracking-[0.12em] text-primary">Our Partners</span>
        </span>
        <h3 className="text-2xl md:text-3xl font-heading font-bold text-foreground">Trusted service providers in the network</h3>
      </div>

      {loading && (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6" aria-busy="true">
          {[0, 1, 2].map((i) => (
            <div key={i} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 animate-pulse">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-gray-200" />
                <div className="flex-1 space-y-2"><div className="h-3.5 bg-gray-200 rounded w-2/3" /><div className="h-2.5 bg-gray-200 rounded w-1/3" /></div>
              </div>
              <div className="flex gap-2 mb-4"><div className="h-5 w-20 bg-gray-200 rounded-full" /><div className="h-5 w-16 bg-gray-200 rounded-full" /></div>
              <div className="h-2.5 bg-gray-200 rounded w-1/4" />
            </div>
          ))}
        </div>
      )}

      {!loading && error && (
        <p className="text-center text-foreground/50">{error}</p>
      )}

      {!loading && !error && partners.length === 0 && (
        <p className="text-center text-foreground/50">No partners listed yet — check back soon.</p>
      )}

      {!loading && !error && partners.length > 0 && (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {partners.map((p) => (
            <Link key={p.id} href={`/partners/${p.id}`} className="block h-full">
              <PartnerCard p={p} />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
