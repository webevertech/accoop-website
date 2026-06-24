# Login Modal — Design

Date: 2026-06-23
Repo: Atlantic City Community Cooperative marketing site (Next.js App Router)

## Goal

Add a themed **Login** affordance to the marketing site. There is no login page in
this repo; auth is handled by a separate external app (OneConnect360). This work sets
up the login modal UI in the current theme and a single integration point for the real
login API, which will be supplied later.

## Requirements

- Header "Login" button (desktop + mobile) opens a login modal.
- Modal offers two roles via a **Co-Op | Partner segmented toggle** ("Login As Co-Op" /
  "Login As Partner"). Co-Op is the default.
- Login form fields match the reference screenshot, in this site's theme:
  Email Address, Password (with show/hide eye toggle), **Remember me** checkbox, **Sign In** button.
- **No "Forgot password"** link.
- Footer: "Don't have an account? **Register here**" opens the existing on-site form:
  - Co-Op role → Join-the-Co-Op inquiry form (`openFormModal` → `inquiry`)
  - Partner role → Vendor/Partner form (`openFormModal` → `vendor`)
  - Opening the register form closes the login modal.
  

## Architecture

Follows the existing event-driven modal pattern.

- **`app/components/LoginModal.tsx`** (new, `'use client'`)
  - Mirrors `FormModal.tsx` shell: fixed backdrop, focus trap, Esc-to-close, body scroll
    lock, close button, `role="dialog"`/`aria-modal`.
  - Listens for `openLoginModal` CustomEvent (optional `detail.role: 'coop' | 'partner'`).
  - Local state: `open`, `role`, `email`, `password`, `showPassword`, `remember`,
    `submitting`, `error`.
  - Submit calls `authApi` (see below); on the stub it shows a "coming soon" notice.
  - "Register here" dispatches `openFormModal` with the role-appropriate `formType` and
    closes itself.
- **`app/components/Header.tsx`** (edit)
  - Add an outline "Login" button next to the filled "Join the Co-Op" CTA, in both the
    desktop CTA cluster and the mobile menu. Click dispatches `openLoginModal`.
- **`app/layout.tsx`** (edit)
  - Mount `<LoginModal />` beside `<FormModal />`.
- **`app/lib/authApi.ts`** (new)
  - `loginCoop(credentials)` / `loginPartner(credentials)` stubs returning a typed result
    `{ ok: boolean; message?: string }` with a clear `TODO` for the real endpoint. Single
    place to wire the API later.

## Styling

Reuse the input/label conventions from `JoinCoopForm.tsx` (`fieldBase`, primary color,
rounded-lg inputs, primary submit button) so the modal matches the site theme and the
reference screenshot's "Welcome Back" framing.

## Out of scope

- Real authentication / session handling (API supplied later).
- Editing the external OneConnect360 login app.




