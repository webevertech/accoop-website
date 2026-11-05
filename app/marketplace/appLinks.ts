/**
 * Public store listings for the Boardwalk Basket customer app (publisher: Webever Technologies Inc.).
 * Verified live on both stores (App Store v1.0.6, Google Play "Boardwalkbasket Customer").
 * If either listing is ever pulled, replace only that platform's badge with an availability
 * message — never point a badge at a placeholder or "#".
 */
export const APP_STORE_URL = 'https://apps.apple.com/us/app/boardwalk-basket-customer/id6813840985';
export const GOOGLE_PLAY_URL = 'https://play.google.com/store/apps/details?id=com.boardwalkbasket.customer';

/** Stable in-page anchor for the app-download section (also the /get-app fallback). */
export const DOWNLOAD_ANCHOR = 'download-app';

/**
 * Device-aware link encoded in public/marketplace/download-qr.svg — see app/get-app/route.ts.
 * The QR image is static: regenerate it if this URL ever changes.
 */
export const SMART_APP_LINK = 'https://accoop.com/get-app';
