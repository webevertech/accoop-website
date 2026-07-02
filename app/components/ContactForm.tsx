'use client';

import { useState } from 'react';
import { CheckCircle2 } from 'lucide-react';
import { submitInquiry, type InquiryPayload } from '../lib/inquiryApi';
import RecaptchaCheckbox from './RecaptchaCheckbox';
import { RECAPTCHA_ENABLED } from '../lib/recaptcha';

type FormState = {
  fullName: string;
  phone: string;
  email: string;
  streetAddress: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
  membershipType: string;
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
  membershipType: '',
};

type Errors = Partial<Record<keyof FormState, string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^[\d\s()+-]{7,}$/;

const MEMBERSHIP_OPTIONS = [
  { value: 'coop', label: 'Co-Op Member' },
  { value: 'vendor', label: 'Vendor Partner' },
  { value: 'sponsor', label: 'Sponsor' },
  { value: 'other', label: 'Other' },
];

export default function ContactForm() {
  const [form, setForm] = useState<FormState>(INITIAL);
  const [errors, setErrors] = useState<Errors>({});
  const [recaptchaToken, setRecaptchaToken] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const set = (key: keyof FormState, val: string) => {
    setForm((prev) => ({ ...prev, [key]: val }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const validate = (): Errors => {
    const e: Errors = {};
    if (!form.phone.trim()) e.phone = 'Phone number is required.';
    else if (!PHONE_RE.test(form.phone)) e.phone = 'Enter a valid phone number.';

    if (!form.email.trim()) e.email = 'Email address is required.';
    else if (!EMAIL_RE.test(form.email)) e.email = 'Enter a valid email address.';

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

    if (RECAPTCHA_ENABLED && !recaptchaToken) {
      setSubmitError('Please complete the reCAPTCHA before submitting.');
      return;
    }

    const payload: InquiryPayload = {
      fullName: form.fullName.trim(),
      phone: form.phone.trim(),
      email: form.email.trim(),
      streetAddress: form.streetAddress.trim(),
      city: form.city.trim(),
      state: form.state.trim(),
      country: form.country.trim(),
      postalCode: form.postalCode.trim(),
      membershipType: form.membershipType,
      recaptchaToken,
    };

    setSubmitting(true);
    const result = await submitInquiry(payload);
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
        <h3 className="font-heading text-xl font-semibold text-foreground">Thank you for your message!</h3>
        <p className="max-w-sm text-sm text-foreground/60">
          We have received your message and will get back to you within 24 hours.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5 p-5 bg-white rounded-3xl shadow-xl border border-gray-100">
      {/* Contact Details */}
      <div className="space-y-4">
        <h3 className="font-heading font-semibold text-lg text-foreground mb-4">Contact Information</h3>

        <div>
          <label htmlFor="fullName" className="mb-1.5 block text-sm font-medium text-foreground/80">
            Full Name
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

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="city" className="mb-1.5 block text-sm font-medium text-foreground/80">
              City
            </label>
            <input
              id="city"
              type="text"
              className={inputClass(!!errors.city)}
              data-invalid={!!errors.city}
              value={form.city}
              onChange={(e) => set('city', e.target.value)}
            />
            {errors.city && <p className="mt-1 text-xs text-red-600">{errors.city}</p>}
          </div>

          <div>
            <label htmlFor="state" className="mb-1.5 block text-sm font-medium text-foreground/80">
              State
            </label>
            <input
              id="state"
              type="text"
              className={inputClass(!!errors.state)}
              data-invalid={!!errors.state}
              value={form.state}
              onChange={(e) => set('state', e.target.value)}
            />
            {errors.state && <p className="mt-1 text-xs text-red-600">{errors.state}</p>}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="country" className="mb-1.5 block text-sm font-medium text-foreground/80">
              Country
            </label>
            <input
              id="country"
              type="text"
              className={inputClass(!!errors.country)}
              data-invalid={!!errors.country}
              value={form.country}
              onChange={(e) => set('country', e.target.value)}
            />
            {errors.country && <p className="mt-1 text-xs text-red-600">{errors.country}</p>}
          </div>

          <div>
            <label htmlFor="postalCode" className="mb-1.5 block text-sm font-medium text-foreground/80">
              Postal / ZIP Code
            </label>
            <input
              id="postalCode"
              type="text"
              className={inputClass(!!errors.postalCode)}
              data-invalid={!!errors.postalCode}
              value={form.postalCode}
              onChange={(e) => set('postalCode', e.target.value)}
            />
            {errors.postalCode && <p className="mt-1 text-xs text-red-600">{errors.postalCode}</p>}
          </div>
        </div>

        <div>
          <label htmlFor="membershipType" className="mb-1.5 block text-sm font-medium text-foreground/80">
            Membership Type
          </label>
          <select
            id="membershipType"
            className={inputClass(!!errors.membershipType)}
            value={form.membershipType}
            onChange={(e) => set('membershipType', e.target.value)}
          >
            <option value="">Select an option</option>
            {MEMBERSHIP_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          {errors.membershipType && <p className="mt-1 text-xs text-red-600">{errors.membershipType}</p>}
        </div>
      </div>

      {/* Submit / Captcha */}
      <div className="mt-4 pt-4 border-t border-gray-100">
        <div className="mb-4">
          <RecaptchaCheckbox onChange={setRecaptchaToken} />
        </div>

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
