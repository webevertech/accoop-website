/**
 * Login API integration point.
 *
 * The marketing site has no auth of its own — sign-in is handled by the external
 * OneConnect360 app. These helpers are the single place to wire the real login
 * endpoints once they are provided. Until then they return a "not configured"
 * result so the modal can show a friendly placeholder instead of failing silently.
 */

export type LoginRole = 'coop' | 'partner';

export interface LoginCredentials {
  email: string;
  password: string;
  remember: boolean;
}

export interface LoginResult {
  ok: boolean;
  /** Human-readable message to surface in the form. */
  message?: string;
}

const NOT_CONFIGURED: LoginResult = {
  ok: false,
  message: 'Login is being set up and will be available shortly.',
};

/**
 * Authenticate a Co-Op (customer) account.
 * TODO: replace with the real Co-Op login endpoint when provided.
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function loginCoop(credentials: LoginCredentials): Promise<LoginResult> {
  return NOT_CONFIGURED;
}

/**
 * Authenticate a Partner account.
 * TODO: replace with the real Partner login endpoint when provided.
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function loginPartner(credentials: LoginCredentials): Promise<LoginResult> {
  return NOT_CONFIGURED;
}

/** Dispatch to the correct login endpoint for the selected role. */
export function login(role: LoginRole, credentials: LoginCredentials): Promise<LoginResult> {
  return role === 'partner' ? loginPartner(credentials) : loginCoop(credentials);
}
