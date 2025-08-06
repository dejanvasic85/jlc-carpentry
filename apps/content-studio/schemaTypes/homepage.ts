import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'homepage',
  title: 'Homepage',
  type: 'document',
  fields: [
    // SEO Section
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'object',
      fields: [
        defineField({
          name: 'title',
          title: 'Page Title',
          type: 'string',
          validation: (Rule) => Rule.required().max(60),
        }),
        defineField({
          name: 'description',
          title: 'Meta Description',
          type: 'text',
          validation: (Rule) => Rule.required().max(160),
        }),
        defineField({
          name: 'keywords',
          title: 'Keywords',
          type: 'array',
          of: [{ type: 'string' }],
        }),
        defineField({
          name: 'ogImage',
          title: 'Social Share Image',
          type: 'image',
          options: {
            hotspot: true,
          },
          description: 'Override default social share image for this page',
        }),
      ],
    }),

    // Referenced Components
    defineField({
      name: 'hero',
      title: 'Hero Section',
      type: 'reference',
      to: [{ type: 'heroSection' }],
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'stats',
      title: 'Statistics Section',
      type: 'reference',
      to: [{ type: 'statistic' }],
    }),

    // Page-specific Content
    defineField({
      name: 'additionalSections',
      title: 'Additional Sections',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'type',
              title: 'Section Type',
              type: 'string',
              options: {
                list: [
                  { title: 'About Us', value: 'about' },
                  { title: 'Testimonials', value: 'testimonials' },
                  { title: 'Contact CTA', value: 'contact-cta' },
                  { title: 'FAQ', value: 'faq' },
                ],
              },
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'title',
              title: 'Section Title',
              type: 'string',
            }),
            defineField({
              name: 'content',
              title: 'Content',
              type: 'text',
            }),
            defineField({
              name: 'enabled',
              title: 'Show Section',
              type: 'boolean',
              initialValue: true,
            }),
          ],
          preview: {
            select: {
              title: 'title',
              subtitle: 'type',
            },
            prepare({ title, subtitle }) {
              return {
                title: title || 'Untitled Section',
                subtitle: subtitle ? subtitle.charAt(0).toUpperCase() + subtitle.slice(1) : '',
              };
            },
          },
        },
      ],
    }),

    // Page Settings
    defineField({
      name: 'pageSettings',
      title: 'Page Settings',
      type: 'object',
      fields: [
        defineField({
          name: 'slug',
          title: 'Page Slug',
          type: 'slug',
          options: {
            source: 'seo.title',
            maxLength: 96,
          },
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'publishedAt',
          title: 'Published Date',
          type: 'datetime',
          initialValue: () => new Date().toISOString(),
        }),
        defineField({
          name: 'isPublished',
          title: 'Published',
          type: 'boolean',
          initialValue: true,
        }),
      ],
    }),
  ],

  preview: {
    select: {
      title: 'seo.title',
      subtitle: 'pageSettings.slug.current',
    },
    prepare({ title, subtitle }) {
      return {
        title: title || 'Homepage',
        subtitle: subtitle ? `/${subtitle}` : '/homepage',
      };
    },
  },
});
