---
title: 'Google Ads Landing Page (/free-quote)'
status: captured
source: analytics
captured: '2026-05-28'
domain: engineering
plan: ''
tags: [landing-page, conversion, google-ads, lead-generation]
---

## Problem / Opportunity

Google Ads campaign (~$256 spend, 93 clicks, 8.10% CTR over 3 weeks) is sending high-intent traffic to the homepage, which is producing zero conversions. The ads target "kitchen renovations melbourne", "decks melbourne", "pergola melbourne", "bathroom renovations melbourne". The homepage is not structured to convert paid traffic into leads.

## Context

The site is a Next.js App Router application at `apps/web`. Key existing assets:

- **Contact form + action:** `ContactDialog.tsx` contains a `<dialog>`-modal form with `react-hook-form` + `useActionState`. The server action is in `app/actions/contact.ts` → `submitContactForm` → `lib/email.ts` (AWS SES). Fields: name, email, phone (optional), description.
- **Form field components:** `components/forms/FormInput.tsx`, `components/forms/FormTextarea.tsx`.
- **Tracking:** `GoogleTagManager.tsx` exposes `gtag.trackContact('form')`, `gtag.event(...)`, `gtag.conversion(...)`. GTM is already firing.
- **Layout:** `app/layout.tsx` renders the full `<Header>` and `<Footer>` globally. The landing page will need a custom layout (no nav header, no big footer) achieved via a route-level `layout.tsx` override.
- **HeroSection, ServicesSection, ReviewCard, GoogleReviews, ProjectGallery** components all exist and can be partially reused or used as reference.
- **Existing form issue:** The form body is fully embedded inside `ContactDialog.tsx` as a `<dialog>` element. To place it inline on the landing page without duplicating logic, the form fields + submission logic need to be extracted into a standalone `ContactFormBody` component consumed by both the dialog and the new inline placement.

The display URL pattern used in the current ads is `/carpentry/melbourne`. The page slug `/free-quote` reads well in ads as a final URL and matches the intent.

## Rough Scope

1. **Refactor** `ContactDialog.tsx`: extract the form internals into `components/ContactFormBody.tsx` (shared component). `ContactDialog` wraps it in the `<dialog>` shell. No change to the server action or email flow.
2. **New layout** `app/free-quote/layout.tsx`: stripped header (logo + tap-to-call only), no nav, no full Footer. Sticky mobile CTA bar at bottom.
3. **New page** `app/free-quote/page.tsx` with sections:
   - Above the fold: headline, subheadline, trust badges, hero image, CTA button + tap-to-call
   - Inline `ContactFormBody` (high on page, not behind a modal trigger)
   - Services overview (icons + one-liners, no outbound links)
   - Why JLC: 3-4 real Google reviews + stats row
   - Service area suburb list
   - Final CTA block + minimal footer (phone, email, ABN, license, copyright)
4. **Conversion events:** fire `gtag.trackContact('form')` on form submit + `gtag.trackContact('phone')` on phone tap. Ensure these land in GTM as `contact_attempt` events.
5. **Meta tags:** custom `generateMetadata()` with page-specific title, description, OG data. Page is indexable but not in the main nav.

New files:

- `apps/web/src/components/ContactFormBody.tsx`
- `apps/web/src/app/free-quote/layout.tsx`
- `apps/web/src/app/free-quote/page.tsx`
- `apps/web/src/components/landing/TrustBadges.tsx`
- `apps/web/src/components/landing/ServiceAreaList.tsx`
- `apps/web/src/components/landing/LandingMinimalFooter.tsx`
- `apps/web/src/components/landing/StickyCallBar.tsx`

Modified files:

- `apps/web/src/components/ContactDialog.tsx` (consumes `ContactFormBody`)

## Success Signal

- Contact form submissions arrive in the BCC inbox from the `/free-quote` page
- Phone tap clicks fire `contact_attempt` GTM event with `contact_method: 'phone'`
- Form submit fires `contact_attempt` GTM event with `contact_method: 'form'`
- No site navigation visible above the fold on mobile
- Sticky call bar visible on mobile at all scroll positions
- TypeScript passes with `npm run type:check -w web`

## Open Questions

- James's exact phone number (currently pulled from `siteSettings.contact.phone` via Sanity -- same approach will be used on the landing page)
- Whether to pull Google reviews dynamically (like `GoogleReviews` component does) or hardcode 3-4 specific reviews for reliability on this page
- Hero image: use the existing `/hero.webp` fallback or pull from Sanity? Probably use a static project photo for speed

## References

- Google Ads campaign currently running targeting Melbourne carpentry searches
- Existing server action: `apps/web/src/app/actions/contact.ts`
- GTM tracking utility: `apps/web/src/components/GoogleTagManager.tsx`
- Live site: https://www.jlccarpentrybuildingservices.com.au/
