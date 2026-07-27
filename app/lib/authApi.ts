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
  /** Google reCAPTCHA token */
  recaptchaToken?: string;
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

/** Backend dashboard for each role, reached via the session the login handoff established. */
const DASHBOARD_PATH: Record<LoginRole, string> = {
  coop: '/customer/dashboard',
  partner: '/partner/dashboard',
};

/** Storage keys for the auth state left behind by a successful login. */
const TOKEN_KEY = 'oneconnect_token';
const ROLE_KEY = 'oneconnect_role';

/** Fired whenever the stored auth state changes, so the header can re-render. */
const AUTH_EVENT = 'oneconnect-auth-changed';

export interface StoredAuth {
  role: LoginRole;
  token: string;
}

/** Persist the token where the modal can pick a lifetime based on "Remember me". */
function storeToken(token: string, remember: boolean, role: LoginRole) {
  if (typeof window === 'undefined') return;
  try {
    const storage = remember ? window.localStorage : window.sessionStorage;
    storage.setItem(TOKEN_KEY, token);
    storage.setItem(ROLE_KEY, role);
  } catch {
    /* storage may be unavailable (private mode); ignore */
  }
  window.dispatchEvent(new Event(AUTH_EVENT));
}

/** Cached so getStoredAuth returns a stable reference when nothing changed (required by useSyncExternalStore). */
let cachedAuth: StoredAuth | null = null;

/** Read back whichever login this browser last completed, if any. */
export function getStoredAuth(): StoredAuth | null {
  if (typeof window === 'undefined') return null;
  let token: string | null = null;
  let role: string | null = null;
  try {
    token = window.localStorage.getItem(TOKEN_KEY) ?? window.sessionStorage.getItem(TOKEN_KEY);
    role = window.localStorage.getItem(ROLE_KEY) ?? window.sessionStorage.getItem(ROLE_KEY);
  } catch {
    /* storage may be unavailable (private mode); ignore */
  }

  if (token && (role === 'coop' || role === 'partner')) {
    if (!cachedAuth || cachedAuth.token !== token || cachedAuth.role !== role) {
      cachedAuth = { token, role };
    }
    return cachedAuth;
  }

  cachedAuth = null;
  return null;
}

/** Subscribe to auth state changes (login, logout, or another tab signing in/out). */
export function onAuthChange(listener: () => void): () => void {
  if (typeof window === 'undefined') return () => {};
  window.addEventListener(AUTH_EVENT, listener);
  window.addEventListener('storage', listener);
  return () => {
    window.removeEventListener(AUTH_EVENT, listener);
    window.removeEventListener('storage', listener);
  };
}

/** URL of the role-appropriate dashboard on the OneConnect360 backend. */
export function getDashboardUrl(role: LoginRole): string {
  return `${API_BASE}${DASHBOARD_PATH[role]}`;
}

/**
 * Sign out of the backend session and forget this device's login, then land
 * back on this site. The backend clears its own session; we only need to
 * drop our local copy so the header stops treating the user as signed in.
 */
export function getSignOutUrl(): string {
  return `${API_BASE}/logout-redirect`;
}

export function clearStoredAuth() {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.removeItem(TOKEN_KEY);
    window.localStorage.removeItem(ROLE_KEY);
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.removeItem(ROLE_KEY);
  } catch {
    /* storage may be unavailable (private mode); ignore */
  }
  window.dispatchEvent(new Event(AUTH_EVENT));
}

/** Authenticate against the role-appropriate OneConnect360 endpoint. */
export async function login(role: LoginRole, credentials: LoginCredentials): Promise<LoginResult> {
  let res: Response;
  try {
    res = await fetch(`${API_BASE}${LOGIN_PATH[role]}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
        'g-recaptcha-response': credentials.recaptchaToken,
      }),
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
    if (token) storeToken(token, credentials.remember, role);
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
