'use client';
import { useEffect, useRef, useState } from 'react';
import { X } from 'lucide-react';

export default function FormModal() {
  const [open, setOpen] = useState(false);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const handler = () => {
      triggerRef.current = document.activeElement as HTMLElement;
      setOpen(true);
    };
    window.addEventListener('openFormModal', handler);
    return () => window.removeEventListener('openFormModal', handler);
  }, []);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
      // Move focus to close button after modal opens
      setTimeout(() => closeButtonRef.current?.focus(), 50);
    } else {
      document.body.style.overflow = '';
      // Restore focus to element that triggered the modal
      triggerRef.current?.focus();
    }
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  // Trap focus inside modal
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
        className="bg-white rounded-2xl w-full max-w-2xl relative shadow-2xl overflow-auto"
        style={{ height: 'min(870px, 90vh)' }}
        onClick={(e) => e.stopPropagation()}
      >
        <h2 id="form-modal-title" className="sr-only">Main Inquiry Form</h2>
        <button
          ref={closeButtonRef}
          type="button"
          onClick={() => setOpen(false)}
          className="absolute top-3 right-3 z-10 bg-white/90 hover:bg-white rounded-full p-1.5 shadow-md transition-colors"
          aria-label="Close inquiry form"
        >
          <X className="w-5 h-5 text-gray-700" aria-hidden="true" />
        </button>
        <iframe
          src="https://links.webevertech.com/widget/form/1mUxFpmyhY1V5BfqFioB"
          style={{ width: '100%', height: '100%', border: 'none', borderRadius: '10px' }}
          id="modal-form-1mUxFpmyhY1V5BfqFioB"
          data-layout="{'id':'INLINE'}"
          data-trigger-type="alwaysShow"
          data-trigger-value=""
          data-activation-type="alwaysActivated"
          data-activation-value=""
          data-deactivation-type="neverDeactivate"
          data-deactivation-value=""
          data-form-name="Main Inquiry Form"
          data-height="833"
          data-layout-iframe-id="modal-form-1mUxFpmyhY1V5BfqFioB"
          data-form-id="1mUxFpmyhY1V5BfqFioB"
          title="Main Inquiry Form"
        />
      </div>
    </div>
  );
}
