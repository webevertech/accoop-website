'use client';

import { useEffect, useRef, useState } from 'react';
import { CheckCircle2, UploadCloud } from 'lucide-react';
import { submitVendor, type VendorPayload } from '../lib/vendorApi';
import {
  getCountries,
  getStates,
  getCitiesByState,
  getCounties,
  getZips,
  type Option,
} from '../lib/registrationApi';
import SearchableSelect from './SearchableSelect';
import { executeRecaptcha, loadRecaptcha } from '../lib/recaptcha';

type FormState = {
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
};

const INITIAL: FormState = {
  firstName: '',
  lastName: '',
  otherName: '',
  phone: '',
  email: '',
  organizationName: '',
  organizationStreetAddress: '',
  country: '',
  state: '',
  city: '',
  zip: '',
  county: '',
  displayAddress: '',
  website: '',
  logo: null,
  banner: null,
};

type Errors = Partial<Record<keyof FormState, string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^[\d\s()+-]{7,}$/;
const URL_RE = /^https?:\/\/.+\..+/i;
const ACCEPT = '.pdf,.doc,.docx,.xls,.csv,.jpg,.jpeg,.png,.gif';

/* ---------- presentational helpers ---------- */

const fieldBase =
  'w-full rounded-lg border bg-white px-3.5 py-2.5 text-sm text-foreground outline-none transition placeholder:text-foreground/40 focus:ring-2 focus:ring-primary/25';

function inputClass(hasError?: boolean) {
  return `${fieldBase} ${hasError ? 'border-red-400' : 'border-gray-300 focus:border-primary'}`;
}

function Section({ title, subtitle, children }: { title: string; subtitle?: string; children: React.ReactNode }) {
  return (
    <fieldset className="rounded-xl border border-gray-200 bg-white p-5">
      <legend className="px-1 font-heading text-base font-semibold text-foreground">{title}</legend>
      {subtitle && <p className="-mt-1 mb-4 text-xs text-foreground/50">{subtitle}</p>}
      <div className={subtitle ? '' : 'mt-1'}>{children}</div>
    </fieldset>
  );
}

function Label({ htmlFor, children, required }: { htmlFor: string; children: React.ReactNode; required?: boolean }) {
  return (
    <label htmlFor={htmlFor} className="mb-1.5 block text-sm font-medium text-foreground/80">
      {children}
      {required && <span className="ml-0.5 text-red-500">*</span>}
    </label>
  );
}

function FieldError({ msg }: { msg?: string }) {
  if (!msg) return null;
  return <p className="mt-1 text-xs text-red-500">{msg}</p>;
}

function FileField({
  id,
  label,
  hint,
  file,
  onChange,
}: {
  id: string;
  label: string;
  hint?: string;
  file: File | null;
  onChange: (file: File | null) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  return (
    <div>
      <Label htmlFor={id}>{label}</Label>
      {hint && <p className="-mt-1 mb-2 text-xs text-foreground/50">{hint}</p>}
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        className="flex w-full flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-gray-300 bg-white px-4 py-6 text-center transition hover:border-primary hover:bg-primary/5"
      >
        <UploadCloud className="h-6 w-6 text-foreground/40" aria-hidden="true" />
        <span className="text-sm text-foreground/70">{file ? file.name : 'Click to upload'}</span>
        <span className="text-xs text-foreground/40">PDF, DOC/DOCX, XLS/CSV, JPG/JPEG, PNG, GIF</span>
      </button>
      <input
        ref={inputRef}
        id={id}
        type="file"
        accept={ACCEPT}
        className="hidden"
        onChange={(e) => onChange(e.target.files?.[0] ?? null)}
      />
    </div>
  );
}

export default function VendorForm() {
  const [form, setForm] = useState<FormState>(INITIAL);
  const [errors, setErrors] = useState<Errors>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  // Cascading location options
  const [countries, setCountries] = useState<Option[]>([]);
  const [states, setStates] = useState<Option[]>([]);
  const [cities, setCities] = useState<Option[]>([]);
  const [zips, setZips] = useState<Option[]>([]);
  const [counties, setCounties] = useState<Option[]>([]);

  // Load countries and preselect United States (then load its states).
  useEffect(() => {
    let active = true;
    getCountries().then((opts) => {
      if (!active) return;
      setCountries(opts);
      const us = opts.find((o) => /united states/i.test(o.label));
      if (us) {
        setForm((f) => ({ ...f, country: us.value }));
        getStates(us.value).then((s) => active && setStates(s));
      }
    });
    return () => {
      active = false;
    };
  }, []);

  // Preload reCAPTCHA so the token is ready (and the badge shows) before submit.
  useEffect(() => {
    loadRecaptcha();
  }, []);

  const set = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((f) => ({ ...f, [key]: value }));
    setErrors((e) => (e[key] ? { ...e, [key]: undefined } : e));
  };

  /* ---------- location cascade ---------- */

  const onCountryChange = async (value: string) => {
    setForm((f) => ({ ...f, country: value, state: '', city: '', zip: '', county: '' }));
    setStates([]);
    setCities([]);
    setZips([]);
    setCounties([]);
    if (value) setStates(await getStates(value));
  };

  // City and County both hang off State on this backend.
  const onStateChange = async (value: string) => {
    setForm((f) => ({ ...f, state: value, city: '', zip: '', county: '' }));
    setCities([]);
    setZips([]);
    setCounties([]);
    if (value) {
      const [c, co] = await Promise.all([getCitiesByState(value), getCounties(value)]);
      setCities(c);
      setCounties(co);
    }
  };

  const onCityChange = async (value: string) => {
    setForm((f) => ({ ...f, city: value, zip: '' }));
    setZips([]);
    if (value) setZips(await getZips(value));
  };

  /* ---------- validation ---------- */

  const validate = (): Errors => {
    const e: Errors = {};
    if (!form.firstName.trim()) e.firstName = 'First name is required.';
    if (!form.lastName.trim()) e.lastName = 'Last name is required.';

    if (!form.phone.trim()) e.phone = 'Phone is required.';
    else if (!PHONE_RE.test(form.phone)) e.phone = 'Enter a valid phone number.';

    if (!form.email.trim()) e.email = 'Email is required.';
    else if (!EMAIL_RE.test(form.email)) e.email = 'Enter a valid email address.';

    if (!form.organizationName.trim()) e.organizationName = 'Organization name is required.';
    if (!form.organizationStreetAddress.trim())
      e.organizationStreetAddress = 'Organization street address is required.';
    if (!form.country) e.country = 'Country is required.';
    if (!form.state) e.state = 'State is required.';
    if (!form.city) e.city = 'City is required.';
    if (!form.zip) e.zip = 'Zip code is required.';
    if (!form.county) e.county = 'County is required.';
    if (!form.displayAddress.trim()) e.displayAddress = 'Display address is required.';

    if (form.website.trim() && !URL_RE.test(form.website))
      e.website = 'Enter a valid URL (including http:// or https://).';
    return e;
  };

  const handleSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    setSubmitError(null);
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length > 0) {
      const first = document.querySelector<HTMLElement>('[data-invalid="true"]');
      first?.focus();
      return;
    }

    const payload: VendorPayload = {
      firstName: form.firstName.trim(),
      lastName: form.lastName.trim(),
      otherName: form.otherName.trim(),
      phone: form.phone.trim(),
      email: form.email.trim(),
      organizationName: form.organizationName.trim(),
      organizationStreetAddress: form.organizationStreetAddress.trim(),
      country: form.country,
      state: form.state,
      city: form.city,
      zip: form.zip,
      county: form.county,
      displayAddress: form.displayAddress.trim(),
      website: form.website.trim(),
      logo: form.logo,
      banner: form.banner,
      recaptchaToken: '',
    };

    setSubmitting(true);
    payload.recaptchaToken = (await executeRecaptcha('partner_register')) ?? '';
    const result = await submitVendor(payload);
    setSubmitting(false);

    if (result.ok) {
      setSuccess(true);
      return;
    }

    if (result.fieldErrors) {
      setErrors((prev) => ({ ...prev, ...result.fieldErrors }));
      const firstKey = Object.keys(result.fieldErrors)[0];
      document.getElementById(firstKey)?.focus();
    }
    setSubmitError(result.message ?? 'Something went wrong. Please try again.');
  };

  if (success) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 px-6 py-16 text-center">
        <CheckCircle2 className="h-14 w-14 text-primary" aria-hidden="true" />
        <h3 className="font-heading text-xl font-semibold text-foreground">Thank you!</h3>
        <p className="max-w-sm text-sm text-foreground/60">
          We&apos;ve received your application to become a service provider and will be in touch soon.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5 p-5">
      {/* Your Details */}
      <Section title="Your Details">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div>
            <Label htmlFor="firstName" required>First Name</Label>
            <input
              id="firstName"
              autoComplete="given-name"
              className={inputClass(!!errors.firstName)}
              data-invalid={!!errors.firstName}
              value={form.firstName}
              onChange={(e) => set('firstName', e.target.value)}
            />
            <FieldError msg={errors.firstName} />
          </div>
          <div>
            <Label htmlFor="lastName" required>Last Name</Label>
            <input
              id="lastName"
              autoComplete="family-name"
              className={inputClass(!!errors.lastName)}
              data-invalid={!!errors.lastName}
              value={form.lastName}
              onChange={(e) => set('lastName', e.target.value)}
            />
            <FieldError msg={errors.lastName} />
          </div>
          <div>
            <Label htmlFor="otherName">Other Name</Label>
            <input
              id="otherName"
              className={inputClass()}
              value={form.otherName}
              onChange={(e) => set('otherName', e.target.value)}
            />
          </div>
        </div>
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <Label htmlFor="phone" required>Phone</Label>
            <input
              id="phone"
              type="tel"
              autoComplete="tel"
              className={inputClass(!!errors.phone)}
              data-invalid={!!errors.phone}
              value={form.phone}
              onChange={(e) => set('phone', e.target.value)}
            />
            <FieldError msg={errors.phone} />
          </div>
          <div>
            <Label htmlFor="email" required>Email</Label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              className={inputClass(!!errors.email)}
              data-invalid={!!errors.email}
              value={form.email}
              onChange={(e) => set('email', e.target.value)}
            />
            <FieldError msg={errors.email} />
          </div>
        </div>
      </Section>

      {/* Organization */}
      <Section title="Organization">
        <div className="space-y-4">
          <div>
            <Label htmlFor="organizationName" required>Organization Name</Label>
            <input
              id="organizationName"
              autoComplete="organization"
              className={inputClass(!!errors.organizationName)}
              data-invalid={!!errors.organizationName}
              value={form.organizationName}
              onChange={(e) => set('organizationName', e.target.value)}
            />
            <FieldError msg={errors.organizationName} />
          </div>
          <div>
            <Label htmlFor="organizationStreetAddress" required>Organization Street Address</Label>
            <input
              id="organizationStreetAddress"
              autoComplete="street-address"
              className={inputClass(!!errors.organizationStreetAddress)}
              data-invalid={!!errors.organizationStreetAddress}
              value={form.organizationStreetAddress}
              onChange={(e) => set('organizationStreetAddress', e.target.value)}
            />
            <FieldError msg={errors.organizationStreetAddress} />
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div>
              <Label htmlFor="country" required>Country</Label>
              <SearchableSelect
                id="country"
                options={countries}
                value={form.country}
                onChange={onCountryChange}
                placeholder="Select country"
                hasError={!!errors.country}
              />
              <FieldError msg={errors.country} />
            </div>
            <div>
              <Label htmlFor="state" required>State</Label>
              <SearchableSelect
                id="state"
                options={states}
                value={form.state}
                onChange={onStateChange}
                placeholder="Select state"
                disabled={!form.country}
                hasError={!!errors.state}
              />
              <FieldError msg={errors.state} />
            </div>
            <div>
              <Label htmlFor="city" required>City</Label>
              <SearchableSelect
                id="city"
                options={cities}
                value={form.city}
                onChange={onCityChange}
                placeholder="Select city"
                disabled={!form.state}
                hasError={!!errors.city}
              />
              <FieldError msg={errors.city} />
            </div>
            <div>
              <Label htmlFor="zip" required>Zip Code</Label>
              <SearchableSelect
                id="zip"
                options={zips}
                value={form.zip}
                onChange={(v) => set('zip', v)}
                placeholder="Select zip code"
                disabled={!form.city}
                hasError={!!errors.zip}
              />
              <FieldError msg={errors.zip} />
            </div>
            <div>
              <Label htmlFor="county" required>County</Label>
              <SearchableSelect
                id="county"
                options={counties}
                value={form.county}
                onChange={(v) => set('county', v)}
                placeholder="Select county"
                disabled={!form.state}
                hasError={!!errors.county}
              />
              <FieldError msg={errors.county} />
            </div>
          </div>
          <div>
            <Label htmlFor="displayAddress" required>Display Address</Label>
            <textarea
              id="displayAddress"
              rows={3}
              className={`${inputClass(!!errors.displayAddress)} resize-y`}
              data-invalid={!!errors.displayAddress}
              value={form.displayAddress}
              onChange={(e) => set('displayAddress', e.target.value)}
            />
            <FieldError msg={errors.displayAddress} />
          </div>
          <div>
            <Label htmlFor="website">Your Website (If Exist)</Label>
            <input
              id="website"
              type="url"
              inputMode="url"
              placeholder="Web URL goes here"
              className={inputClass(!!errors.website)}
              data-invalid={!!errors.website}
              value={form.website}
              onChange={(e) => set('website', e.target.value)}
            />
            <FieldError msg={errors.website} />
          </div>
        </div>
      </Section>

      {/* Media */}
      <Section title="Media">
        <div className="space-y-4">
          <FileField id="logo" label="Organization Logo" file={form.logo} onChange={(file) => set('logo', file)} />
          <FileField
            id="banner"
            label="Organization Banner Image"
            hint="Recommended size: 1920×360 px"
            file={form.banner}
            onChange={(file) => set('banner', file)}
          />
        </div>
      </Section>

      {/* Submit */}
      <div className="rounded-xl border border-gray-200 bg-white p-5">
        {submitError && (
          <p role="alert" className="mb-4 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">
            {submitError}
          </p>
        )}
        <button
          type="submit"
          disabled={submitting}
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary py-3 font-semibold text-white transition hover:bg-primary-dark disabled:cursor-not-allowed disabled:opacity-50"
        >
          {submitting && (
            <span
              className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"
              aria-hidden="true"
            />
          )}
          {submitting ? 'Submitting…' : 'Submit'}
        </button>
      </div>
    </form>
  );
}
