# JLC Carpentry & Building Solutions

Marketing website for a local carpentry business in Melbourne Australia

🛠️ Built with [Sanity IO](https://www.sanity.io/) and [Nextjs](https://nextjs.org/)

## Getting started

Install [pnpm](https://pnpm.io/installation) (matching the version in `package.json#packageManager`) and Node (matching `.nvmrc`), then install dependencies:

```sh
pnpm install
```

### Running locally

This project uses pnpm workspaces so each sub repo has scripts for building and running.

Starting the sanity studio editor:

```sh
pnpm --filter content run dev
```

Running the nextjs app:

```sh
pnpm --filter web run dev
```

## Deploying

**Website:**
Vercel deploys the project automatically. We use trunk-based development, so every push to `main` goes straight to production.

**Sanity Studio:**
You deploy Sanity Studio manually using the Sanity CLI. Make your schema changes in the content project, then deploy them straight to production:

```sh
pnpm --filter content run deploy
```

## Google reviews

Content doesn't manage Google reviews. Instead, fetch them using Puppeteer.

To update reviews, run:

```sh
pnpm --filter reviews run update:reviews
```

This updates `data.json` in the reviews workspace. The Next.js app reads this file at build time to update the Google reviews content.
