import { client } from './client';
import { type QueryParams } from 'next-sanity';
import { z } from 'zod';

export async function sanityFetch<T>({
  query,
  params = {},
  schema,
  revalidate = 60,
  tags = [],
}: {
  query: string;
  params?: QueryParams;
  schema: z.ZodSchema<T>;
  revalidate?: number | false;
  tags?: string[];
}): Promise<T> {
  const data = await client.fetch(query, params, {
    next: {
      revalidate: tags.length ? false : revalidate,
      tags,
    },
  });

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

// Query for Site Settings
export const siteSettingsQuery = `
  *[_type == "siteSettings"][0] {
    company {
      name,
      shortName,
      description
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
    }
  }
`;
