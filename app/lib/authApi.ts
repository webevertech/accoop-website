/**
 * Login API layer for the OneConnect360 backend.
 *
 * The marketing site has no auth of its own — sign-in is proxied to the external
 * OneConnect360 app. All network access is isolated here so the modal never calls
 * fetch directly.
 *
 * Base URL: configured via NEXT_PUBLIC_ONECONNECT_API_BASE in .env.local or .env
 * (same convention as registrationApi).
 *
 * Endpoints (POST, JSON `{ email, password }`):
 *   /api/customer/login    (Co-Op)
 *   /api/partner/login     (Partner)
 */

export type LoginRole = 'coop' | 'partner';

export interface LoginCredentials {
  email: string;
  password: string;
  /** When true, persist the auth token across sessions (localStorage vs sessionStorage). */
  remember: boolean;
}

export interface LoginResult {
  ok: boolean;
  /** Human-readable message to surface in the form. */
  message?: string;
  /** Auth token returned by the backend, if any. */
  token?: string;
  /** URL to send the user to after a successful login. */
  redirectUrl?: string;
}

const API_BASE = (process.env.NEXT_PUBLIC_ONECONNECT_API_BASE || '').replace(/\/$/, '');

const LOGIN_PATH: Record<LoginRole, string> = {
  coop: '/api/customer/login',
  partner: '/api/partner/login',
};

/** Storage key for the auth token returned on a successful login. */
const TOKEN_KEY = 'oneconnect_token';

/** Persist the token where the modal can pick a lifetime based on "Remember me". */
function storeToken(token: string, remember: boolean) {
  if (typeof window === 'undefined') return;
  try {
    (remember ? window.localStorage : window.sessionStorage).setItem(TOKEN_KEY, token);
  } catch {
    /* storage may be unavailable (private mode); ignore */
  }
}

/** Authenticate against the role-appropriate OneConnect360 endpoint. */
export async function login(role: LoginRole, credentials: LoginCredentials): Promise<LoginResult> {
  let res: Response;
  try {
    res = await fetch(`${API_BASE}${LOGIN_PATH[role]}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({ email: credentials.email, password: credentials.password }),
    });
  } catch {
    return { ok: false, message: 'Network error — please check your connection and try again.' };
  }

  let data: Record<string, unknown> = {};
  try {
    data = await res.json();
  } catch {
    /* non-JSON response; fall back to status-based messaging below */
  }

  if (res.ok) {
    const token =
      typeof data.token === 'string'
        ? data.token
        : typeof data.access_token === 'string'
          ? data.access_token
          : undefined;
    if (token) storeToken(token, credentials.remember);
    const redirectUrl =
      typeof data.redirect_url === 'string'
        ? data.redirect_url
        : typeof data.redirectUrl === 'string'
          ? data.redirectUrl
          : undefined;
    return { ok: true, token, redirectUrl };
  }

  // Laravel-style error: { message, errors? }. 401/422 carry the useful text.
  const message =
    typeof data.message === 'string'
      ? data.message
      : res.status === 401
        ? 'Invalid email or password.'
        : `Sign in failed (${res.status}). Please try again.`;
  return { ok: false, message };
}

/** Authenticate a Co-Op (customer) account. */
export function loginCoop(credentials: LoginCredentials): Promise<LoginResult> {
  return login('coop', credentials);
}

/** Authenticate a Partner account. */
export function loginPartner(credentials: LoginCredentials): Promise<LoginResult> {
  return login('partner', credentials);
}
