/**
 * Registration API layer for the native "Join the Co-Op" form.
 *
 * Talks to the OneConnect360 backend. All network access is isolated here so the form
 * component never calls fetch directly.
 *
 * Base URL: configured via NEXT_PUBLIC_ONECONNECT_API_BASE in .env.local or .env
 * See .env.example for configuration details.
 *
 * Verified endpoints (GET, JSON `{ "data": [...] }`):
 *   /api/location/countries
 *   /api/location/states?country_id=<id>
 *   /api/location/counties?state_id=<id>
 *   /api/location/cities?county_id=<id>
 *   /api/location/zip-codes?city_id=<id>          (items use `zip_code`, not `name`)
 *   POST /api/customers/register                   (422 returns { message, errors })
 */

export interface Option {
  /** Value submitted to the API (location IDs are numeric strings; zip is the code). */
  value: string;
  /** Human-readable label shown in the dropdown. */
  label: string;
}

/** Form-shaped payload. Mapped to the API's snake_case fields inside submitRegistration. */
export interface RegistrationPayload {
  email: string;
  firstName: string;
  middleInitial: string;
  lastName: string;
  otherName: string;
  address: string;
  phone: string;
  alternatePhone: string;
  /** Location IDs (as strings) from the cascading dropdowns. */
  country: string;
  state: string;
  county: string;
  city: string;
  /** Zip code string, e.g. "08401". */
  zip: string;
  dateOfBirth: string;
  gender: string;
  preferredLanguage: string;
  veteranStatus: string;
  isPublicAssessment: string;
  password: string;
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

/* ------------------------------------------------------------------ *
 * Location lookups
 * ------------------------------------------------------------------ */

interface RawLocation {
  id?: number | string;
  name?: string;
  zip_code?: string;
}

async function fetchData(path: string): Promise<RawLocation[]> {
  try {
    const res = await fetch(`${API_BASE}${path}`, { headers: { Accept: 'application/json' } });
    if (!res.ok) return [];
    const json = await res.json();
    return Array.isArray(json?.data) ? (json.data as RawLocation[]) : [];
  } catch {
    return [];
  }
}

/** Map {id,name} rows to options, de-duplicated by value. */
function toIdOptions(rows: RawLocation[]): Option[] {
  const seen = new Set<string>();
  const out: Option[] = [];
  for (const r of rows) {
    const value = String(r.id ?? '');
    if (!value || seen.has(value)) continue;
    seen.add(value);
    out.push({ value, label: r.name ?? value });
  }
  return out;
}

export async function getCountries(): Promise<Option[]> {
  return toIdOptions(await fetchData('/api/location/countries'));
}

export async function getStates(countryId: string): Promise<Option[]> {
  if (!countryId) return [];
  return toIdOptions(await fetchData(`/api/location/states?country_id=${encodeURIComponent(countryId)}`));
}

export async function getCounties(stateId: string): Promise<Option[]> {
  if (!stateId) return [];
  return toIdOptions(await fetchData(`/api/location/counties?state_id=${encodeURIComponent(stateId)}`));
}

export async function getCities(countyId: string): Promise<Option[]> {
  if (!countyId) return [];
  return toIdOptions(await fetchData(`/api/location/cities?county_id=${encodeURIComponent(countyId)}`));
}

/** Cities for a state. This backend keys cities by state (not county). */
export async function getCitiesByState(stateId: string): Promise<Option[]> {
  if (!stateId) return [];
  return toIdOptions(await fetchData(`/api/location/cities?state_id=${encodeURIComponent(stateId)}`));
}

/** Zip codes use the `zip_code` field; the option value IS the code (what register expects). */
export async function getZips(cityId: string): Promise<Option[]> {
  if (!cityId) return [];
  const rows = await fetchData(`/api/location/zip-codes?city_id=${encodeURIComponent(cityId)}`);
  const seen = new Set<string>();
  const out: Option[] = [];
  for (const r of rows) {
    const code = r.zip_code ?? '';
    if (!code || seen.has(code)) continue;
    seen.add(code);
    out.push({ value: code, label: code });
  }
  return out;
}

/* ------------------------------------------------------------------ *
 * Submit
 * ------------------------------------------------------------------ */

/** Maps API (snake_case) error keys back to FORM field names for inline highlighting. */
const API_TO_FORM_FIELD: Record<string, string> = {
  first_name: 'firstName',
  middle_name: 'middleInitial',
  last_name: 'lastName',
  other_name: 'otherName',
  email: 'email',
  address: 'address',
  phone: 'phone',
  alternate_phone: 'alternatePhone',
  country_id: 'country',
  state_id: 'state',
  county_id: 'county',
  city_id: 'city',
  zip_code: 'zip',
  dob: 'dateOfBirth',
  gender: 'gender',
  language_code: 'preferredLanguage',
  veteran_status: 'veteranStatus',
  is_public_assessment: 'isPublicAssessment',
  password: 'password',
};

export async function submitRegistration(payload: RegistrationPayload): Promise<SubmitResult> {
  const body = {
    first_name: payload.firstName,
    middle_name: payload.middleInitial,
    last_name: payload.lastName,
    other_name: payload.otherName,
    email: payload.email,
    address: payload.address,
    phone: payload.phone,
    alternate_phone: payload.alternatePhone,
    country_id: payload.country,
    state_id: payload.state,
    county_id: payload.county,
    city_id: payload.city,
    zip_code: payload.zip,
    dob: payload.dateOfBirth,
    gender: payload.gender,
    language_code: payload.preferredLanguage,
    veteran_status: payload.veteranStatus,
    is_public_assessment: payload.isPublicAssessment,
    password: payload.password,
    password_confirmation: payload.password,
    'g-recaptcha-response': payload.recaptchaToken,
  };

  let res: Response;
  try {
    res = await fetch(`${API_BASE}/api/customers/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(body),
    });
  } catch {
    return { ok: false, message: 'Network error — please check your connection and try again.' };
  }

  if (res.ok) {
    return { ok: true, message: 'Your registration was submitted successfully.' };
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

/* ------------------------------------------------------------------ *
 * Static option lists (not location-dependent)
 * ------------------------------------------------------------------ */

export const GENDER_OPTIONS: Option[] = [
  { value: 'male', label: 'Male' },
  { value: 'female', label: 'Female' },
  { value: 'non-binary', label: 'Non-binary' },
  { value: 'prefer-not-to-say', label: 'Prefer not to say' },
];

/** Values are ISO 639-1 language codes (sent as language_code). */
export const LANGUAGE_OPTIONS: Option[] = [
  { value: 'en', label: 'English' },
  { value: 'es', label: 'Spanish' },
  { value: 'fr', label: 'French' },
  { value: 'zh', label: 'Mandarin' },
  { value: 'pt', label: 'Portuguese' },
  { value: 'ar', label: 'Arabic' },
];

export const VETERAN_OPTIONS: Option[] = [
  { value: 'yes', label: 'Yes' },
  { value: 'no', label: 'No' },
  { value: 'prefer-not-to-say', label: 'Prefer not to say' },
];
