'use client';

import { useEffect, useState } from 'react';
import { CheckCircle2 } from 'lucide-react';
import {
  getCountries,
  getStates,
  getCounties,
  getCitiesByState,
  getZips,
  submitRegistration,
  GENDER_OPTIONS,
  LANGUAGE_OPTIONS,
  VETERAN_OPTIONS,
  type Option,
  type RegistrationPayload,
} from '../lib/registrationApi';
import SearchableSelect from './SearchableSelect';
import RecaptchaCheckbox from './RecaptchaCheckbox';
import { RECAPTCHA_ENABLED } from '../lib/recaptcha';

const PUBLIC_ASSISTANCE_OPTIONS: Option[] = [
  { value: 'yes', label: 'Yes' },
  { value: 'no', label: 'No' },
];

type FormState = {
  email: string;
  confirmEmail: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  middleInitial: string;
  lastName: string;
  otherName: string;
  address: string;
  phone: string;
  alternatePhone: string;
  country: string;
  state: string;
  county: string;
  city: string;
  zip: string;
  dateOfBirth: string;
  gender: string;
  preferredLanguage: string;
  veteranStatus: string;
  isPublicAssessment: string;
  agreedToTerms: boolean;
};

const INITIAL: FormState = {
  email: '',
  confirmEmail: '',
  password: '',
  confirmPassword: '',
  firstName: '',
  middleInitial: '',
  lastName: '',
  otherName: '',
  address: '',
  phone: '',
  alternatePhone: '',
  country: '',
  state: '',
  county: '',
  city: '',
  zip: '',
  dateOfBirth: '',
  gender: '',
  preferredLanguage: '',
  veteranStatus: '',
  isPublicAssessment: '',
  agreedToTerms: false,
};

type Errors = Partial<Record<keyof FormState, string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^[\d\s()+-]{7,}$/;

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

export default function JoinCoopForm() {
  const [form, setForm] = useState<FormState>(INITIAL);
  const [errors, setErrors] = useState<Errors>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [recaptchaToken, setRecaptchaToken] = useState('');

  // Cascading location options
  const [countries, setCountries] = useState<Option[]>([]);
  const [states, setStates] = useState<Option[]>([]);
  const [counties, setCounties] = useState<Option[]>([]);
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

  const set = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((f) => ({ ...f, [key]: value }));
    setErrors((e) => (e[key] ? { ...e, [key]: undefined } : e));
  };

  /* ---------- location cascade ---------- */

  const onCountryChange = async (value: string) => {
    setForm((f) => ({ ...f, country: value, state: '', county: '', city: '', zip: '' }));
    setStates([]);
    setCounties([]);
    setCities([]);
    setZips([]);
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
    if (!form.email.trim()) e.email = 'Email is required.';
    else if (!EMAIL_RE.test(form.email)) e.email = 'Enter a valid email address.';
    if (!form.confirmEmail.trim()) e.confirmEmail = 'Please confirm your email.';
    else if (form.email !== form.confirmEmail) e.confirmEmail = 'Emails do not match.';

    if (!form.password) e.password = 'Password is required.';
    else if (form.password.length < 8) e.password = 'Password must be at least 8 characters.';
    if (!form.confirmPassword) e.confirmPassword = 'Please confirm your password.';
    else if (form.password !== form.confirmPassword) e.confirmPassword = 'Passwords do not match.';

    if (!form.firstName.trim()) e.firstName = 'First name is required.';
    if (!form.lastName.trim()) e.lastName = 'Last name is required.';

    if (!form.address.trim()) e.address = 'Address is required.';
    if (!form.phone.trim()) e.phone = 'Phone is required.';
    else if (!PHONE_RE.test(form.phone)) e.phone = 'Enter a valid phone number.';
    if (form.alternatePhone.trim() && !PHONE_RE.test(form.alternatePhone))
      e.alternatePhone = 'Enter a valid phone number.';

    if (!form.country) e.country = 'Country is required.';
    if (!form.state) e.state = 'State is required.';
    if (!form.county) e.county = 'County is required.';
    if (!form.city) e.city = 'City is required.';
    if (!form.zip) e.zip = 'Zip code is required.';

    if (!form.dateOfBirth) e.dateOfBirth = 'Date of birth is required.';
    if (!form.gender) e.gender = 'Gender is required.';

    if (!form.preferredLanguage) e.preferredLanguage = 'Preferred language is required.';
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

    const payload: RegistrationPayload = {
      email: form.email.trim(),
      firstName: form.firstName.trim(),
      middleInitial: form.middleInitial.trim(),
      lastName: form.lastName.trim(),
      otherName: form.otherName.trim(),
      address: form.address.trim(),
      phone: form.phone.trim(),
      alternatePhone: form.alternatePhone.trim(),
      country: form.country,
      state: form.state,
      county: form.county,
      city: form.city,
      zip: form.zip,
      dateOfBirth: form.dateOfBirth,
      gender: form.gender,
      preferredLanguage: form.preferredLanguage,
      veteranStatus: form.veteranStatus,
      isPublicAssessment: form.isPublicAssessment,
      password: form.password,
      recaptchaToken: recaptchaToken,
    };

    setSubmitting(true);
    const result = await submitRegistration(payload);
    setSubmitting(false);

    if (result.ok) {
      setSuccess(true);
      return;
    }

    // Surface server-side validation against the matching fields.
    if (result.fieldErrors) {
      setErrors((prev) => ({ ...prev, ...result.fieldErrors }));
      const firstKey = Object.keys(result.fieldErrors)[0];
      document.getElementById(firstKey)?.focus();
      setSubmitError(null);
    } else {
      setSubmitError(result.message ?? 'Something went wrong. Please try again.');
    }
  };

  if (success) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 px-6 py-16 text-center">
        <CheckCircle2 className="h-14 w-14 text-primary" aria-hidden="true" />
        <h3 className="font-heading text-xl font-semibold text-foreground">You&apos;re all set!</h3>
        <p className="max-w-sm text-sm text-foreground/60">
          Thanks for joining the Atlantic City Community Cooperative. We&apos;ve received your
          registration and will be in touch soon.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5 p-5">
      {/* Account Information */}
      <Section title="Account Information" subtitle="Use an email address that you can access easily.">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <Label htmlFor="email" required>Email Address</Label>
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
          <div>
            <Label htmlFor="confirmEmail" required>Confirm Email</Label>
            <input
              id="confirmEmail"
              type="email"
              autoComplete="email"
              className={inputClass(!!errors.confirmEmail)}
              data-invalid={!!errors.confirmEmail}
              value={form.confirmEmail}
              onChange={(e) => set('confirmEmail', e.target.value)}
            />
            <FieldError msg={errors.confirmEmail} />
          </div>
          <div>
            <Label htmlFor="password" required>Password</Label>
            <input
              id="password"
              type="password"
              autoComplete="new-password"
              placeholder="At least 8 characters"
              className={inputClass(!!errors.password)}
              data-invalid={!!errors.password}
              value={form.password}
              onChange={(e) => set('password', e.target.value)}
            />
            <FieldError msg={errors.password} />
          </div>
          <div>
            <Label htmlFor="confirmPassword" required>Confirm Password</Label>
            <input
              id="confirmPassword"
              type="password"
              autoComplete="new-password"
              className={inputClass(!!errors.confirmPassword)}
              data-invalid={!!errors.confirmPassword}
              value={form.confirmPassword}
              onChange={(e) => set('confirmPassword', e.target.value)}
            />
            <FieldError msg={errors.confirmPassword} />
          </div>
        </div>
      </Section>

      {/* Personal Details */}
      <Section title="Personal Details">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
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
            <Label htmlFor="middleInitial">Middle Initial</Label>
            <input
              id="middleInitial"
              maxLength={1}
              className={inputClass()}
              value={form.middleInitial}
              onChange={(e) => set('middleInitial', e.target.value)}
            />
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
      </Section>

      {/* Contact Information */}
      <Section title="Contact Information">
        <div className="space-y-4">
          <div>
            <Label htmlFor="address" required>Address</Label>
            <input
              id="address"
              type="text"
              autoComplete="street-address"
              className={inputClass(!!errors.address)}
              data-invalid={!!errors.address}
              value={form.address}
              onChange={(e) => set('address', e.target.value)}
            />
            <FieldError msg={errors.address} />
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
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
              <Label htmlFor="alternatePhone">Alternate Phone</Label>
              <input
                id="alternatePhone"
                type="tel"
                autoComplete="tel"
                className={inputClass(!!errors.alternatePhone)}
                data-invalid={!!errors.alternatePhone}
                value={form.alternatePhone}
                onChange={(e) => set('alternatePhone', e.target.value)}
              />
              <FieldError msg={errors.alternatePhone} />
            </div>
          </div>
        </div>
      </Section>

      {/* Location */}
      <Section title="Location" subtitle="Select your location from the dropdowns below.">
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
      </Section>

      {/* Identification */}
      <Section title="Identification">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <Label htmlFor="dateOfBirth" required>Date of Birth</Label>
            <input
              id="dateOfBirth"
              type="date"
              autoComplete="bday"
              className={inputClass(!!errors.dateOfBirth)}
              data-invalid={!!errors.dateOfBirth}
              value={form.dateOfBirth}
              onChange={(e) => set('dateOfBirth', e.target.value)}
            />
            <FieldError msg={errors.dateOfBirth} />
          </div>
          <div>
            <Label htmlFor="gender" required>Gender</Label>
            <SearchableSelect
              id="gender"
              options={GENDER_OPTIONS}
              value={form.gender}
              onChange={(v) => set('gender', v)}
              placeholder="Select Gender"
              hasError={!!errors.gender}
            />
            <FieldError msg={errors.gender} />
          </div>
        </div>
      </Section>

      {/* Demographic Information */}
      <Section title="Demographic Information">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <Label htmlFor="preferredLanguage" required>Preferred Language</Label>
            <SearchableSelect
              id="preferredLanguage"
              options={LANGUAGE_OPTIONS}
              value={form.preferredLanguage}
              onChange={(v) => set('preferredLanguage', v)}
              placeholder="Select Language"
              hasError={!!errors.preferredLanguage}
            />
            <FieldError msg={errors.preferredLanguage} />
          </div>
          <div>
            <Label htmlFor="veteranStatus">Veteran Status</Label>
            <SearchableSelect
              id="veteranStatus"
              options={VETERAN_OPTIONS}
              value={form.veteranStatus}
              onChange={(v) => set('veteranStatus', v)}
              placeholder="Select Status"
            />
          </div>
          <div>
            <Label htmlFor="isPublicAssessment">Is Public Assistant?</Label>
            <SearchableSelect
              id="isPublicAssessment"
              options={PUBLIC_ASSISTANCE_OPTIONS}
              value={form.isPublicAssessment}
              onChange={(v) => set('isPublicAssessment', v)}
              placeholder="Select an option"
            />
          </div>
        </div>
      </Section>

      {/* Terms + Submit */}
      <div className="rounded-xl border border-gray-200 bg-white p-5">
        <label className="flex cursor-pointer items-start gap-2.5 text-sm text-foreground/80">
          <input
            type="checkbox"
            className="mt-0.5 h-4 w-4 shrink-0 accent-primary"
            checked={form.agreedToTerms}
            onChange={(e) => set('agreedToTerms', e.target.checked)}
          />
          <span>
            I agree to the <span className="font-medium text-primary">terms and conditions</span>.
          </span>
        </label>

        <div className="mt-4">
          <RecaptchaCheckbox onChange={setRecaptchaToken} />
        </div>

        {submitError && (
          <p role="alert" className="mt-4 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">
            {submitError}
          </p>
        )}

        <button
          type="submit"
          disabled={!form.agreedToTerms || submitting}
          className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-primary py-3 font-semibold text-white transition hover:bg-primary-dark disabled:cursor-not-allowed disabled:opacity-50"
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
