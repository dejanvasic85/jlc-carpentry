import { createClient } from 'next-sanity';
import { z } from 'zod';
import { getConfig } from '@/lib/config';
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
  projectSlugsQuery,
  allProjectsQuery,
  projectBySlugQuery,
} from './queries';
import {
  HomepageSchema,
  SiteSettingsSchema,
  ServiceSchema,
  HeroSectionSchema,
  StatisticSchema,
  AboutFeatureSchema,
  ProjectSummarySchema,
  ProjectDetailSchema,
} from './schemas';

const config = getConfig();

export const client = createClient({
  projectId: config.sanityProjectId ?? '365wnpgg',
  dataset: config.sanityDataset ?? 'production',
  apiVersion: '2025-01-01', // Use current date
  useCdn: false,
});

const tags = ['content'];

// Data fetching functions
export async function getHomepageData() {
  return await sanityFetch({
    query: homepageQuery,
    schema: HomepageSchema,
    tags,
  });
}

export async function getSiteSettingsData() {
  return await sanityFetch({
    query: siteSettingsQuery,
    schema: SiteSettingsSchema,
    tags,
  });
}

export async function getServicesData() {
  return await sanityFetch({
    query: servicesQuery,
    schema: z.array(ServiceSchema),
    tags,
  });
}

export async function getHeroData() {
  return await sanityFetch({
    query: heroSectionQuery,
    schema: HeroSectionSchema,
    tags,
  });
}

export async function getStatisticsData() {
  return await sanityFetch({
    query: statisticsQuery,
    schema: z.array(StatisticSchema),
    tags,
  });
}

export async function getAboutFeaturesData() {
  return await sanityFetch({
    query: aboutFeaturesQuery,
    schema: z.array(AboutFeatureSchema),
    tags,
  });
}

export async function getServiceSlugs() {
  return await sanityFetch({
    query: serviceSlugsQuery,
    schema: z.array(z.object({ slug: z.object({ current: z.string() }) })),
    tags,
    revalidate: false, // Use tag-based revalidation
  });
}

export async function getServicePageData(slug: string) {
  return await sanityFetch({
    query: serviceBySlugQuery,
    schema: ServiceSchema,
    params: { slug },
    tags,
    revalidate: false, // Use tag-based revalidation
  });
}

export async function getProjectSlugs() {
  return await sanityFetch({
    query: projectSlugsQuery,
    schema: z.array(z.object({ slug: z.object({ current: z.string() }) })),
    tags,
    revalidate: false,
  });
}

export async function getAllProjects() {
  return await sanityFetch({
    query: allProjectsQuery,
    schema: z.array(ProjectSummarySchema),
    tags,
    revalidate: false,
  });
}

export async function getProjectBySlug(slug: string) {
  return await sanityFetch({
    query: projectBySlugQuery,
    schema: ProjectDetailSchema,
    params: { slug },
    tags,
    revalidate: false,
  });
}
