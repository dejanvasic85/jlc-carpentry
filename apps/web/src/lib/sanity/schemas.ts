import { z } from 'zod';

// Button action schema - handle null values from Sanity
const ButtonActionSchema = z.object({
  text: z.string(),
  action: z.enum(['contact', 'navigate', 'page', 'external']),
  link: z.string().nullable().optional(),
});

// Hero Section Schema - make fields more flexible
export const HeroSectionSchema = z.object({
  _id: z.string().optional(),
  _rev: z.string().optional(),
  _type: z.string().optional(),
  _createdAt: z.string().optional(),
  _updatedAt: z.string().optional(),
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
export const StatisticSchema = z.object({
  _id: z.string().optional(),
  _rev: z.string().optional(),
  _type: z.literal('statistic').optional(),
  _createdAt: z.string().optional(),
  _updatedAt: z.string().optional(),
  number: z.string(),
  label: z.string(),
  subtitle: z.string(),
  icon: z.string().nullable().optional(),
  color: z.enum(['blue', 'green', 'purple', 'orange', 'red', 'teal']).optional(),
});

// Homepage Schema - make more flexible
export const HomepageSchema = z.object({
  _id: z.string().optional(),
  _rev: z.string().optional(),
  _type: z.string().optional(),
  _createdAt: z.string().optional(),
  _updatedAt: z.string().optional(),
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
});

// Site Settings Schema
export const SiteSettingsSchema = z.object({
  _id: z.string().optional(),
  _rev: z.string().optional(),
  _type: z.string().optional(),
  _createdAt: z.string().optional(),
  _updatedAt: z.string().optional(),
  company: z.object({
    name: z.string(),
    shortName: z.string().optional(),
    description: z.string().optional(),
  }),
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
export type SiteSettings = z.infer<typeof SiteSettingsSchema>;
