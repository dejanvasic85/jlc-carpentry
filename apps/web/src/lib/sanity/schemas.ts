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

// Export inferred types
export type HeroSection = z.infer<typeof HeroSectionSchema>
export type ButtonAction = z.infer<typeof ButtonActionSchema>