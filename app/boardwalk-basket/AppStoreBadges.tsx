import Image from 'next/image';
import { APP_STORE_URL, GOOGLE_PLAY_URL } from './appLinks';

interface AppStoreBadgesProps {
  /** Where on the page the badges sit — exposed as data-placement for click analytics. */
  placement: string;
  className?: string;
}

const badgeLink =
  'block rounded-[10px] transition-transform duration-200 hover:-translate-y-0.5 focus-visible:outline-offset-4';

/**
 * Official Apple and Google store badges. Also marks itself with data-app-badges so the
 * mobile sticky "Get the App" bar can hide while any set of badges is on screen.
 */
export default function AppStoreBadges({ placement, className = '' }: AppStoreBadgesProps) {
  return (
    <ul data-app-badges className={`flex flex-wrap items-center gap-3 ${className}`}>
      <li>
        <a
          href={APP_STORE_URL}
          className={badgeLink}
          data-track="app-download"
          data-store="ios"
          data-placement={placement}
        >
          <Image
            src="/marketplace/app-store-badge.svg"
            alt="Download Boardwalk Basket on the App Store"
            width={144}
            height={48}
            className="h-12 w-auto"
          />
        </a>
      </li>
      <li>
        <a
          href={GOOGLE_PLAY_URL}
          className={badgeLink}
          data-track="app-download"
          data-store="android"
          data-placement={placement}
        >
          <Image
            src="/marketplace/google-play-badge.png"
            alt="Get Boardwalk Basket on Google Play"
            width={161}
            height={48}
            className="h-12 w-auto"
          />
        </a>
      </li>
    </ul>
  );
}

/**
 * Green download strip: both store badges plus the desktop QR code, on the hero's dark green.
 * Used for the in-page "Download Boardwalk Basket" calls to action. On phones the QR is hidden,
 * leaving just the badges.
 */
export function DownloadStrip({ placement, className = '' }: AppStoreBadgesProps) {
  return (
    <div
      className={`flex flex-wrap items-center justify-center gap-x-10 gap-y-5 rounded-2xl bg-primary-dark px-6 py-6 sm:px-8 ${className}`}
    >
      <AppStoreBadges placement={placement} className="justify-center" />
      <DownloadQr dark />
    </div>
  );
}

/** Desktop-only QR code; encodes /get-app, which sends phones to the right app store. */
export function DownloadQr({ dark = false }: { dark?: boolean }) {
  return (
    <div className="hidden lg:flex items-center gap-3">
      <Image
        src="/marketplace/download-qr.svg"
        alt="QR code: scan to get Boardwalk Basket from the App Store on iPhone or Google Play on Android"
        width={84}
        height={84}
        className="h-21 w-21 rounded-lg bg-white p-1.5 shadow-sm"
      />
      <p className={`max-w-36 text-sm leading-snug ${dark ? 'text-white/90' : 'text-foreground/75'}`}>
        Scan with your phone camera to get the app.
      </p>
    </div>
  );
}
