# PRD: Membership Page Content Update

**Page:** `/membership` — [app/membership/page.tsx](../../app/membership/page.tsx)
**Source:** ACCOOP Membership Page — Content Change Request (client doc)
**Status:** Draft — blocked on client confirmations (see §6)
**Owner:** Dev implementation

## 1. Summary

Update copy, labels, and visual hierarchy on the Membership page per the client's content change request: rename "Premium Access Member" → "VIP Member," rename "Corporate / Sponsor Member" language in select places, restructure the four pathway cards so the membership name is the primary heading (not the eyebrow), update the sponsorship/membership tier table, and swap one CTA's destination from an in-page form modal to an external POS checkout link.

## 2. Goals

- Match all copy changes specified in the client's redline exactly.
- Preserve existing form-modal behavior (`CTAButton` → `openFormModal` event) everywhere except the one CTA explicitly called out for POS linking.
- Keep internal `MembershipType` values (`patron`/`premium`/`owner`/`sponsor`) unchanged unless the client confirms the "VIP" rename should propagate to the CRM/registration API layer — these are wire values, not display strings.
- Flag every place the client's request is ambiguous or contradicts itself, so nothing gets silently guessed into production.

## 3. Out of Scope

- Any change to `/sponsorship` page ([app/sponsorship/page.tsx](../../app/sponsorship/page.tsx)) — not referenced in the client doc.
- Backend/CRM field renames (Salesforce or equivalent), unless confirmed necessary by §6.4.
- New POS integration/checkout flow build-out — this PRD only wires the button to a URL once provided.

## 4. Detailed Requirements

### 4.1 Intro section — "Choose the Membership Path That Fits You"

**File:** [app/membership/page.tsx:163](../../app/membership/page.tsx#L163)

Change "Corporate / Sponsor Member" → "Corporate / Support Member" in the intro paragraph only.

> **Consistency note:** the client's Card 4 change (§4.2) renames the same membership to "Corporate and Non-Profit Organization Member" — a third, different label. See §6.5 for the naming conflict this creates across the page.

### 4.2 Pathway cards (`pathways` array + card markup)

**File:** [app/membership/page.tsx:13–18](../../app/membership/page.tsx#L13-L18) (data), [:166–184](../../app/membership/page.tsx#L166-L184) (markup)

The card template already renders `title` as the large heading (`h3`) and `sub` as the smaller primary-colored label beneath it — so for Cards 1, 2, and 4 this is a data swap, not a template change.

| Card | Field | Current | New |
|---|---|---|---|
| 1 — Patron | `title` | `Join Free` | `Patron Member` |
| 1 — Patron | `sub` | `Patron Member` | `Join Free` |
| 1 — Patron | `cta` | `Join Free` | *(unchanged)* |
| 2 — Premium | `title` | `Get Support` | `VIP Member` |
| 2 — Premium | `sub` | `Premium Access Member` | `Get Support` |
| 2 — Premium | `cta` | `Apply for Support` | *(unchanged — pending §6.2)* |
| 3 — Owner | `title` | `Own the Movement` | `Community Owner Member` |
| 3 — Owner | `sub` | `Community Owner Member / Class A Community Stock` | *(removed — see below)* |
| 4 — Corporate | `title` | `Invest in Atlantic City` | `Corporate and Non-Profit Organization Member` |
| 4 — Corporate | `sub` | `Corporate / Sponsor Member` | `Support Atlantic City` |
| 4 — Corporate | `desc` | `...that want to sponsor community ownership...` | `...that want to Support community ownership...` (word swap only) |
| 4 — Corporate | `cta` | `Become a Sponsor` | *(unchanged — pending §6.3)* |

**Card 3 needs a template change**, not just a data swap: "Class A Community Stock" moves out of the `sub` line and becomes a small side badge/tag next to the "Community Owner Member" heading. This requires a new markup branch (e.g. a `badge` field on the card object, rendered as a pill next to the `h3`) — **pending visual confirmation, see §6.1**.

### 4.3 Section 3 — "Join Free as a Patron Member"

**File:** [app/membership/page.tsx:190–195](../../app/membership/page.tsx#L190-L195)

Apply the same heading/sub-label swap used on Card 1 to the eyebrow badge (`Users` icon + `<span>`): show "Patron Member" as the primary label with "Join Free" grouped beside/under it. The `<h2>` text ("Join Free as a Patron Member") is not called out for change in the client doc — leave as-is.

**New benefit line:** add "Patron Members can shop from Boardwalk Basket, Atlantic City's Digital Market Platform." to `patronBenefits` ([:20–30](../../app/membership/page.tsx#L20-L30)), positioned near the existing "Boardwalk Basket updates" entry ([:24](../../app/membership/page.tsx#L24)) — **placement (bullet vs. paragraph) pending §6.6**.

### 4.4 Section 4 — "Get Support as a Premium Access Member" → VIP

**File:** [app/membership/page.tsx:230–273](../../app/membership/page.tsx#L230-L273)

Rename "Premium Access Member(ship)" → "VIP Member(ship)" throughout this section:

- Eyebrow `<span>` ([:234](../../app/membership/page.tsx#L234)): `Get Support` → `VIP Membership` *(per the client doc's literal before/after — note this is a different treatment than Card 2, which keeps "Get Support" as the sub-label; flagged in §6.5)*
- `<h2>` ([:236](../../app/membership/page.tsx#L236)): `Get Support as a Premium Access Member` → `Get Support as a VIP Member`
- `premiumBenefits[0]` ([:33](../../app/membership/page.tsx#L33)): `Free Premium Access Membership` → `Free VIP Membership`
- Bottom CTA button text ([:268](../../app/membership/page.tsx#L268)): `Apply for Premium Access Membership` → `Apply for VIP Membership`

Do **not** rename the `type: 'premium'` value in the `pathways` array or the `membershipType="premium"` prop passed to `CTAButton` — these map to `MembershipType` in [app/lib/registrationApi.ts:256](../../app/lib/registrationApi.ts#L256), a wire value consumed by the registration API, not display copy. Renaming it is a separate, larger change (see §6.4).

### 4.5 Section 5 — "Own the Movement as a Community Owner Member"

**File:** [app/membership/page.tsx:276–282](../../app/membership/page.tsx#L276-L282)

Eyebrow `<span>` ([:280](../../app/membership/page.tsx#L280)): `Own the Movement` → `Community Owner Member`. `<h2>` text unchanged per client doc.

### 4.6 Section 6 — "Invest in Atlantic City as a Corporate / Sponsor Member"

**File:** [app/membership/page.tsx:330–384](../../app/membership/page.tsx#L330-L384)

- Eyebrow `<span>` ([:334](../../app/membership/page.tsx#L334)): `Invest in Atlantic City` → `Support Atlantic City`
- Sub-heading paragraph ([:337](../../app/membership/page.tsx#L337)): `A non-voting sponsorship membership for businesses, institutions, nonprofits, and civic partners.` → `A non-voting membership for businesses, institutions, nonprofits, and civic partners.` (drop "sponsorship")
- **"Become a Member" CTA → POS link:** the button at [:375–377](../../app/membership/page.tsx#L375-L377) is currently a `CTAButton` (`formType="sponsor"`) that dispatches an `openFormModal` event — it does not navigate anywhere. Per the client doc, this needs to become (or link out to) a POS checkout URL. **Blocked on §6.1 (POS URL)** — implementation will most likely swap this specific instance for a plain `<a href={POS_URL}>` styled to match, since `CTAButton` has no navigation mode today.

### 4.7 Section 7 — Sponsorship / Membership Levels table

**File:** [app/membership/page.tsx:59–66](../../app/membership/page.tsx#L59-L66) (data), [:363](../../app/membership/page.tsx#L363) (heading)

Heading: `Recommended Sponsorship Levels` → `Recommended Membership Levels`.

`sponsorLevels` array changes (per the client doc's "Full Updated Tier List," which is the unambiguous version of the tier table):

| Amount | Current name | New name | Description |
|---|---|---|---|
| $500 | Community Supporter | *(unchanged)* | *(unchanged)* |
| $1,000 | Neighborhood Builder | **Non Profit or 501(c)(3)** | append: "...neighborhood engagement. **Receive Atlantic City SMILE Participation**" |
| $2,500 | Food Access Partner | **Service Provider Partner** | replace with: "Provides support to COOP's VIP Members receiving public assistance." |
| $5,000 | Community Ownership Sponsor | **Food Access Partner** | *(unchanged text)* |
| $10,000 | Atlantic City Impact Partner | *(unchanged)* | *(unchanged)* |
| $25,000+ | Founding Corporate Partner | *(unchanged)* | *(unchanged)* |

⚠ This moves the name "Food Access Partner" from the $2,500 tier to the $5,000 tier — the client doc flags this itself as needing double-checking. **Pending §6.7.**

## 5. Impact Beyond the Page Copy (found during implementation review, not in client doc)

The client doc only covers `/membership` page text, but "VIP Member" and "Corporate / Sponsor Member" also appear in code the doc doesn't mention:

- **`MEMBERSHIP_TYPE_OPTIONS`** in [app/lib/registrationApi.ts:258–263](../../app/lib/registrationApi.ts#L258-L263) — dropdown labels (`Premium Access Member`, `Corporate / Sponsor Member`) shown inside the Join/Sponsor form modals, consumed by [app/components/JoinCoopForm.tsx](../../app/components/JoinCoopForm.tsx) and [app/components/SponsorForm.tsx](../../app/components/SponsorForm.tsx).
- **Page `metadata`** ([app/membership/page.tsx:6–10](../../app/membership/page.tsx#L6-L10)) — title/description mention "Premium Access support" and "Corporate / Sponsor Member."
- **FAQ answers** ([:108–119](../../app/membership/page.tsx#L108-L119)) — multiple Q&As reference "Premium Access Membership" and "Corporate / Sponsor Membership" by name (stock/voting rights disclaimers).
- **Footer disclaimer** ([:519–521](../../app/membership/page.tsx#L519-L521)) — names "Patron Membership, Premium Access Membership, and Corporate / Sponsor Membership."
- **Final CTA section** ([:490–513](../../app/membership/page.tsx#L490-L513)) — button labeled "Apply for Support" (not "Apply for VIP Membership") and "Become a Sponsor."

None of these are in the client's redline. Recommend confirming with the client whether the rename is cosmetic (just the 4 sections/cards they marked up) or should be applied consistently sitewide — leaving it half-done (e.g., cards say "VIP Member" but the FAQ still says "Premium Access Membership") will read as a bug. **See §6.8.**

## 6. Open Items Requiring Confirmation Before Development Starts

1. **POS checkout URL** for the Section 6 "Become a Member" button (§4.6). Hard blocker — cannot wire the link without it.
2. **Card 3 badge layout** — confirm "Class A Community Stock" as a small side badge/tag next to the heading is the intended visual (§4.2).
3. **Card 2 / Section 4 CTA button** — should "Apply for Support" become "Apply for VIP Membership" for consistency? (§4.2, §4.4)
4. **Card 4 / final-CTA button** — should "Become a Sponsor" change to match the "Corporate and Non-Profit Organization Member" rename, or stay as-is? (§4.2)
5. **Should the "VIP" rename reach `MEMBERSHIP_TYPE_OPTIONS`** (registrationApi.ts) and thus the Join/Sponsor form dropdowns, or stay page-copy-only? (§5)
6. **Naming conflict:** the doc uses three different names for the same corporate membership across the page — "Corporate / Sponsor Member" (current), "Corporate / Support Member" (intro section redline, §4.1), and "Corporate and Non-Profit Organization Member" (Card 4 redline, §4.2). Which is canonical, and where does each apply? (§4.1, §5)
7. **Boardwalk Basket sentence placement** in the Patron Member benefits — bullet in the existing list, or a standalone paragraph? (§4.3)
8. **Tier reshuffle** — confirm "Food Access Partner" intentionally moves from the $2,500 tier to the $5,000 tier (§4.7).
9. **Scope of the rename** — should FAQ answers, page `metadata`, footer disclaimer, and the final-CTA section also be updated to match the VIP/Corporate renames, even though the client doc doesn't call them out? (§5)

## 7. Acceptance Criteria

- [ ] All copy changes in §4.1–§4.7 implemented exactly as specified once open items are resolved.
- [ ] Card 1/2/4 heading-vs-sub-label hierarchy visually swapped (name primary, category secondary).
- [ ] Card 3 renders "Class A Community Stock" as a distinct badge, not inline sub-text.
- [ ] Section 6 CTA navigates to the confirmed POS URL; existing modal-based CTAs elsewhere are untouched.
- [ ] Membership levels table shows the 6 tiers with updated names/descriptions and correct order.
- [ ] No other page (`/sponsorship`, etc.) is modified.
- [ ] Decision recorded (even if "no change") for each item in §6 before merge.
- [ ] Page manually reviewed at `/membership` in a browser (desktop + mobile width) after implementation — this is a content/layout change, not just a text diff.

## 8. Rollout Notes

Single-page content change, no migrations or schema impact. Safe to ship as one PR once §6 is resolved. If the POS link (§6.1) lags behind everything else, consider splitting Section 6 into a follow-up PR so the rest of the copy updates aren't blocked on it.
