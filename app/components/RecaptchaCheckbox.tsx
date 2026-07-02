'use client';

import { useEffect, useRef } from 'react';
import { RECAPTCHA_SITE_KEY, loadRecaptcha } from '../lib/recaptcha';

/**
 * Renders the reCAPTCHA v2 "I'm not a robot" checkbox and reports the token.
 *
 * onChange fires with the token when solved, and with '' when the token
 * expires or errors. Renders nothing when no site key is configured.
 */
export default function RecaptchaCheckbox({ onChange }: { onChange: (token: string) => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetId = useRef<number | null>(null);
  // Keep the latest callback without re-running the render effect.
  const onChangeRef = useRef(onChange);
  useEffect(() => {
    onChangeRef.current = onChange;
  }, [onChange]);

  useEffect(() => {
    if (!RECAPTCHA_SITE_KEY) return;
    let cancelled = false;

    // Wait until grecaptcha.render is available, then mount the widget once.
    const tryRender = () => {
      if (cancelled) return;
      const g = window.grecaptcha;
      if (!g || typeof g.render !== 'function') {
        window.setTimeout(tryRender, 150);
        return;
      }
      if (!containerRef.current || widgetId.current !== null) return;
      widgetId.current = g.render(containerRef.current, {
        sitekey: RECAPTCHA_SITE_KEY,
        callback: (token: string) => onChangeRef.current(token),
        'expired-callback': () => onChangeRef.current(''),
        'error-callback': () => onChangeRef.current(''),
      });
    };

    loadRecaptcha().then(tryRender).catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);

  if (!RECAPTCHA_SITE_KEY) return null;
  return <div ref={containerRef} className="mt-1" />;
}
