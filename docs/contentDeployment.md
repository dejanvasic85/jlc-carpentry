# Content & Studio Deployment Workflow

This document describes how to deploy the Sanity Studio and seed/update content for the JLC Carpentry website.

## Concepts

There are three distinct "deploys" in this project, and it's important not to confuse them:

| What                | Command                       | What it does                                                            |
| ------------------- | ----------------------------- | ----------------------------------------------------------------------- |
| **Website**         | (automatic on Vercel)         | Vercel builds & deploys `apps/web` when a PR is merged to `main`.        |
| **Sanity Studio**   | `npm run deploy -w content`   | Deploys the editing UI (and its bundled schema) to `*.sanity.studio`.   |
| **Sanity content**  | `sanity dataset import` / API | Creates or updates the actual documents (content) in the dataset.       |

The schema lives in `apps/content/schemaTypes` and is bundled with the Studio. After adding or changing a schema type, you must deploy the Studio so editors see the new fields.

## Project details

- **Project ID:** `365wnpgg`
- **Dataset:** `production`
- **Studio app ID:** `bafsgievpqro878ty4sj5p64` (see `apps/content/sanity.cli.ts`)

## Deploying the Studio

When you add or change a schema (e.g. a new document type), deploy the Studio so it reflects the change:

```bash
npm run deploy -w content
```

This runs `sanity deploy` using the authenticated Sanity CLI session. You must be logged in (`npx sanity login` from `apps/content` if needed).

## Seeding / updating content

Content documents are created via the Sanity CLI using the authenticated session.

### Legal pages (terms & privacy policy)

The legal page content is generated from a script so it stays version-controlled and reproducible:

```bash
# 1. Generate the NDJSON from the source-of-truth script
node scripts/seedLegalPages.mjs

# 2. Import it into the production dataset (replaces existing legalPage docs by _id)
cd apps/content
npx sanity dataset import ../../scripts/legalPages.ndjson production --replace
```

The documents use deterministic IDs (`legalPage.terms`, `legalPage.privacy-policy`), so re-running the import with `--replace` updates the existing documents rather than creating duplicates.

To edit the legal copy, change the text in `scripts/seedLegalPages.mjs`, re-generate, and re-import — or edit directly in the Studio.

## After deploying content

The website uses tag-based cache revalidation (see `docs/cacheInvalidation.md`). A Sanity webhook hits `/api/revalidate` on create/update/delete, so published content changes appear on the live site without a redeploy.
