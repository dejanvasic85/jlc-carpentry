import { z } from 'zod';

// Base Sanity document schema with common fields
const BaseSanitySchema = z.object({
  _id: z.string().optional(),
  _rev: z.string().optional(),
  _type: z.string().optional(),
  _createdAt: z.string().optional(),
  _updatedAt: z.string().optional(),
});

// Button action schema - handle null values from Sanity
const ButtonActionSchema = z.object({
  text: z.string(),
  action: z.enum(['contact', 'navigate', 'page', 'external']),
  link: z.string().nullable().optional(),
});

// Hero Section Schema - make fields more flexible
export const HeroSectionSchema = BaseSanitySchema.extend({
  name: z.string().optional(),
  variant: z.enum(['fullscreen-gradient', 'background-image', 'simple-centered', 'split-layout']).optional(),
  content: z.object({
    title: z.string(),
    subtitle: z.string(),
    description: z.string().nullable().optional(),
  }),
  buttons: z.object({
    primaryButton: ButtonActionSchema,
    secondaryButton: ButtonActionSchema.nullable().optional(),
  }),
  stats: z.boolean().optional(),
});

// Statistic Schema - handle null values from Sanity
export const StatisticSchema = BaseSanitySchema.extend({
  _type: z.literal('statistic').optional(),
  number: z.string(),
  label: z.string(),
  subtitle: z.string(),
  icon: z.string().nullable().optional(),
  color: z.enum(['blue', 'green', 'purple', 'orange', 'red', 'teal']).optional(),
});

// Homepage Schema - make more flexible
export const HomepageSchema = BaseSanitySchema.extend({
  seo: z.object({
    title: z.string(),
    description: z.string(),
    keywords: z.array(z.string()).optional(),
    ogImage: z
      .object({
        asset: z.object({
          _ref: z.string(),
        }),
      })
      .nullable()
      .optional(),
  }),
  hero: z.boolean().optional(),
  servicesSection: z
    .object({
      title: z.string().optional(),
      description: z.string().optional(),
    })
    .optional(),
});

// Service Link Schema
const ServiceLinkSchema = z.object({
  text: z.string().nullable().optional(),
  url: z.string().nullable().optional(),
  action: z.enum(['navigate', 'contact', 'external', 'scroll']).nullable().optional(),
});

// Recent Project Schema
export const RecentProjectSchema = BaseSanitySchema.extend({
  title: z.string(),
  suburb: z.string(),
  date: z.object({
    month: z.string(),
    year: z.number(),
  }),
  description: z.string(),
  imageGallery: z.array(
    z.object({
      asset: z.object({
        _ref: z.string(),
      }),
      alt: z.string(),
      caption: z.string().nullable().optional(),
    }),
  ),
});

// Service Schema
export const ServiceSchema = BaseSanitySchema.extend({
  title: z.string(),
  slug: z.object({
    current: z.string(),
  }),
  description: z.string(),
  subtitle: z.string().nullable().optional(),
  features: z.array(z.string()),
  image: z
    .object({
      asset: z.object({
        _ref: z.string(),
      }),
    })
    .nullable()
    .optional(),
  heroImage: z
    .object({
      asset: z.object({
        _ref: z.string(),
      }),
    })
    .nullable()
    .optional(),
  mainContent: z.array(z.any()).nullable().optional(), // Rich text content
  testimonial: z
    .object({
      quote: z.string(),
      author: z.string(),
    })
    .nullable()
    .optional(),
  recentProjects: z.array(RecentProjectSchema).nullable().optional(),
  seo: z
    .object({
      metaTitle: z.string().nullable().optional(),
      metaDescription: z.string().nullable().optional(),
      keywords: z.array(z.string()).nullable().optional(),
    })
    .nullable()
    .optional(),
  link: ServiceLinkSchema.nullable().optional(),
});

// Site Settings Schema
export const SiteSettingsSchema = BaseSanitySchema.extend({
  company: z.object({
    name: z.string(),
    abn: z.string().nullable().optional(),
    shortName: z.string().nullable().optional(),
    description: z.string().nullable().optional(),
    shortDescription: z.string().nullable().optional(),
    yearsOfExperience: z.number().nullable().optional(),
    logo: z
      .object({
        asset: z.object({
          _ref: z.string(),
        }),
      })
      .nullable()
      .optional(),
  }),
  location: z
    .object({
      address: z
        .object({
          street: z.string().nullable().optional(),
          suburb: z.string().nullable().optional(),
          state: z.string().nullable().optional(),
          postcode: z.string().nullable().optional(),
        })
        .optional(),
      serviceAreas: z.array(z.string()).optional(),
    })
    .optional(),
  contact: z
    .object({
      phone: z.string().nullable().optional(),
      email: z.string().nullable().optional(),
      businessHours: z
        .array(
          z.object({
            day: z.string(),
            hours: z.string(),
          }),
        )
        .optional(),
    })
    .optional(),
  socialMedia: z
    .object({
      googleBusinessLink: z.string().nullable().optional(),
      instagram: z.string().nullable().optional(),
      facebook: z.string().nullable().optional(),
      linkedin: z.string().nullable().optional(),
      website: z.string().nullable().optional(),
    })
    .optional(),
  licenses: z
    .array(
      z.object({
        _id: z.string(),
        name: z.string(),
        number: z.string(),
        type: z.string(),
      }),
    )
    .optional(),
  seoDefaults: z.object({
    siteTitle: z.string(),
    siteDescription: z.string(),
    keywords: z.array(z.string()).optional(),
    ogImage: z
      .object({
        asset: z.object({
          _ref: z.string(),
        }),
      })
      .nullable()
      .optional(),
  }),
});

// Export inferred types
export type Homepage = z.infer<typeof HomepageSchema>;
export type HeroSection = z.infer<typeof HeroSectionSchema>;
export type ButtonAction = z.infer<typeof ButtonActionSchema>;
export type Statistic = z.infer<typeof StatisticSchema>;
export type Service = z.infer<typeof ServiceSchema>;
export type SiteSettings = z.infer<typeof SiteSettingsSchema>;
export type RecentProject = z.infer<typeof RecentProjectSchema>;
