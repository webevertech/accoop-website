'use client';
import { useEffect, useRef, useState } from 'react';
import { X } from 'lucide-react';
import type { FormType } from './CTAButton';
import JoinCoopForm from './JoinCoopForm';

const FORMS: Record<FormType, { id: string; name: string; heading: string; height: number }> = {
  inquiry: {
    id: '1mUxFpmyhY1V5BfqFioB',
    name: 'Main Inquiry Form',
    heading: 'Join the Co-Op',
    height: 833,
  },
  vendor: {
    id: 'pSwAZdIkkquNvtVjpeOd',
    name: 'AC COOP BOARDWALK BASKET / VENDOR SIGN UP',
    heading: 'Become a Vendor',
    height: 1689,
  },
  sponsor: {
    id: 'i7kycPHiqfbnDGtn0FbG',
    name: 'Sponsorship Form',
    heading: 'Become a Sponsor',
    height: 751,
  },
};

export default function FormModal() {
  const [open, setOpen] = useState(false);
  const [formType, setFormType] = useState<FormType>('inquiry');
  const [heading, setHeading] = useState<string | undefined>(undefined);
  const [loaded, setLoaded] = useState(false);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent<{ formType?: FormType; heading?: string }>).detail;
      setFormType(detail?.formType ?? 'inquiry');
      setHeading(detail?.heading);
      setLoaded(false);
      triggerRef.current = document.activeElement as HTMLElement;
      setOpen(true);
    };
    window.addEventListener('openFormModal', handler);
    return () => window.removeEventListener('openFormModal', handler);
  }, []);

  useEffect(() => {
    if (!open || formType === 'inquiry') return; // native form needs no embed script
    if (!document.querySelector('script[src*="form_embed"]')) {
      const script = document.createElement('script');
      script.src = 'https://links.webevertech.com/js/form_embed.js';
      script.async = true;
      document.body.appendChild(script);
    }
  }, [open, formType]);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
      setTimeout(() => closeButtonRef.current?.focus(), 50);
    } else {
      document.body.style.overflow = '';
      triggerRef.current?.focus();
    }
    return () => { document.body.style.overflow = ''; };
  }, [open, formType]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setOpen(false);
      return;
    }
    if (e.key !== 'Tab') return;
    const focusable = (e.currentTarget as HTMLElement).querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (e.shiftKey ? document.activeElement === first : document.activeElement === last) {
      e.preventDefault();
      (e.shiftKey ? last : first).focus();
    }
  };

  if (!open) return null;

  const form = FORMS[formType];
  const title = heading ?? form.heading;
  const iframeId = `modal-form-${form.id}`;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="form-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onClick={() => setOpen(false)}
      onKeyDown={handleKeyDown}
    >
      <div
        className="bg-white rounded-2xl w-full max-w-2xl relative shadow-2xl overflow-hidden flex flex-col"
        style={{ height: 'min(870px, 90vh)' }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between gap-4 px-5 py-4 border-b border-gray-200 shrink-0">
          <h2 id="form-modal-title" className="font-heading font-semibold text-lg text-foreground">
            {title}
          </h2>
          <button
            ref={closeButtonRef}
            type="button"
            onClick={() => setOpen(false)}
            className="shrink-0 bg-gray-100 hover:bg-gray-200 rounded-full p-1.5 transition-colors"
            aria-label="Close form"
          >
            <X className="w-5 h-5 text-gray-700" aria-hidden="true" />
          </button>
        </div>
        <div className="relative flex-1 min-h-0 overflow-y-auto bg-background">
          {formType === 'inquiry' ? (
            <JoinCoopForm />
          ) : (
            <>
              {!loaded && (
                <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 bg-white">
                  <span className="w-9 h-9 border-[3px] border-primary border-t-transparent rounded-full animate-spin" aria-hidden="true" />
                  <span className="text-sm text-foreground/50">Loading form…</span>
                </div>
              )}
              <div className="pb-12">
                <iframe
                  key={form.id}
                  src={`https://links.webevertech.com/widget/form/${form.id}`}
                  onLoad={() => setLoaded(true)}
                  style={{ width: '100%', height: `${form.height}px`, border: 'none', display: 'block' }}
                  id={iframeId}
                  data-layout="{'id':'INLINE'}"
                  data-trigger-type="alwaysShow"
                  data-trigger-value=""
                  data-activation-type="alwaysActivated"
                  data-activation-value=""
                  data-deactivation-type="neverDeactivate"
                  data-deactivation-value=""
                  data-form-name={form.name}
                  data-height={form.height}
                  data-layout-iframe-id={iframeId}
                  data-form-id={form.id}
                  title={form.name}
                />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
