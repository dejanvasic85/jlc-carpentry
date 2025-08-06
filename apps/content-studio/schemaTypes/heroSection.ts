import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'heroSection',
  title: 'Hero Section',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Hero Section Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
      description: 'Internal name to identify this hero section',
    }),

    defineField({
      name: 'variant',
      title: 'Hero Variant',
      type: 'string',
      options: {
        list: [
          { title: 'Full Screen with Gradient', value: 'fullscreen-gradient' },
          { title: 'With Background Image', value: 'background-image' },
          { title: 'Simple Centered', value: 'simple-centered' },
          { title: 'Split Layout', value: 'split-layout' },
        ],
      },
      validation: (Rule) => Rule.required(),
      initialValue: 'fullscreen-gradient',
    }),

    defineField({
      name: 'content',
      title: 'Content',
      type: 'object',
      fields: [
        defineField({
          name: 'title',
          title: 'Main Title',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'subtitle',
          title: 'Subtitle',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'description',
          title: 'Description',
          type: 'text',
        }),
      ],
    }),

    defineField({
      name: 'buttons',
      title: 'Action Buttons',
      type: 'object',
      fields: [
        defineField({
          name: 'primaryButton',
          title: 'Primary Button',
          type: 'object',
          fields: [
            defineField({
              name: 'text',
              title: 'Button Text',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'action',
              title: 'Action Type',
              type: 'string',
              options: {
                list: [
                  { title: 'Open Contact Dialog', value: 'contact' },
                  { title: 'Navigate to Section', value: 'navigate' },
                  { title: 'Navigate to Page', value: 'page' },
                  { title: 'External Link', value: 'external' },
                ],
              },
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'link',
              title: 'Link/Target',
              type: 'string',
              description: 'URL, page slug, or section ID',
              hidden: ({ parent }) => parent?.action === 'contact',
            }),
          ],
        }),
        defineField({
          name: 'secondaryButton',
          title: 'Secondary Button (Optional)',
          type: 'object',
          fields: [
            defineField({
              name: 'text',
              title: 'Button Text',
              type: 'string',
            }),
            defineField({
              name: 'action',
              title: 'Action Type',
              type: 'string',
              options: {
                list: [
                  { title: 'Open Contact Dialog', value: 'contact' },
                  { title: 'Navigate to Section', value: 'navigate' },
                  { title: 'Navigate to Page', value: 'page' },
                  { title: 'External Link', value: 'external' },
                ],
              },
            }),
            defineField({
              name: 'link',
              title: 'Link/Target',
              type: 'string',
              description: 'URL, page slug, or section ID',
              hidden: ({ parent }) => parent?.action === 'contact',
            }),
          ],
        }),
      ],
    }),
  ],

  preview: {
    select: {
      title: 'name',
      subtitle: 'content.title',
      media: 'styling.backgroundImage',
    },
  },
});
