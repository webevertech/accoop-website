/**
 * Google reCAPTCHA v3 (invisible, score-based) helper.
 *
 * There is no visible widget — call getRecaptchaToken(action) right before a
 * submit to solve invisibly and get back a fresh, single-use token. Verify it
 * server-side against https://www.google.com/recaptcha/api/siteverify, which
 * returns a `score` (0-1) instead of a pass/fail checkbox result.
 *
 * Site key: configured via NEXT_PUBLIC_RECAPTCHA_SITE_KEY in .env.
 *   ⚠️ Until that env var is set, reCAPTCHA is disabled (getRecaptchaToken
 *   resolves to '') so local development still works.
 */

interface Grecaptcha {
  ready: (callback: () => void) => void;
  execute: (siteKey: string, options: { action: string }) => Promise<string>;
}

declare global {
  interface Window {
    grecaptcha?: Grecaptcha;
  }
}

const SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || '';

/** The configured site key (empty string when unset). */
export const RECAPTCHA_SITE_KEY = SITE_KEY;

/** True when a site key is configured (controls whether tokens are requested at all). */
export const RECAPTCHA_ENABLED = !!SITE_KEY;

let scriptPromise: Promise<void> | null = null;

/** Inject the reCAPTCHA v3 script once. Resolves when the API is available. */
function loadRecaptcha(): Promise<void> {
  if (typeof window === 'undefined' || !SITE_KEY) return Promise.resolve();
  if (window.grecaptcha?.execute) return Promise.resolve();
  if (scriptPromise) return scriptPromise;

  scriptPromise = new Promise<void>((resolve, reject) => {
    const script = document.createElement('script');
    // v3: the site key goes in ?render= so the script auto-registers it.
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
 * Solve reCAPTCHA v3 invisibly for the given action and return the token.
 * Resolves to '' when no site key is configured. Call fresh for every
 * submit attempt — tokens are single-use and expire after ~2 minutes.
 */
export async function getRecaptchaToken(action: string): Promise<string> {
  if (!SITE_KEY) return '';
  await loadRecaptcha();

  const g = window.grecaptcha;
  if (!g) throw new Error('reCAPTCHA unavailable');

  return new Promise<string>((resolve, reject) => {
    g.ready(() => {
      g.execute(SITE_KEY, { action }).then(resolve).catch(reject);
    });
  });
}
