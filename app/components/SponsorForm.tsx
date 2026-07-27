'use client';

import { useEffect, useState } from 'react';
import { CheckCircle2 } from 'lucide-react';
import { submitSponsor, type SponsorPayload } from '../lib/sponsorApi';
import { getCountries, getStates, getCitiesByState, getZips, type Option } from '../lib/registrationApi';
import SearchableSelect from './SearchableSelect';
import { RECAPTCHA_ENABLED, getRecaptchaToken } from '../lib/recaptcha';

type FormState = {
  fullName: string;
  phone: string;
  email: string;
  streetAddress: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
};

const INITIAL: FormState = {
  fullName: '',
  phone: '',
  email: '',
  streetAddress: '',
  city: '',
  state: '',
  country: '',
  postalCode: '',
};

type Errors = Partial<Record<keyof FormState, string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^[\d\s()+-]{7,}$/;

export default function SponsorForm() {
  const [form, setForm] = useState<FormState>(INITIAL);
  const [errors, setErrors] = useState<Errors>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  // Cascading location options — same source/behavior as the "Become a Member" form.
  const [countries, setCountries] = useState<Option[]>([]);
  const [states, setStates] = useState<Option[]>([]);
  const [cities, setCities] = useState<Option[]>([]);
  const [zips, setZips] = useState<Option[]>([]);

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

  const set = (key: keyof FormState, val: string) => {
    setForm((prev) => ({ ...prev, [key]: val }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const onCountryChange = async (value: string) => {
    setForm((f) => ({ ...f, country: value, state: '', city: '', postalCode: '' }));
    setErrors((prev) => ({ ...prev, country: undefined }));
    setStates([]);
    setCities([]);
    setZips([]);
    if (value) setStates(await getStates(value));
  };

  const onStateChange = async (value: string) => {
    setForm((f) => ({ ...f, state: value, city: '', postalCode: '' }));
    setErrors((prev) => ({ ...prev, state: undefined }));
    setCities([]);
    setZips([]);
    if (value) setCities(await getCitiesByState(value));
  };

  const onCityChange = async (value: string) => {
    setForm((f) => ({ ...f, city: value, postalCode: '' }));
    setErrors((prev) => ({ ...prev, city: undefined }));
    setZips([]);
    if (value) setZips(await getZips(value));
  };

  const validate = (): Errors => {
    const e: Errors = {};
    if (!form.phone.trim()) e.phone = 'Phone number is required.';
    else if (!PHONE_RE.test(form.phone)) e.phone = 'Enter a valid phone number.';

    if (!form.email.trim()) e.email = 'Email address is required.';
    else if (!EMAIL_RE.test(form.email)) e.email = 'Enter a valid email address.';

    if (!form.country) e.country = 'Country is required.';
    if (!form.state) e.state = 'State is required.';
    if (!form.city) e.city = 'City is required.';
    if (!form.postalCode) e.postalCode = 'Zip code is required.';

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

    let recaptchaToken = '';
    if (RECAPTCHA_ENABLED) {
      try {
        recaptchaToken = await getRecaptchaToken('sponsor_register');
      } catch {
        setSubmitError('Unable to verify you are human. Please refresh and try again.');
        return;
      }
    }

    const payload: SponsorPayload = {
      fullName: form.fullName.trim(),
      phone: form.phone.trim(),
      email: form.email.trim(),
      streetAddress: form.streetAddress.trim(),
      city: cities.find((o) => o.value === form.city)?.label ?? '',
      state: states.find((o) => o.value === form.state)?.label ?? '',
      country: countries.find((o) => o.value === form.country)?.label ?? '',
      postalCode: form.postalCode,
      recaptchaToken,
    };

    setSubmitting(true);
    const result = await submitSponsor(payload);
    setSubmitting(false);

    if (result.ok) {
      setSuccess(true);
      return;
    }

    if (result.fieldErrors) {
      setErrors((prev) => ({ ...prev, ...result.fieldErrors }));
      const firstKey = Object.keys(result.fieldErrors)[0];
      document.getElementById(firstKey)?.focus();
    } else {
      setSubmitError(result.message ?? 'Something went wrong. Please try again.');
    }
  };

  const inputClass = (hasError: boolean) =>
    `w-full rounded-lg border bg-white px-3.5 py-2.5 text-sm text-foreground outline-none transition placeholder:text-foreground/40 focus:ring-2 focus:ring-primary/25 ${
      hasError ? 'border-red-500 focus:border-red-500 focus:ring-red-500/25' : 'border-gray-300 focus:border-primary'
    }`;

  if (success) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 px-6 py-16 text-center bg-white rounded-3xl">
        <CheckCircle2 className="h-14 w-14 text-primary" aria-hidden="true" />
        <h3 className="font-heading text-xl font-semibold text-foreground">Thank you for your support!</h3>
        <p className="max-w-sm text-sm text-foreground/60">
          We have received your sponsorship interest. A member of our team will contact you shortly.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5 p-5 bg-white rounded-3xl shadow-xl border border-gray-100">
      {/* Sponsor Details */}
      <div className="space-y-4">
        <h3 className="font-heading font-semibold text-lg text-foreground mb-4">Sponsor Information</h3>

        <div>
          <label htmlFor="fullName" className="mb-1.5 block text-sm font-medium text-foreground/80">
            Full Name / Organization Name
          </label>
          <input
            id="fullName"
            type="text"
            className={inputClass(!!errors.fullName)}
            data-invalid={!!errors.fullName}
            value={form.fullName}
            onChange={(e) => set('fullName', e.target.value)}
          />
          {errors.fullName && <p className="mt-1 text-xs text-red-600">{errors.fullName}</p>}
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-foreground/80">
              Email Address <span className="text-red-500">*</span>
            </label>
            <input
              id="email"
              type="email"
              className={inputClass(!!errors.email)}
              data-invalid={!!errors.email}
              value={form.email}
              onChange={(e) => set('email', e.target.value)}
            />
            {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email}</p>}
          </div>

          <div>
            <label htmlFor="phone" className="mb-1.5 block text-sm font-medium text-foreground/80">
              Phone Number <span className="text-red-500">*</span>
            </label>
            <input
              id="phone"
              type="tel"
              className={inputClass(!!errors.phone)}
              data-invalid={!!errors.phone}
              value={form.phone}
              onChange={(e) => set('phone', e.target.value)}
            />
            {errors.phone && <p className="mt-1 text-xs text-red-600">{errors.phone}</p>}
          </div>
        </div>

        <div>
          <label htmlFor="streetAddress" className="mb-1.5 block text-sm font-medium text-foreground/80">
            Street Address
          </label>
          <input
            id="streetAddress"
            type="text"
            className={inputClass(!!errors.streetAddress)}
            data-invalid={!!errors.streetAddress}
            value={form.streetAddress}
            onChange={(e) => set('streetAddress', e.target.value)}
          />
          {errors.streetAddress && <p className="mt-1 text-xs text-red-600">{errors.streetAddress}</p>}
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="country" className="mb-1.5 block text-sm font-medium text-foreground/80">
              Country <span className="text-red-500">*</span>
            </label>
            <SearchableSelect
              id="country"
              options={countries}
              value={form.country}
              onChange={onCountryChange}
              placeholder="Select country"
              hasError={!!errors.country}
            />
            {errors.country && <p className="mt-1 text-xs text-red-600">{errors.country}</p>}
          </div>

          <div>
            <label htmlFor="state" className="mb-1.5 block text-sm font-medium text-foreground/80">
              State <span className="text-red-500">*</span>
            </label>
            <SearchableSelect
              id="state"
              options={states}
              value={form.state}
              onChange={onStateChange}
              placeholder="Select state"
              disabled={!form.country}
              hasError={!!errors.state}
            />
            {errors.state && <p className="mt-1 text-xs text-red-600">{errors.state}</p>}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="city" className="mb-1.5 block text-sm font-medium text-foreground/80">
              City <span className="text-red-500">*</span>
            </label>
            <SearchableSelect
              id="city"
              options={cities}
              value={form.city}
              onChange={onCityChange}
              placeholder="Select city"
              disabled={!form.state}
              hasError={!!errors.city}
            />
            {errors.city && <p className="mt-1 text-xs text-red-600">{errors.city}</p>}
          </div>

          <div>
            <label htmlFor="postalCode" className="mb-1.5 block text-sm font-medium text-foreground/80">
              Postal / ZIP Code <span className="text-red-500">*</span>
            </label>
            <SearchableSelect
              id="postalCode"
              options={zips}
              value={form.postalCode}
              onChange={(v) => set('postalCode', v)}
              placeholder="Select zip code"
              disabled={!form.city}
              hasError={!!errors.postalCode}
            />
            {errors.postalCode && <p className="mt-1 text-xs text-red-600">{errors.postalCode}</p>}
          </div>
        </div>
      </div>

      {/* Submit / Captcha */}
      <div className="mt-4 pt-4 border-t border-gray-100">
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
