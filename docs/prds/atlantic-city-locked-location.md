# Atlantic City locked location

## Rule

The co-op serves **Atlantic City, NJ** only. On the native registration forms, the whole Location block is
pre-filled and disabled:

| Field    | Locked value       |
| -------- | ------------------ |
| Country  | United States      |
| State    | New Jersey         |
| City     | Atlantic City      |
| Zip Code | 08401              |
| County   | Atlantic County    |

The API names the county "Atlantic County"; that is the label users see. It is the "Atlantic" county.

## Where it applies

- `JoinCoopForm` — opened by the nav **Join the Co-Op** button and by every **Become a Member** CTA
  (same component, different modal heading). Both the member fields and the *Corporate / Sponsor Member* fields.
- `SponsorForm` — opened by the **Sponsor the Co-Op** CTAs. Both the *Corporate / Sponsor* fields and, after
  switching Type of Membership, the member fields (zip is `#postalCode` there).
- `VendorForm` — opened by the **Become a Vendor** CTAs (submits to the partner registration API).

All three components share the same lookup and the same locked values.

## How it works

1. On mount the form loads countries and pre-selects United States, then New Jersey (as before).
2. It then calls `getLockedLocation(stateId)` ([registrationApi.ts](../../app/lib/registrationApi.ts)), which
   fetches the state's cities and counties and resolves the locked values **by name**, because location IDs
   differ per environment:
   - city: label equals `Atlantic City` (case-insensitive, exact — "Atlantic Highlands" does not match)
   - county: label matches `^atlantic( county)?$` (case-insensitive)
   - zip: fetched for that city, then filtered to exactly `08401` (`08404` / `08405` are never offered)
3. The form sets city / county / zip in both the member state and the corporate/sponsor state, and loads
   one-item option lists so the locked values render with their labels.
4. All five selects are rendered `disabled`, so no dropdown can be opened and nothing else can be chosen.

On submit the existing mapping is unchanged: `country_id`, `state_id`, `county_id`, `city_id`, `zip_code`
(for the dev API: 106 / 30 / 7 / 597 / `08401`).

## Backend alignment

`CustomerRegistrationController` and `PartnerRegistrationController` (socialimpact) already reject any zip outside
`['08401', '08404', '08405']` ("Service is only available in the Atlantic city."). The UI is deliberately
narrower — only `08401` — as requested; the backend list was not changed.

## Failure behaviour

If the API does not return Atlantic City / Atlantic County / 08401, the affected fields stay empty and disabled
(same as Country / State when their lookup fails), and Submit reports "City is required." / "Zip code is
required." / "County is required." Nothing is silently substituted.

## Tests

[e2e/locked-location.spec.mjs](../../e2e/locked-location.spec.mjs) (config: [playwright.config.mjs](../../playwright.config.mjs)).
The location and registration APIs are mocked with realistic fixtures, so no backend is needed. Covers: both
member entry points, a forced click on a locked field, the submitted IDs (member, corporate and vendor), the Sponsor
form in both modes, and the no-Atlantic-City failure behaviour.

The spec is plain `.mjs` because `tsconfig.json` includes `**/*.ts` and `@playwright/test` is **not yet a repo
dependency** — a `.ts` spec would break `next build` in CI. To run it:

```bash
npm i -D @playwright/test        # also updates package-lock.json (CI uses npm ci)
npx playwright install chromium
npx playwright test              # starts `npm run dev` itself if nothing is on :3000
```

Add `/test-results/` and `/playwright-report/` to `.gitignore` (already done) — they are Playwright output.

## Verification record (2026-11-17)

- Real browser against the real local API (socialimpact on :9000), 47/47 checks over 3 consecutive runs:
  both entry points, Corporate mode, Sponsor form in both modes, locked-field clicks, and the POST bodies.
- The spec above: 7/7 (incl. "Become a Vendor"); and it fails (`Expected: disabled, Received: enabled`) against the
  pre-change form. `VendorForm` was verified with the mocked spec only, not against the real API — the real API
  allows only the `http://localhost:3000` origin, so a dev server on another port (`E2E_PORT`) can't reach it.
- Done with the Playwright library driving Chromium, not the Playwright MCP, which failed to connect that day.
