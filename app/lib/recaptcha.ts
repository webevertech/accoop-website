/**
 * Google reCAPTCHA v3 helper.
 *
 * Loads the reCAPTCHA script once and exposes executeRecaptcha() to mint a token
 * on form submit. The token is sent to the backend, which must verify it with the
 * secret key via https://www.google.com/recaptcha/api/siteverify.
 *
 * Site key: configured via NEXT_PUBLIC_RECAPTCHA_SITE_KEY in .env.
 *   ⚠️ Until that env var is set, reCAPTCHA is disabled (executeRecaptcha returns null)
 *   so local development still works.
 */

interface Grecaptcha {
  ready: (cb: () => void) => void;
  execute: (siteKey: string, opts: { action: string }) => Promise<string>;
}

declare global {
  interface Window {
    grecaptcha?: Grecaptcha;
  }
}

const SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || '';

/** True when a site key is configured (controls whether the badge/token is used). */
export const RECAPTCHA_ENABLED = !!SITE_KEY;

let scriptPromise: Promise<void> | null = null;

/** Inject the reCAPTCHA v3 script once. Resolves when window.grecaptcha is ready. */
export function loadRecaptcha(): Promise<void> {
  if (typeof window === 'undefined' || !SITE_KEY) return Promise.resolve();
  if (scriptPromise) return scriptPromise;

  scriptPromise = new Promise<void>((resolve, reject) => {
    if (window.grecaptcha) {
      resolve();
      return;
    }
    const script = document.createElement('script');
    script.src = `https://www.google.com/recaptcha/api.js?render=${SITE_KEY}`;
    script.async = true;
    script.defer = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error('Failed to load reCAPTCHA'));
    document.head.appendChild(script);
  });
  return scriptPromise;
}

/**
 * Execute reCAPTCHA v3 for the given action and return the token.
 * Returns null when reCAPTCHA is not configured or fails to load.
 */
export async function executeRecaptcha(action: string): Promise<string | null> {
  if (!SITE_KEY) return null;
  try {
    await loadRecaptcha();
  } catch {
    return null;
  }
  const grecaptcha = window.grecaptcha;
  if (!grecaptcha) return null;

  return new Promise<string | null>((resolve) => {
    grecaptcha.ready(() => {
      grecaptcha
        .execute(SITE_KEY, { action })
        .then((token) => resolve(token))
        .catch(() => resolve(null));
    });
  });
}
