import { createClient } from 'next-sanity';

export const client = createClient({
  projectId: '365wnpgg',
  dataset: 'production',
  apiVersion: '2025-01-01', // Use current date
  useCdn: true, // Set to false for ISR or tag-based revalidation
});
