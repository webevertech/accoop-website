'use client';

import { useEffect, useRef, useState } from 'react';
import { X, Eye, EyeOff } from 'lucide-react';
import { login, type LoginRole } from '../lib/authApi';
import type { FormType } from './CTAButton';

/** Register form opened by "Register here" for each role. */
const REGISTER_FORM: Record<LoginRole, FormType> = {
  coop: 'inquiry',
  partner: 'vendor',
};

const fieldBase =
  'w-full rounded-lg border bg-white px-3.5 py-2.5 text-sm text-foreground outline-none transition placeholder:text-foreground/40 focus:ring-2 focus:ring-primary/25 border-gray-300 focus:border-primary';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function LoginModal() {
  const [open, setOpen] = useState(false);
  const [role, setRole] = useState<LoginRole>('coop');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent<{ role?: LoginRole }>).detail;
      setRole(detail?.role ?? 'coop');
      setError(null);
      triggerRef.current = document.activeElement as HTMLElement;
      setOpen(true);
    };
    window.addEventListener('openLoginModal', handler);
    return () => window.removeEventListener('openLoginModal', handler);
  }, []);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
      setTimeout(() => closeButtonRef.current?.focus(), 50);
    } else {
      document.body.style.overflow = '';
      triggerRef.current?.focus();
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setOpen(false);
      return;
    }
    if (e.key !== 'Tab') return;
    const focusable = (e.currentTarget as HTMLElement).querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (e.shiftKey ? document.activeElement === first : document.activeElement === last) {
      e.preventDefault();
      (e.shiftKey ? last : first).focus();
    }
  };

  const switchRole = (next: LoginRole) => {
    setRole(next);
    setError(null);
  };

  const openRegister = () => {
    setOpen(false);
    window.dispatchEvent(
      new CustomEvent('openFormModal', { detail: { formType: REGISTER_FORM[role] } })
    );
  };

  const handleSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    setError(null);

    if (!email.trim() || !EMAIL_RE.test(email)) {
      setError('Enter a valid email address.');
      return;
    }
    if (!password) {
      setError('Password is required.');
      return;
    }

    setSubmitting(true);
    const result = await login(role, { email: email.trim(), password, remember });
    setSubmitting(false);

    if (result.ok) {
      if (result.redirectUrl) {
        window.location.href = result.redirectUrl;
        return;
      }
      setOpen(false);
      return;
    }
    setError(result.message ?? 'Unable to sign in right now. Please try again.');
  };

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="login-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onClick={() => setOpen(false)}
      onKeyDown={handleKeyDown}
    >
      <div
        className="relative flex w-full max-w-md flex-col overflow-hidden rounded-2xl bg-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-4 px-6 pt-6">
          <div>
            <h2 id="login-modal-title" className="font-heading text-2xl font-bold text-foreground">
              Welcome Back
            </h2>
            <p className="mt-1 text-sm text-foreground/60">Sign in to access your account</p>
          </div>
          <button
            ref={closeButtonRef}
            type="button"
            onClick={() => setOpen(false)}
            className="shrink-0 rounded-full bg-gray-100 p-1.5 transition-colors hover:bg-gray-200"
            aria-label="Close login"
          >
            <X className="h-5 w-5 text-gray-700" aria-hidden="true" />
          </button>
        </div>

        {/* Role toggle */}
        <div className="px-6 pt-5">
          <div
            role="tablist"
            aria-label="Select account type"
            className="flex rounded-full bg-gray-100 p-1"
          >
            {(['coop', 'partner'] as const).map((r) => {
              const active = role === r;
              return (
                <button
                  key={r}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => switchRole(r)}
                  className={`flex-1 rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                    active ? 'bg-primary text-white shadow-sm' : 'text-foreground/70 hover:text-foreground'
                  }`}
                >
                  {r === 'coop' ? 'Login As Co-Op' : 'Login As Partner'}
                </button>
              );
            })}
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} noValidate className="space-y-4 px-6 pb-6 pt-5">
          <div>
            <label htmlFor="login-email" className="mb-1.5 block text-sm font-medium text-foreground/80">
              Email Address
            </label>
            <input
              id="login-email"
              type="email"
              autoComplete="email"
              className={fieldBase}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="login-password" className="mb-1.5 block text-sm font-medium text-foreground/80">
              Password
            </label>
            <div className="relative">
              <input
                id="login-password"
                type={showPassword ? 'text' : 'password'}
                autoComplete="current-password"
                className={`${fieldBase} pr-11`}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setShowPassword((s) => !s)}
                className="absolute inset-y-0 right-0 flex items-center px-3 text-foreground/50 hover:text-foreground"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5" aria-hidden="true" />
                ) : (
                  <Eye className="h-5 w-5" aria-hidden="true" />
                )}
              </button>
            </div>
          </div>

          <label className="flex cursor-pointer items-center gap-2 text-sm text-foreground/80">
            <input
              type="checkbox"
              className="h-4 w-4 accent-primary"
              checked={remember}
              onChange={(e) => setRemember(e.target.checked)}
            />
            Remember me
          </label>

          {error && (
            <p role="alert" className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">
              {error}
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
            {submitting ? 'Signing in…' : 'Sign In'}
          </button>

          <p className="text-center text-sm text-foreground/70">
            Don&apos;t have an account?{' '}
            <button
              type="button"
              onClick={openRegister}
              className="font-semibold text-primary hover:underline"
            >
              Register here
            </button>
          </p>
        </form>
      </div>
    </div>
  );
}
