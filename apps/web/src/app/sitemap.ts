import { MetadataRoute } from 'next';
import { getServicesData, getSiteSettingsData, getProjectSlugs } from '@/lib/sanity/client';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  let baseUrl = 'https://www.jlccarpentrybuildingservices.com.au';

  try {
    const siteSettings = await getSiteSettingsData();
    // Use the website from social media settings if available
    if (siteSettings.socialMedia?.website) {
      baseUrl = siteSettings.socialMedia.website;
    }
  } catch (error) {
    console.warn('Could not fetch site settings for sitemap, using default domain:', error);
  }

  // Static routes with SEO-optimized metadata
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/projects`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
  ];

  try {
    // Fetch dynamic service and project routes from Sanity
    const [services, projectSlugs] = await Promise.all([getServicesData(), getProjectSlugs()]);

    const serviceRoutes: MetadataRoute.Sitemap = services.map((service) => ({
      url: `${baseUrl}/services/${service.slug.current}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    }));

    const projectRoutes: MetadataRoute.Sitemap = projectSlugs.map((item) => ({
      url: `${baseUrl}/projects/${item.slug.current}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }));

    console.log(
      `Generated sitemap with ${staticRoutes.length} static, ${serviceRoutes.length} service, and ${projectRoutes.length} project routes`,
    );

    return [...staticRoutes, ...serviceRoutes, ...projectRoutes];
  } catch (error) {
    console.error('Error generating sitemap:', error);
    return staticRoutes;
  }
}

// Export the revalidate time for ISR (optional)
export const revalidate = 86400; // Revalidate sitemap once per day (24 hours)
