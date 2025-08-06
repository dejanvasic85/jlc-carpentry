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

    defineField({
      name: 'styling',
      title: 'Visual Styling',
      type: 'object',
      fields: [
        defineField({
          name: 'backgroundImage',
          title: 'Background Image',
          type: 'image',
          options: {
            hotspot: true,
          },
          fields: [
            {
              name: 'alt',
              title: 'Alt Text',
              type: 'string',
              description: 'Describe the image for accessibility',
            },
          ],
          hidden: ({ document }) => document?.variant !== 'background-image',
        }),
        defineField({
          name: 'gradientColors',
          title: 'Gradient Colors',
          type: 'object',
          fields: [
            defineField({
              name: 'from',
              title: 'From Color',
              type: 'string',
              options: {
                list: [
                  { title: 'Blue 600', value: 'blue-600' },
                  { title: 'Blue 700', value: 'blue-700' },
                  { title: 'Slate 800', value: 'slate-800' },
                  { title: 'Gray 900', value: 'gray-900' },
                ],
              },
              initialValue: 'blue-600',
            }),
            defineField({
              name: 'via',
              title: 'Via Color (Optional)',
              type: 'string',
              options: {
                list: [
                  { title: 'Blue 700', value: 'blue-700' },
                  { title: 'Blue 800', value: 'blue-800' },
                  { title: 'Slate 700', value: 'slate-700' },
                  { title: 'Gray 800', value: 'gray-800' },
                ],
              },
            }),
            defineField({
              name: 'to',
              title: 'To Color',
              type: 'string',
              options: {
                list: [
                  { title: 'Blue 700', value: 'blue-700' },
                  { title: 'Slate 800', value: 'slate-800' },
                  { title: 'Gray 900', value: 'gray-900' },
                  { title: 'Black', value: 'black' },
                ],
              },
              initialValue: 'slate-800',
            }),
          ],
          hidden: ({ document }) => document?.variant === 'background-image',
          description: 'Colour options can be found here: https://tailwindcss.com/docs/colors',
        }),
        defineField({
          name: 'textAlignment',
          title: 'Text Alignment',
          type: 'string',
          options: {
            list: [
              { title: 'Left', value: 'left' },
              { title: 'Center', value: 'center' },
              { title: 'Right', value: 'right' },
            ],
          },
          initialValue: 'center',
        }),
        defineField({
          name: 'minHeight',
          title: 'Minimum Height',
          type: 'string',
          options: {
            list: [
              { title: 'Auto grow by content', value: 'auto' },
              { title: 'Full Screen Height', value: 'screen' },
              { title: '75% of screen height', value: '75vh' },
              { title: '50% of screen height', value: '50vh' },
            ],
          },
          initialValue: 'auto',
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
