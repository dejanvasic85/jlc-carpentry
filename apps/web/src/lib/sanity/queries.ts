import { client } from './client';
import { type QueryParams } from 'next-sanity';
import { z } from 'zod';

export async function sanityFetch<T>({
  query,
  params = {},
  schema,
  revalidate = false,
  tags = [],
}: {
  query: string;
  params?: QueryParams;
  schema: z.ZodSchema<T>;
  revalidate?: number | false;
  tags?: string[];
}): Promise<T> {
  // Use tag-based revalidation if tags are provided and revalidate is false
  // Otherwise use time-based revalidation
  const cacheConfig = {
    next: {
      revalidate: revalidate === false && tags.length > 0 ? false : revalidate,
      tags: tags.length > 0 ? tags : undefined,
    },
  };

  const data = await client.fetch(query, params, cacheConfig);

  // Validate with Zod
  return schema.parse(data);
}

// Query for Homepage
export const homepageQuery = `
  *[_type == "homepage"][0] {
    seo {
      title,
      description,
      keywords,
      ogImage {
        asset {
          _ref
        }
      }
    },
    hero,
    servicesSection {
      title,
      description
    }
  }
`;

// Query for Hero Section with Statistics visibility
export const heroSectionQuery = `
  *[_type == "heroSection"][0] {
    name,
    variant,
    content {
      title,
      subtitle,
      description
    },
    buttons {
      primaryButton {
        text,
        action,
        link
      },
      secondaryButton {
        text,
        action,
        link
      }
    },
    heroImage {
      asset {
        _ref
      },
      alt
    },
    stats
  }
`;

// Query for Statistics
export const statisticsQuery = `
  *[_type == "statistic"] | order(_createdAt asc) {
    number,
    label,
    subtitle,
    icon,
    color
  }
`;

// Query for About Features
export const aboutFeaturesQuery = `
  *[_type == "aboutFeature" && isActive == true] | order(displayOrder asc) {
    title,
    description,
    icon,
    displayOrder
  }
`;

// Query for Services
export const servicesQuery = `
  *[_type == "service"] | order(_createdAt asc) {
    title,
    slug {
      current
    },
    description,
    features,
    icon,
    color,
    image {
      asset {
        _ref
      }
    },
    link {
      text,
      url,
      action
    }
  }
`;

// Query for Service Slugs (for generateStaticParams)
export const serviceSlugsQuery = `
  *[_type == "service"] {
    slug {
      current
    }
  }
`;

// Query for Service by slug
export const serviceBySlugQuery = `
  *[_type == "service" && slug.current == $slug][0] {
    title,
    slug {
      current
    },
    description,
    subtitle,
    features,
    image {
      asset {
        _ref
      }
    },
    heroImage {
      asset {
        _ref
      }
    },
    featuredVideo {
      title,
      description,
      transcript,
      duration,
      video {
        asset-> {
          _id,
          url,
          mimeType,
          originalFilename
        }
      },
      thumbnail {
        asset {
          _ref
        }
      }
    },
    mainContent,
    recentProjects[]-> {
      _id,
      title,
      slug {
        current
      },
      suburb,
      date {
        month,
        year
      },
      description,
      imageGallery[] {
        asset {
          _ref
        },
        alt,
        caption
      }
    },
    seo {
      metaTitle,
      metaDescription,
      keywords
    }
  }
`;

// Query for all project slugs (for generateStaticParams)
export const projectSlugsQuery = `
  *[_type == "recentProject" && defined(slug.current)] {
    slug {
      current
    }
  }
`;

// Query for all projects listing
export const allProjectsQuery = `
  *[_type == "recentProject" && defined(slug.current)] | order(date.year desc, date.month desc) {
    _id,
    title,
    slug {
      current
    },
    suburb,
    date {
      month,
      year
    },
    description,
    featuredImage {
      asset {
        _ref
      },
      alt
    },
    imageGallery[0] {
      asset {
        _ref
      },
      alt
    }
  }
`;

// Query for single project by slug
export const projectBySlugQuery = `
  *[_type == "recentProject" && slug.current == $slug][0] {
    _id,
    title,
    slug {
      current
    },
    suburb,
    date {
      month,
      year
    },
    description,
    featuredImage {
      asset {
        _ref
      },
      alt
    },
    imageGallery[] {
      asset {
        _ref
      },
      alt,
      caption
    }
  }
`;

// Query for Site Settings
export const siteSettingsQuery = `
  *[_type == "siteSettings"][0] {
    company {
      name,
      abn,
      shortName,
      description,
      shortDescription,
      yearsOfExperience,
      logo {
        asset {
          _ref
        }
      }
    },
    location {
      address {
        street,
        suburb,
        state,
        postcode
      },
      serviceAreas
    },
    contact {
      phone,
      email,
      businessHours[] {
        day,
        hours
      }
    },
    socialMedia {
      googleBusinessLink,
      instagram,
      facebook,
      linkedin,
      website
    },
    licenses[]-> {
      _id,
      name,
      number,
      type
    },
    seoDefaults {
      siteTitle,
      siteDescription,
      keywords,
      ogImage {
        asset {
          _ref
        }
      }
    },
    analytics {
      gtmId,
      ga4MeasurementId
    }
  }
`;
