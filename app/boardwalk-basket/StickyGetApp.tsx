'use client';

import { useEffect, useState } from 'react';
import { Smartphone } from 'lucide-react';
import { DOWNLOAD_ANCHOR } from './appLinks';

/**
 * Mobile-only sticky "Get the App" bar. It opens the download section (never auto-redirects to
 * a store) and hides itself whenever store badges or the footer are on screen, so it never
 * duplicates the badges or covers footer links.
 */
export default function StickyGetApp() {
  const [hidden, setHidden] = useState(true);

  useEffect(() => {
    const targets: Element[] = Array.from(document.querySelectorAll('[data-app-badges]'));
    const footer = document.querySelector('footer');
    if (footer) targets.push(footer);
    if (targets.length === 0 || typeof IntersectionObserver === 'undefined') return;

    const onScreen = new Set<Element>();
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) onScreen.add(entry.target);
        else onScreen.delete(entry.target);
      }
      setHidden(onScreen.size > 0);
    });
    targets.forEach((t) => observer.observe(t));
    return () => observer.disconnect();
  }, []);

  return (
    <div
      inert={hidden}
      className={`fixed inset-x-0 bottom-0 z-40 px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] lg:hidden transition-[transform,opacity] duration-300 ease-out ${
        hidden ? 'translate-y-full opacity-0' : 'translate-y-0 opacity-100'
      }`}
    >
      <a
        href={`#${DOWNLOAD_ANCHOR}`}
        data-track="get-the-app-sticky"
        className="flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-primary-dark px-6 py-3 font-heading text-lg font-semibold text-white shadow-[0_10px_30px_-8px_rgba(26,46,31,0.55)] ring-1 ring-white/20"
      >
        <Smartphone className="h-5 w-5" aria-hidden="true" />
        Get the App
      </a>
    </div>
  );
}
