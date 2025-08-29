# Sanity Clean Content Studio

Congratulations, you have now installed the Sanity Content Studio, an open-source real-time content editing environment connected to the Sanity backend.

Now you can do the following things:

- [Read “getting started” in the docs](https://www.sanity.io/docs/introduction/getting-started?utm_source=readme)
- [Join the Sanity community](https://www.sanity.io/community/join?utm_source=readme)
- [Extend and build plugins](https://www.sanity.io/docs/content-studio/extending?utm_source=readme)

## Export data

You can export a dataset from Sanity using the following command:

```bash
npm run export -w content -- <dataset> <output-file>.tar.gz
```

This will create a backup of your dataset that you can import later if needed.

## Import data

You can import a dataset into Sanity using the following command:

```bash
npm run import -w content -- <input-file>.tar.gz <dataset>
```

This will restore your dataset from the backup file.
