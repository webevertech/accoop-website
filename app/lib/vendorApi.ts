/**
 * Vendor / Service Provider API layer for the native "Become a Service Provider" form.
 *
 * Replaces the previous GoHighLevel iframe embed. All network access is isolated here so
 * the form component never calls fetch directly.
 *
 * The request is sent as multipart/form-data because the form includes file uploads
 * (organization logo + banner image).
 *
 * Endpoint: POST {NEXT_PUBLIC_ONECONNECT_API_BASE}/api/partners/register
 * Base URL: configured via NEXT_PUBLIC_ONECONNECT_API_BASE in .env.local or .env
 * (shares the same OneConnect backend as registrationApi).
 */

/** Form-shaped payload. Mapped to the API field names inside submitVendor. */
export interface VendorPayload {
  firstName: string;
  lastName: string;
  otherName: string;
  phone: string;
  email: string;
  organizationName: string;
  organizationStreetAddress: string;
  /** Location IDs (as strings) from the cascading dropdowns; zip is the code. */
  country: string;
  state: string;
  city: string;
  zip: string;
  county: string;
  displayAddress: string;
  website: string;
  logo: File | null;
  banner: File | null;
  /** Google reCAPTCHA v3 token; the backend must verify it via siteverify. */
  recaptchaToken: string;
}

export interface SubmitResult {
  ok: boolean;
  /** Human-readable summary message (success or error). */
  message?: string;
  /** Per-field errors keyed by the FORM field name, ready to merge into form state. */
  fieldErrors?: Record<string, string>;
}

const API_BASE = (process.env.NEXT_PUBLIC_ONECONNECT_API_BASE || '').replace(/\/$/, '');

/** Target endpoint for the partner / vendor registration submission. */
const VENDOR_API_URL = `${API_BASE}/api/partners/register`;

/** Maps API (snake_case) error keys back to FORM field names for inline highlighting. */
const API_TO_FORM_FIELD: Record<string, string> = {
  first_name: 'firstName',
  last_name: 'lastName',
  other_name: 'otherName',
  phone: 'phone',
  email: 'email',
  org_name: 'organizationName',
  street_address: 'organizationStreetAddress',
  country_id: 'country',
  state_id: 'state',
  city_id: 'city',
  zip_code: 'zip',
  county_id: 'county',
  display_address: 'displayAddress',
  website_url: 'website',
  logo: 'logo',
  banner: 'banner',
};

export async function submitVendor(payload: VendorPayload): Promise<SubmitResult> {
  // Build multipart body. Field names below mirror API_TO_FORM_FIELD — keep them in sync.
  const body = new FormData();
  body.append('first_name', payload.firstName);
  body.append('last_name', payload.lastName);
  body.append('other_name', payload.otherName);
  body.append('phone', payload.phone);
  body.append('email', payload.email);
  body.append('org_name', payload.organizationName);
  body.append('street_address', payload.organizationStreetAddress);
  body.append('country_id', payload.country);
  body.append('state_id', payload.state);
  body.append('city_id', payload.city);
  body.append('zip_code', payload.zip);
  body.append('county_id', payload.county);
  body.append('display_address', payload.displayAddress);
  body.append('website_url', payload.website);
  if (payload.recaptchaToken) body.append('g-recaptcha-response', payload.recaptchaToken);
  if (payload.logo) body.append('logo', payload.logo);
  if (payload.banner) body.append('banner', payload.banner);

  let res: Response;
  try {
    // Do NOT set Content-Type manually — the browser adds the multipart boundary.
    res = await fetch(VENDOR_API_URL, {
      method: 'POST',
      headers: { Accept: 'application/json' },
      body,
    });
  } catch {
    return { ok: false, message: 'Network error — please check your connection and try again.' };
  }

  if (res.ok) {
    return { ok: true, message: 'Your application was submitted successfully.' };
  }

  // Parse Laravel-style validation / error responses.
  let message = `Submission failed (${res.status}). Please review your details and try again.`;
  const fieldErrors: Record<string, string> = {};
  try {
    const data = await res.json();
    if (data?.message) message = String(data.message);
    if (data?.errors && typeof data.errors === 'object') {
      for (const [apiKey, msgs] of Object.entries(data.errors as Record<string, string[]>)) {
        const formKey = API_TO_FORM_FIELD[apiKey];
        const text = Array.isArray(msgs) ? msgs[0] : String(msgs);
        if (formKey) fieldErrors[formKey] = text;
      }
    }
  } catch {
    /* keep default message */
  }

  return { ok: false, message, fieldErrors: Object.keys(fieldErrors).length ? fieldErrors : undefined };
}
