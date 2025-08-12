import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://www.jlccarpentrybuildingservices.com.au';

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/api/', // Disallow API routes
        '/_next/', // Disallow Next.js internal routes
        '/admin/', // Disallow any admin routes if they exist
        '/studio/', // Disallow Sanity Studio if accessible via this domain
      ],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
