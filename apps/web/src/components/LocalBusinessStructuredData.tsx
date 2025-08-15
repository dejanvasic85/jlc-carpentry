import type { SiteSettings } from '@/lib/sanity/schemas';

interface LocalBusinessStructuredDataProps {
  siteSettings: SiteSettings;
}

const LocalBusinessStructuredData = ({ siteSettings }: LocalBusinessStructuredDataProps) => {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': siteSettings.socialMedia?.website || '#business',
    name: siteSettings.company.name,
    alternateName: siteSettings.company.shortName,
    description: siteSettings.company.description,
    url: siteSettings.socialMedia?.website,
    telephone: siteSettings.contact?.phone,
    email: siteSettings.contact?.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: siteSettings.location?.address?.street,
      addressLocality: siteSettings.location?.address?.suburb,
      addressRegion: siteSettings.location?.address?.state,
      postalCode: siteSettings.location?.address?.postcode,
      addressCountry: 'AU',
    },
    areaServed: siteSettings.location?.serviceAreas?.map((area) => ({
      '@type': 'City',
      name: area,
    })),
    openingHours: siteSettings.contact?.businessHours?.map((hours) => `${hours.day} ${hours.hours}`),
    sameAs: [
      siteSettings.socialMedia?.facebook,
      siteSettings.socialMedia?.instagram,
      siteSettings.socialMedia?.linkedin,
      siteSettings.socialMedia?.googleBusinessLink,
    ].filter(Boolean),
    priceRange: '$$',
    paymentAccepted: 'Cash, Credit Card, Bank Transfer',
    currenciesAccepted: 'AUD',
    serviceType: 'Carpentry and Building Services',
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Carpentry and Building Services',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Deck Construction',
            description: 'Custom deck building and construction services',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Pergola Installation',
            description: 'Pergola design and installation services',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Wall Construction',
            description: 'Interior and exterior wall construction',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Door Installation',
            description: 'Door installation and replacement services',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Cladding Services',
            description: 'External cladding installation and repair',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'General Renovations',
            description: 'Complete home renovation services',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Bathroom Renovations',
            description: 'Complete bathroom renovation and remodeling',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Kitchen Renovations',
            description: 'Kitchen renovation and remodeling services',
          },
        },
      ],
    },
    founder: {
      '@type': 'Person',
      name: siteSettings.company.name,
    },
    foundingDate: new Date().getFullYear() - (siteSettings.company.yearsOfExperience || 0),
  };

  // Remove undefined values
  const cleanStructuredData = JSON.parse(JSON.stringify(structuredData));

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(cleanStructuredData, null, 2),
      }}
    />
  );
};

export default LocalBusinessStructuredData;
