import { z } from 'zod'

// Base Sanity document fields
const SanityDocument = z.object({
  _id: z.string(),
  _rev: z.string().optional(),
  _type: z.string(),
  _createdAt: z.string().optional(),
  _updatedAt: z.string().optional(),
})


// Button action schema
const ButtonActionSchema = z.object({
  text: z.string(),
  action: z.enum(['contact', 'navigate', 'page', 'external']),
  link: z.string().optional(),
})

// Hero Section Schema
export const HeroSectionSchema = SanityDocument.extend({
  _type: z.literal('heroSection'),
  name: z.string(),
  variant: z.enum(['fullscreen-gradient', 'background-image', 'simple-centered', 'split-layout']),
  content: z.object({
    title: z.string(),
    subtitle: z.string(),
    description: z.string().optional(),
  }),
  buttons: z.object({
    primaryButton: ButtonActionSchema,
    secondaryButton: ButtonActionSchema.optional(),
  }),
})

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
})

// Export inferred types
export type HeroSection = z.infer<typeof HeroSectionSchema>
export type ButtonAction = z.infer<typeof ButtonActionSchema>
export type Statistic = z.infer<typeof StatisticSchema>