'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const SECTIONS = [
  { id: 'overview', label: 'Overview' },
  { id: 'how-it-works', label: 'How It Works' },
  { id: 'support', label: 'Support Services' },
  { id: 'ideal-institute', label: 'Ideal Institute' },
  { id: 'impact', label: 'Our Impact' },
  { id: 'get-started', label: 'Get Help' },
  { id: 'partner', label: 'Become a Partner' },
];

export default function SectionNav() {
  const [active, setActive] = useState<string>(SECTIONS[0].id);
  const [stuck, setStuck] = useState(false);
  const sentinelRef = useRef<HTMLDivElement>(null);

  // Scroll-spy: highlight the section currently in the viewport's reading band.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 }
    );

    SECTIONS.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  // Detect when the nav is pinned to the top (sentinel scrolled above the viewport).
  useEffect(() => {
    const el = sentinelRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setStuck(!entry.isIntersecting),
      { threshold: 0 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (!el) return;
    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    el.scrollIntoView({ behavior: prefersReduced ? 'auto' : 'smooth', block: 'start' });
    setActive(id);
  };

  return (
    <>
      {/* Sentinel: sits just above the sticky nav so we can detect the pinned state. */}
      <div ref={sentinelRef} aria-hidden="true" className="h-px w-full" />

      <nav
        aria-label="On this page"
        className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-y border-gray-200 shadow-sm"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-3">
          <Link
            href="/"
            aria-label="Atlantic City Community Cooperative — home"
            className={`shrink-0 transition-all duration-300 ${
              stuck ? 'opacity-100 w-auto' : 'opacity-0 w-0 overflow-hidden pointer-events-none'
            }`}
          >
            <Image
              src="/logo.png"
              alt="Atlantic City Community Cooperative"
              width={160}
              height={64}
              className="h-10 w-auto"
            />
          </Link>

          <ul className="flex-1 flex justify-start lg:justify-center gap-1 sm:gap-2 overflow-x-auto -mb-px [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
            {SECTIONS.map((s) => {
              const isActive = active === s.id;
              return (
                <li key={s.id} className="shrink-0">
                  <a
                    href={`#${s.id}`}
                    onClick={(e) => handleClick(e, s.id)}
                    aria-current={isActive ? 'true' : undefined}
                    className={`inline-flex items-center px-3 sm:px-4 py-4 text-sm font-heading font-medium whitespace-nowrap border-b-2 transition-colors duration-200 ${
                      isActive
                        ? 'text-primary border-primary'
                        : 'text-foreground/70 border-transparent hover:text-primary hover:border-primary/40'
                    }`}
                  >
                    {s.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </nav>
    </>
  );
}
