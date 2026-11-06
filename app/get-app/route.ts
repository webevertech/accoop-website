import type { NextRequest } from 'next/server';
import { APP_STORE_URL, DOWNLOAD_ANCHOR, GOOGLE_PLAY_URL } from '../boardwalk-basket/appLinks';

// The answer depends on the visitor's device, so never prerender or cache it.
export const dynamic = 'force-dynamic';

/**
 * Smart app link encoded in the Boardwalk Basket page QR code (https://accoop.com/get-app).
 *   iPhone / iPod  → App Store listing
 *   Android        → Google Play listing
 *   anything else  → /boardwalk-basket#download-app (both store badges). This includes desktops and
 *                    iPads on iPadOS 13+, which report a Mac user agent and can't be told apart
 *                    from a Mac on the server.
 */
export function GET(request: NextRequest) {
  const ua = request.headers.get('user-agent') ?? '';
  const target = /android/i.test(ua)
    ? GOOGLE_PLAY_URL
    : /iphone|ipad|ipod/i.test(ua)
      ? APP_STORE_URL
      : `/boardwalk-basket#${DOWNLOAD_ANCHOR}`; // relative: avoids proxy host/protocol rewriting behind Apache

  return new Response(null, {
    status: 302,
    headers: {
      Location: target,
      'Cache-Control': 'no-store',
      Vary: 'User-Agent',
    },
  });
}
