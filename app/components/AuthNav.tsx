'use client';

import { useSyncExternalStore } from 'react';
import LoginButton from './LoginButton';
import CTAButton from './CTAButton';
import { clearStoredAuth, getDashboardUrl, getSignOutUrl, getStoredAuth, onAuthChange } from '../lib/authApi';

interface AuthNavProps {
  /** Classes for the primary action (Sign In / Dashboard). */
  primaryClassName: string;
  /** Classes for the secondary action (Join the Co-Op / Sign Out). */
  secondaryClassName: string;
  /** Called after any nav item is activated — used to close the mobile menu. */
  onNavigate?: () => void;
}

/** Server render (and first client paint) has no access to storage — treat as signed out. */
const getServerSnapshot = () => null;

/** Header auth controls: Sign In/Join when signed out, Dashboard/Sign Out once logged in. */
export default function AuthNav({ primaryClassName, secondaryClassName, onNavigate }: AuthNavProps) {
  const auth = useSyncExternalStore(onAuthChange, getStoredAuth, getServerSnapshot);

  const handleSignOut = () => {
    onNavigate?.();
    clearStoredAuth();
    window.location.href = getSignOutUrl();
  };

  if (auth) {
    return (
      <>
        <a
          href={getDashboardUrl(auth.role)}
          onClick={onNavigate}
          className={primaryClassName}
        >
          Dashboard
        </a>
        <button type="button" onClick={handleSignOut} className={secondaryClassName}>
          Sign Out
        </button>
      </>
    );
  }

  return (
    <>
      <LoginButton className={primaryClassName}>Sign In</LoginButton>
      <CTAButton className={secondaryClassName}>Join the Co-Op</CTAButton>
    </>
  );
}
