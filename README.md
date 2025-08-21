# JLC Carpentry & Building Solutions

Marketing website for a local carpentry business in Melbourne Australia

🛠️ Built with [Sanity IO](https://www.sanity.io/) and [Nextjs](https://nextjs.org/)

🚀 Deployed to vercel.

## Getting started

Ensure you have volta installed and run

```sh
npm install
```

### Running locally

This project makes use of the npm workspaces so each sub repo has scripts for building and running.

Starting the sanity studio editor:

```sh
npm run dev -w content-studio
```

Running the nextjs app:

```sh
npm run dev -w web
```

## Deploying

**Website:**
The project is deployed to vercel. It uses trunk based development where every main branch is pushed to production.

**Sanity studio:**
The sanity studio is deployed manually using the sanity cli.
Make the required schema changes in the content project and then deploy it straight to production using the following command.

```sh
npm run deploy -w content-studio
```

## Google reviews

The google reviews are not managed by content and instead they need to be fetched using puppeteer.

To update reviews run the following command:

```sh
npm run update:reviews
```

This should update the data.json file in the reviews workspace which is then used by the nextjs App during build time to update the google reviews content.
