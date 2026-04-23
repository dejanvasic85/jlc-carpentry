import { defineCliConfig } from 'sanity/cli';

export default defineCliConfig({
  api: {
    projectId: '365wnpgg',
    dataset: 'production',
  },
  /**
   * Enable auto-updates for studios.
   * Learn more at https://www.sanity.io/docs/cli#auto-updates
   */
  deployment: {
    appId: 'bafsgievpqro878ty4sj5p64',
    autoUpdates: true,
  },
});
