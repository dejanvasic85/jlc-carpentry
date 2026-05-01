# JLC Carpentry & Building Solutions

Marketing website for a local carpentry business in Melbourne Australia

🛠️ Built with [Sanity IO](https://www.sanity.io/) and [Nextjs](https://nextjs.org/)

🚀 Deployed to vercel.

## Getting started

Install `mise`, trust this repo config, install tools, and then install dependencies:

```sh
brew install mise
mise trust
mise install
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
The project is deployed to vercel. It uses trunk based development where every main branch is pushed to production.

**Sanity studio:**
The sanity studio is deployed manually using the sanity cli.
Make the required schema changes in the content project and then deploy it straight to production using the following command.

```sh
pnpm --filter content run deploy
```

## Google reviews

The google reviews are not managed by content and instead they need to be fetched using puppeteer.

To update reviews run the following command:

```sh
pnpm --filter reviews run update:reviews
```

This should update the data.json file in the reviews workspace which is then used by the nextjs App during build time to update the google reviews content.
