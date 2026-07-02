/**
 * Google reCAPTCHA v2 ("I'm not a robot" checkbox) helper.
 *
 * Loads the reCAPTCHA script once. The visible checkbox is rendered by the
 * <RecaptchaCheckbox> component, which calls grecaptcha.render() and hands the
 * solved token back to the form. The token is sent to the backend, which must
 * verify it with the secret key via https://www.google.com/recaptcha/api/siteverify.
 *
 * Site key: configured via NEXT_PUBLIC_RECAPTCHA_SITE_KEY in .env.
 *   ⚠️ Until that env var is set, reCAPTCHA is disabled (no checkbox renders)
 *   so local development still works.
 */

interface Grecaptcha {
  render: (
    container: HTMLElement,
    params: {
      sitekey: string;
      callback: (token: string) => void;
      'expired-callback'?: () => void;
      'error-callback'?: () => void;
    },
  ) => number;
  reset: (widgetId?: number) => void;
  getResponse: (widgetId?: number) => string;
}

declare global {
  interface Window {
    grecaptcha?: Grecaptcha;
  }
}

const SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || '';

/** The configured site key (empty string when unset). */
export const RECAPTCHA_SITE_KEY = SITE_KEY;

/** True when a site key is configured (controls whether the checkbox renders). */
export const RECAPTCHA_ENABLED = !!SITE_KEY;

let scriptPromise: Promise<void> | null = null;

/** Inject the reCAPTCHA v2 script once. Resolves when the API is available. */
export function loadRecaptcha(): Promise<void> {
  if (typeof window === 'undefined' || !SITE_KEY) return Promise.resolve();
  if (window.grecaptcha?.render) return Promise.resolve();
  if (scriptPromise) return scriptPromise;

  scriptPromise = new Promise<void>((resolve, reject) => {
    const script = document.createElement('script');
    // v2: load api.js WITHOUT ?render= — that param is v3-only and 400s a v2 key.
    script.src = 'https://www.google.com/recaptcha/api.js';
    script.async = true;
    script.defer = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error('Failed to load reCAPTCHA'));
    document.head.appendChild(script);
  });
  return scriptPromise;
}
