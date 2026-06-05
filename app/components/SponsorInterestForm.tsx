'use client';

import { useEffect, useRef, useState } from 'react';

// Reuses the existing GHL "Main Inquiry Form" (same form used by the site-wide modal).
const FORM_ID = '1mUxFpmyhY1V5BfqFioB';
const FORM_NAME = 'Main Inquiry Form';
const FORM_HEIGHT = 833;

export default function SponsorInterestForm() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [load, setLoad] = useState(false);

  // Lazy-load the iframe only when the form scrolls into view.
  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin: '300px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Inject the GHL embed script once the form is needed.
  useEffect(() => {
    if (!load) return;
    if (!document.querySelector('script[src*="form_embed"]')) {
      const script = document.createElement('script');
      script.src = 'https://links.webevertech.com/js/form_embed.js';
      script.async = true;
      document.body.appendChild(script);
    }
  }, [load]);

  const iframeId = `inline-form-${FORM_ID}`;

  return (
    <div ref={wrapperRef} className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
      {load ? (
        <iframe
          src={`https://links.webevertech.com/widget/form/${FORM_ID}`}
          style={{ width: '100%', height: `${FORM_HEIGHT}px`, border: 'none', borderRadius: '24px' }}
          id={iframeId}
          data-layout="{'id':'INLINE'}"
          data-trigger-type="alwaysShow"
          data-trigger-value=""
          data-activation-type="alwaysActivated"
          data-activation-value=""
          data-deactivation-type="neverDeactivate"
          data-deactivation-value=""
          data-form-name={FORM_NAME}
          data-height={FORM_HEIGHT}
          data-layout-iframe-id={iframeId}
          data-form-id={FORM_ID}
          title={FORM_NAME}
        />
      ) : (
        <div style={{ height: `${FORM_HEIGHT}px` }} className="flex items-center justify-center text-foreground/40">
          <span className="animate-pulse">Loading form…</span>
        </div>
      )}
    </div>
  );
}
