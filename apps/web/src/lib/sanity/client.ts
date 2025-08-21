import { createClient } from 'next-sanity';
import { z } from 'zod';
import {
  sanityFetch,
  homepageQuery,
  siteSettingsQuery,
  servicesQuery,
  serviceSlugsQuery,
  heroSectionQuery,
  statisticsQuery,
  aboutFeaturesQuery,
  serviceBySlugQuery,
} from './queries';
import { HomepageSchema, SiteSettingsSchema, ServiceSchema, HeroSectionSchema, StatisticSchema, AboutFeatureSchema } from './schemas';

export const client = createClient({
  projectId: '365wnpgg',
  dataset: 'production',
  apiVersion: '2025-01-01', // Use current date
  useCdn: true, // Set to false for ISR or tag-based revalidation
});

// Data fetching functions
export async function getHomepageData() {
  return await sanityFetch({
    query: homepageQuery,
    schema: HomepageSchema,
    tags: ['homepage'],
  });
}

export async function getSiteSettingsData() {
  return await sanityFetch({
    query: siteSettingsQuery,
    schema: SiteSettingsSchema,
    tags: ['siteSettings'],
  });
}

export async function getServicesData() {
  return await sanityFetch({
    query: servicesQuery,
    schema: z.array(ServiceSchema),
    tags: ['service'],
  });
}

export async function getHeroData() {
  return await sanityFetch({
    query: heroSectionQuery,
    schema: HeroSectionSchema,
    tags: ['heroSection'],
  });
}

export async function getStatisticsData() {
  return await sanityFetch({
    query: statisticsQuery,
    schema: z.array(StatisticSchema),
    tags: ['statistic'],
  });
}

export async function getAboutFeaturesData() {
  return await sanityFetch({
    query: aboutFeaturesQuery,
    schema: z.array(AboutFeatureSchema),
    tags: ['aboutFeature'],
  });
}

export async function getServiceSlugs() {
  return await sanityFetch({
    query: serviceSlugsQuery,
    schema: z.array(z.object({ slug: z.object({ current: z.string() }) })),
    tags: ['service'],
    revalidate: false, // Use tag-based revalidation
  });
}

export async function getServicePageData(slug: string) {
  return await sanityFetch({
    query: serviceBySlugQuery,
    schema: ServiceSchema,
    params: { slug },
    tags: ['service'],
    revalidate: false, // Use tag-based revalidation
  });
}
