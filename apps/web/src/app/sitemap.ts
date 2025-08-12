import { MetadataRoute } from 'next';
import { getServicesData, getSiteSettingsData } from '@/lib/sanity/client';

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
      changeFrequency: 'weekly', // Homepage changes more frequently
      priority: 1.0, // Highest priority for homepage
    },
  ];

  try {
    // Fetch dynamic service routes from Sanity
    const services = await getServicesData();

    const serviceRoutes: MetadataRoute.Sitemap = services.map((service) => ({
      url: `${baseUrl}/services/${service.slug.current}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8, // High priority for service pages
    }));

    console.log(
      `Generated sitemap with ${staticRoutes.length} static routes and ${serviceRoutes.length} service routes`,
    );

    return [...staticRoutes, ...serviceRoutes];
  } catch (error) {
    console.error('Error generating sitemap:', error);
    // Return static routes only if there's an error fetching services
    return staticRoutes;
  }
}

// Export the revalidate time for ISR (optional)
export const revalidate = 86400; // Revalidate sitemap once per day (24 hours)
