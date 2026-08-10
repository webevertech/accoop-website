'use client';

import { useEffect, useRef, useState } from 'react';
import { CheckCircle2, UploadCloud } from 'lucide-react';
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
  MEMBERSHIP_TYPE_OPTIONS,
  membershipTypeLabel,
  type Option,
  type RegistrationPayload,
  type MembershipType,
} from '../lib/registrationApi';
import { submitVendor, type VendorPayload } from '../lib/vendorApi';
import SearchableSelect from './SearchableSelect';
import DatePicker from './DatePicker';
import { RECAPTCHA_ENABLED, getRecaptchaToken } from '../lib/recaptcha';

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

/** Fields shown instead of the standard fields when "Corporate / Sponsor Member" is selected — mirrors VendorForm. */
type VendorFormState = {
  firstName: string;
  lastName: string;
  otherName: string;
  phone: string;
  email: string;
  organizationName: string;
  organizationStreetAddress: string;
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

const INITIAL_VENDOR: VendorFormState = {
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

type VendorErrors = Partial<Record<keyof VendorFormState, string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^[\d\s()+-]{7,}$/;
const URL_RE = /^https?:\/\/.+\..+/i;
const ACCEPT = '.pdf,.doc,.docx,.xls,.csv,.jpg,.jpeg,.png,.gif';

function toDateInputValue(d: Date) {
  return d.toISOString().slice(0, 10);
}

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

export default function JoinCoopForm({ initialMembershipType }: { initialMembershipType?: MembershipType }) {
  const [form, setForm] = useState<FormState>(INITIAL);
  const [membershipType, setMembershipType] = useState<MembershipType>(initialMembershipType ?? 'patron');
  const [errors, setErrors] = useState<Errors>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  // "Corporate / Sponsor Member" submits as a partner/vendor application (VendorForm's field set) instead.
  const isVendorMode = membershipType === 'sponsor';
  const [vendorForm, setVendorForm] = useState<VendorFormState>(INITIAL_VENDOR);
  const [vendorErrors, setVendorErrors] = useState<VendorErrors>({});

  // Blocks future dates and bounds Date of Birth to a realistic 120-year range.
  const dobMax = toDateInputValue(new Date());
  const dobMin = toDateInputValue(new Date(new Date().getFullYear() - 120, 0, 1));

  // Cascading location options
  const [countries, setCountries] = useState<Option[]>([]);
  const [states, setStates] = useState<Option[]>([]);
  const [counties, setCounties] = useState<Option[]>([]);
  const [cities, setCities] = useState<Option[]>([]);
  const [zips, setZips] = useState<Option[]>([]);

  // Load countries and preselect United States + New Jersey (both locked; then load NJ's cities/counties).
  useEffect(() => {
    let active = true;
    getCountries().then((opts) => {
      if (!active) return;
      setCountries(opts);
      const us = opts.find((o) => /united states/i.test(o.label));
      if (us) {
        setForm((f) => ({ ...f, country: us.value }));
        setVendorForm((f) => ({ ...f, country: us.value }));
        getStates(us.value).then(async (s) => {
          if (!active) return;
          setStates(s);
          const nj = s.find((o) => /new jersey/i.test(o.label));
          if (nj) {
            setForm((f) => ({ ...f, state: nj.value }));
            setVendorForm((f) => ({ ...f, state: nj.value }));
            const [c, co] = await Promise.all([getCitiesByState(nj.value), getCounties(nj.value)]);
            if (!active) return;
            setCities(c);
            setCounties(co);
          }
        });
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

  /* ---------- vendor-mode fields & location cascade (Corporate / Sponsor Member) ---------- */

  const setVendor = <K extends keyof VendorFormState>(key: K, value: VendorFormState[K]) => {
    setVendorForm((f) => ({ ...f, [key]: value }));
    setVendorErrors((e) => (e[key] ? { ...e, [key]: undefined } : e));
  };

  const onVendorCountryChange = async (value: string) => {
    setVendorForm((f) => ({ ...f, country: value, state: '', city: '', zip: '', county: '' }));
    setVendorErrors((prev) => ({ ...prev, country: undefined }));
    setStates([]);
    setCounties([]);
    setCities([]);
    setZips([]);
    if (value) setStates(await getStates(value));
  };

  const onVendorStateChange = async (value: string) => {
    setVendorForm((f) => ({ ...f, state: value, city: '', zip: '', county: '' }));
    setVendorErrors((prev) => ({ ...prev, state: undefined }));
    setCities([]);
    setZips([]);
    setCounties([]);
    if (value) {
      const [c, co] = await Promise.all([getCitiesByState(value), getCounties(value)]);
      setCities(c);
      setCounties(co);
    }
  };

  const onVendorCityChange = async (value: string) => {
    setVendorForm((f) => ({ ...f, city: value, zip: '' }));
    setVendorErrors((prev) => ({ ...prev, city: undefined }));
    setZips([]);
    if (value) setZips(await getZips(value));
  };

  const validateVendor = (): VendorErrors => {
    const e: VendorErrors = {};
    if (!vendorForm.firstName.trim()) e.firstName = 'First name is required.';
    if (!vendorForm.lastName.trim()) e.lastName = 'Last name is required.';

    if (!vendorForm.phone.trim()) e.phone = 'Phone is required.';
    else if (!PHONE_RE.test(vendorForm.phone)) e.phone = 'Enter a valid phone number.';

    if (!vendorForm.email.trim()) e.email = 'Email is required.';
    else if (!EMAIL_RE.test(vendorForm.email)) e.email = 'Enter a valid email address.';

    if (!vendorForm.organizationName.trim()) e.organizationName = 'Organization name is required.';
    if (!vendorForm.organizationStreetAddress.trim())
      e.organizationStreetAddress = 'Organization street address is required.';
    if (!vendorForm.country) e.country = 'Country is required.';
    if (!vendorForm.state) e.state = 'State is required.';
    if (!vendorForm.city) e.city = 'City is required.';
    if (!vendorForm.zip) e.zip = 'Zip code is required.';
    if (!vendorForm.county) e.county = 'County is required.';
    if (!vendorForm.displayAddress.trim()) e.displayAddress = 'Display address is required.';

    if (vendorForm.website.trim() && !URL_RE.test(vendorForm.website))
      e.website = 'Enter a valid URL (including http:// or https://).';
    return e;
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
    else if (form.dateOfBirth > dobMax) e.dateOfBirth = 'Date of birth cannot be in the future.';
    else if (form.dateOfBirth < dobMin) e.dateOfBirth = 'Enter a valid date of birth.';
    if (!form.gender) e.gender = 'Gender is required.';

    if (!form.preferredLanguage) e.preferredLanguage = 'Preferred language is required.';
    return e;
  };

  const handleVendorSubmit = async () => {
    const e = validateVendor();
    setVendorErrors(e);
    if (Object.keys(e).length > 0) {
      const first = document.querySelector<HTMLElement>('[data-invalid="true"]');
      first?.focus();
      return;
    }

    let recaptchaToken = '';
    if (RECAPTCHA_ENABLED) {
      try {
        recaptchaToken = await getRecaptchaToken('vendor_register');
      } catch {
        setSubmitError('Unable to verify you are human. Please refresh and try again.');
        return;
      }
    }

    const payload: VendorPayload = {
      firstName: vendorForm.firstName.trim(),
      lastName: vendorForm.lastName.trim(),
      otherName: vendorForm.otherName.trim(),
      phone: vendorForm.phone.trim(),
      email: vendorForm.email.trim(),
      organizationName: vendorForm.organizationName.trim(),
      organizationStreetAddress: vendorForm.organizationStreetAddress.trim(),
      country: vendorForm.country,
      state: vendorForm.state,
      city: vendorForm.city,
      zip: vendorForm.zip,
      county: vendorForm.county,
      displayAddress: vendorForm.displayAddress.trim(),
      website: vendorForm.website.trim(),
      logo: vendorForm.logo,
      banner: vendorForm.banner,
      membershipType: membershipTypeLabel('sponsor'),
      recaptchaToken,
    };

    setSubmitting(true);
    const result = await submitVendor(payload);
    setSubmitting(false);

    if (result.ok) {
      setSuccess(true);
      return;
    }

    if (result.fieldErrors) {
      setVendorErrors((prev) => ({ ...prev, ...result.fieldErrors }));
      const firstKey = Object.keys(result.fieldErrors)[0];
      document.getElementById(firstKey)?.focus();
    }
    setSubmitError(result.message ?? 'Something went wrong. Please try again.');
  };

  const handleRegistrationSubmit = async () => {
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
        recaptchaToken = await getRecaptchaToken('coop_register');
      } catch {
        setSubmitError('Unable to verify you are human. Please refresh and try again.');
        return;
      }
    }

    setSubmitting(true);
    const result = await submitRegistration({
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
      membershipType: membershipTypeLabel(membershipType),
      recaptchaToken,
    } satisfies RegistrationPayload);
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

  const handleSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    setSubmitError(null);
    if (isVendorMode) {
      await handleVendorSubmit();
    } else {
      await handleRegistrationSubmit();
    }
  };

  const switchToSignIn = () => {
    window.dispatchEvent(new CustomEvent('closeFormModal'));
    window.dispatchEvent(new CustomEvent('openLoginModal', { detail: { role: isVendorMode ? 'partner' : 'coop' } }));
  };

  if (success) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 px-6 py-16 text-center">
        <CheckCircle2 className="h-14 w-14 text-primary" aria-hidden="true" />
        <h3 className="font-heading text-xl font-semibold text-foreground">
          {isVendorMode ? 'Thank you!' : "You're all set!"}
        </h3>
        <p className="max-w-sm text-sm text-foreground/60">
          {isVendorMode
            ? "We've sent you an email to set your password. Please check your inbox and set your password."
            : "Thanks for joining the Atlantic City Community Cooperative. We've received your registration and will be in touch soon."}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5 p-5">
      <p className="text-center text-sm text-foreground/70">
        Already registered?{' '}
        <button type="button" onClick={switchToSignIn} className="font-semibold text-primary hover:underline">
          Sign in here
        </button>
      </p>

      {/* Membership Type */}
      <Section title="Membership Type">
        <div>
          <Label htmlFor="membershipType" required>Type of Membership</Label>
          <SearchableSelect
            id="membershipType"
            options={MEMBERSHIP_TYPE_OPTIONS}
            value={membershipType}
            onChange={(v) => setMembershipType(v as MembershipType)}
            placeholder="Select membership type"
          />
        </div>
      </Section>

      {isVendorMode ? (
        <>
          {/* Your Details */}
          <Section title="Your Details">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div>
                <Label htmlFor="firstName" required>First Name</Label>
                <input
                  id="firstName"
                  autoComplete="given-name"
                  className={inputClass(!!vendorErrors.firstName)}
                  data-invalid={!!vendorErrors.firstName}
                  value={vendorForm.firstName}
                  onChange={(e) => setVendor('firstName', e.target.value)}
                />
                <FieldError msg={vendorErrors.firstName} />
              </div>
              <div>
                <Label htmlFor="lastName" required>Last Name</Label>
                <input
                  id="lastName"
                  autoComplete="family-name"
                  className={inputClass(!!vendorErrors.lastName)}
                  data-invalid={!!vendorErrors.lastName}
                  value={vendorForm.lastName}
                  onChange={(e) => setVendor('lastName', e.target.value)}
                />
                <FieldError msg={vendorErrors.lastName} />
              </div>
              <div>
                <Label htmlFor="otherName">Other Name</Label>
                <input
                  id="otherName"
                  className={inputClass()}
                  value={vendorForm.otherName}
                  onChange={(e) => setVendor('otherName', e.target.value)}
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
                  className={inputClass(!!vendorErrors.phone)}
                  data-invalid={!!vendorErrors.phone}
                  value={vendorForm.phone}
                  onChange={(e) => setVendor('phone', e.target.value)}
                />
                <FieldError msg={vendorErrors.phone} />
              </div>
              <div>
                <Label htmlFor="email" required>Email</Label>
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  className={inputClass(!!vendorErrors.email)}
                  data-invalid={!!vendorErrors.email}
                  value={vendorForm.email}
                  onChange={(e) => setVendor('email', e.target.value)}
                />
                <FieldError msg={vendorErrors.email} />
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
                  className={inputClass(!!vendorErrors.organizationName)}
                  data-invalid={!!vendorErrors.organizationName}
                  value={vendorForm.organizationName}
                  onChange={(e) => setVendor('organizationName', e.target.value)}
                />
                <FieldError msg={vendorErrors.organizationName} />
              </div>
              <div>
                <Label htmlFor="organizationStreetAddress" required>Organization Street Address</Label>
                <input
                  id="organizationStreetAddress"
                  autoComplete="street-address"
                  className={inputClass(!!vendorErrors.organizationStreetAddress)}
                  data-invalid={!!vendorErrors.organizationStreetAddress}
                  value={vendorForm.organizationStreetAddress}
                  onChange={(e) => setVendor('organizationStreetAddress', e.target.value)}
                />
                <FieldError msg={vendorErrors.organizationStreetAddress} />
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <div>
                  <Label htmlFor="country" required>Country</Label>
                  <SearchableSelect
                    id="country"
                    options={countries}
                    value={vendorForm.country}
                    onChange={onVendorCountryChange}
                    placeholder="Select country"
                    disabled
                    hasError={!!vendorErrors.country}
                  />
                  <FieldError msg={vendorErrors.country} />
                </div>
                <div>
                  <Label htmlFor="state" required>State</Label>
                  <SearchableSelect
                    id="state"
                    options={states}
                    value={vendorForm.state}
                    onChange={onVendorStateChange}
                    placeholder="Select state"
                    disabled
                    hasError={!!vendorErrors.state}
                  />
                  <FieldError msg={vendorErrors.state} />
                </div>
                <div>
                  <Label htmlFor="city" required>City</Label>
                  <SearchableSelect
                    id="city"
                    options={cities}
                    value={vendorForm.city}
                    onChange={onVendorCityChange}
                    placeholder="Select city"
                    disabled={!vendorForm.state}
                    hasError={!!vendorErrors.city}
                  />
                  <FieldError msg={vendorErrors.city} />
                </div>
                <div>
                  <Label htmlFor="zip" required>Zip Code</Label>
                  <SearchableSelect
                    id="zip"
                    options={zips}
                    value={vendorForm.zip}
                    onChange={(v) => setVendor('zip', v)}
                    placeholder="Select zip code"
                    disabled={!vendorForm.city}
                    hasError={!!vendorErrors.zip}
                  />
                  <FieldError msg={vendorErrors.zip} />
                </div>
                <div>
                  <Label htmlFor="county" required>County</Label>
                  <SearchableSelect
                    id="county"
                    options={counties}
                    value={vendorForm.county}
                    onChange={(v) => setVendor('county', v)}
                    placeholder="Select county"
                    disabled={!vendorForm.state}
                    hasError={!!vendorErrors.county}
                  />
                  <FieldError msg={vendorErrors.county} />
                </div>
              </div>
              <div>
                <Label htmlFor="displayAddress" required>Display Address</Label>
                <textarea
                  id="displayAddress"
                  rows={3}
                  className={`${inputClass(!!vendorErrors.displayAddress)} resize-y`}
                  data-invalid={!!vendorErrors.displayAddress}
                  value={vendorForm.displayAddress}
                  onChange={(e) => setVendor('displayAddress', e.target.value)}
                />
                <FieldError msg={vendorErrors.displayAddress} />
              </div>
              <div>
                <Label htmlFor="website">Your Website (If Exist)</Label>
                <input
                  id="website"
                  type="url"
                  inputMode="url"
                  placeholder="Web URL goes here"
                  className={inputClass(!!vendorErrors.website)}
                  data-invalid={!!vendorErrors.website}
                  value={vendorForm.website}
                  onChange={(e) => setVendor('website', e.target.value)}
                />
                <FieldError msg={vendorErrors.website} />
              </div>
            </div>
          </Section>

          {/* Media */}
          <Section title="Media">
            <div className="space-y-4">
              <FileField
                id="logo"
                label="Organization Logo"
                file={vendorForm.logo}
                onChange={(file) => setVendor('logo', file)}
              />
              <FileField
                id="banner"
                label="Organization Banner Image"
                hint="Recommended size: 1920×360 px"
                file={vendorForm.banner}
                onChange={(file) => setVendor('banner', file)}
              />
            </div>
          </Section>
        </>
      ) : (
        <>
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
              disabled
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
              disabled
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
            <DatePicker
              id="dateOfBirth"
              value={form.dateOfBirth}
              onChange={(v) => set('dateOfBirth', v)}
              min={dobMin}
              max={dobMax}
              placeholder="Select date of birth"
              hasError={!!errors.dateOfBirth}
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
            <Label htmlFor="isPublicAssessment">Do you receive any public assistant?</Label>
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
        </>
      )}

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
