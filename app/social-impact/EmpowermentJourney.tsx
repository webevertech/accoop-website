'use client';

import { useEffect, useState } from 'react';
import { Home as HomeIcon, SquareCheckBig, Clock, Briefcase, Building2, Star } from 'lucide-react';

const STEPS = [
  { icon: HomeIcon, b: 'Resident', s: 'Join or connect with the co-op' },
  { icon: SquareCheckBig, b: 'Assessment', s: 'Four assessments, one plan' },
  { icon: Clock, b: 'Services', s: 'Connect to trusted providers' },
  { icon: Briefcase, b: 'Job', s: 'Training & work-based learning' },
  { icon: Building2, b: 'Business', s: 'Vendor & entrepreneurship paths' },
  { icon: Star, b: 'Ownership', s: 'Become a community owner' },
];
const PCTS = ['0%', '20%', '40%', '60%', '80%', '100%'];

export default function EmpowermentJourney() {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const t = setInterval(() => setIdx((i) => (i + 1) % STEPS.length), 1900);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-7 shadow-2xl border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <b className="font-heading font-bold text-foreground">Your Empowerment Journey</b>
        <span className="inline-flex items-center gap-1.5 text-xs font-heading font-semibold text-primary">
          <i className="w-2 h-2 rounded-full bg-primary animate-pulse" aria-hidden="true" /> Live pathway
        </span>
      </div>

      <ol>
        {STEPS.map((st, i) => {
          const Icon = st.icon;
          const active = i === idx;
          const done = i < idx;
          const filled = active || done;
          const last = i === STEPS.length - 1;
          return (
            <li key={st.b} className="flex gap-4">
              <div className="flex flex-col items-center self-stretch">
                <div
                  className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 transition-all duration-500 ${
                    filled ? 'bg-primary text-white' : 'bg-white border border-gray-200 text-foreground/45'
                  } ${active ? 'shadow-md shadow-primary/30' : ''}`}
                >
                  <Icon className="w-5 h-5" aria-hidden="true" />
                </div>
                {!last && <div className={`w-0.5 grow my-1.5 rounded-full transition-colors duration-500 ${done ? 'bg-primary' : 'bg-gray-200'}`} />}
              </div>
              <div className={`pb-6 ${last ? 'pb-0' : ''}`}>
                <b className={`block font-heading font-bold text-[15px] leading-tight transition-colors duration-500 ${active ? 'text-primary' : 'text-foreground'}`}>{st.b}</b>
                <span className="text-sm text-foreground/55">{st.s}</span>
              </div>
            </li>
          );
        })}
      </ol>

      <div className="flex items-center justify-between mt-2 pt-4 border-t border-dashed border-gray-200">
        <span className="text-sm text-foreground/55">From benefits to stability to ownership</span>
        <b className="font-heading font-bold text-primary text-sm tabular-nums">{PCTS[idx]} → 100%</b>
      </div>
    </div>
  );
}
