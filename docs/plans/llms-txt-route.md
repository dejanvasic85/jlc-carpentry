# Plan: Add llms.txt Route for AI Generative Optimization

## Context

AI crawlers (ChatGPT, Perplexity, Claude, etc.) increasingly read a plain-text `llms.txt` file at the root of a site to understand its purpose, services, and contact info without parsing HTML. Adding this improves AI-generated search answers ("generative engine optimization"). The reference implementation in `ses-next` fetches live data from Sanity and returns it as `text/plain`.

We also need a redirect so `/llms` → `/llms.txt` for convenience.

---

## What to Build

### 1. New route: `apps/web/src/app/llms.txt/route.ts`

A Next.js Route Handler that:
- Fetches `siteSettings` and `services` from Sanity in parallel using the existing `sanityFetch` helper and Zod schemas
- Builds a plain-text document and returns it as `text/plain; charset=utf-8`
- Uses `export const dynamic = 'force-static'` and `export const revalidate = 86400` (24h, matching the reference)

**Content sections to include:**

```
# {company.name}

## About

{company.description or shortDescription}
Based in {location.address.suburb}, Melbourne, Victoria, Australia.
{company.yearsOfExperience}+ years of experience.
ABN: {company.abn}

## Services

- {service.title} — {service.description}
  (repeated per service)

## Service Areas

{location.serviceAreas joined by ', '}

## Contact

- Phone: {contact.phone}
- Email: {contact.email}
- Website: https://www.jlccarpentrybuildingservices.com.au

## Social

- Google Business: {socialMedia.googleBusinessLink}
- Instagram: {socialMedia.instagram}
- Facebook: {socialMedia.facebook}

## Licenses

- {license.name}: {license.number}
  (repeated per license)

## Business Hours

- {day}: {hours}
  (repeated per businessHours entry)
```

Fields are conditionally included (skip if null/undefined), matching the pattern in ses-next.

**Reuse existing utilities:**
- `sanityFetch` from `@/lib/sanity/queries`
- `SiteSettingsSchema`, `SiteSettings` type, `ServiceSchema`, `Service` type from `@/lib/sanity/schemas`
- `siteSettingsQuery`, `servicesQuery` GROQ queries from `@/lib/sanity/queries`
- `z.array(ServiceSchema)` for the services array validation

### 2. Redirect in `apps/web/next.config.ts`

Add a `redirects` function that maps `/llms` → `/llms.txt` (permanent redirect, status 308):

```ts
async redirects() {
  return [
    {
      source: '/llms',
      destination: '/llms.txt',
      permanent: true,
    },
  ];
},
```

---

## Files to Create / Modify

| Action | File |
|--------|------|
| **Create** | `apps/web/src/app/llms.txt/route.ts` |
| **Modify** | `apps/web/next.config.ts` |

---

## Verification

1. `npm run dev -w web` — visit `http://localhost:3000/llms.txt` and confirm plain-text response with company/service data
2. Visit `http://localhost:3000/llms` — confirm it redirects to `/llms.txt`
3. `npm run type:check` — no TypeScript errors
