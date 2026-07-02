/**
 * Sponsor API layer for the native "Become a Sponsor" form.
 */

export interface SponsorPayload {
  fullName: string;
  phone: string;
  email: string;
  streetAddress: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
  recaptchaToken: string;
}

export interface SubmitResult {
  ok: boolean;
  message?: string;
  fieldErrors?: Record<string, string>;
}

const API_BASE = (process.env.NEXT_PUBLIC_ONECONNECT_API_BASE || '').replace(/\/$/, '');
const SPONSOR_API_URL = `${API_BASE}/api/sponsors/register`;

const API_TO_FORM_FIELD: Record<string, string> = {
  full_name: 'fullName',
  phone: 'phone',
  email: 'email',
  street_address: 'streetAddress',
  city: 'city',
  state: 'state',
  country: 'country',
  postal_code: 'postalCode',
};

export async function submitSponsor(payload: SponsorPayload): Promise<SubmitResult> {
  const body = {
    full_name: payload.fullName,
    phone: payload.phone,
    email: payload.email,
    street_address: payload.streetAddress,
    city: payload.city,
    state: payload.state,
    country: payload.country,
    postal_code: payload.postalCode,
    'g-recaptcha-response': payload.recaptchaToken,
  };

  let res: Response;
  try {
    res = await fetch(SPONSOR_API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(body),
    });
  } catch {
    return { ok: false, message: 'Network error — please check your connection and try again.' };
  }

  if (res.ok) {
    return { ok: true, message: 'Your application was submitted successfully.' };
  }

  let message = `Submission failed (${res.status}). Please review your details and try again.`;
  const fieldErrors: Record<string, string> = {};

  try {
    const data = await res.json();
    if (data.message) message = data.message;
    if (data.errors) {
      for (const [key, val] of Object.entries(data.errors)) {
        const formField = API_TO_FORM_FIELD[key] || key;
        fieldErrors[formField] = Array.isArray(val) ? val[0] : String(val);
      }
    }
  } catch {
    // Non-JSON error
  }

  return { ok: false, message, fieldErrors };
}
