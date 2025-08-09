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

    defineField({
      name: 'hero',
      title: 'Show large hero',
      type: 'boolean',
      initialValue: true,
    }),
  ],

  preview: {
    select: {
      title: 'seo.title',
    },
    prepare({ title }) {
      return {
        title: title || 'Homepage',
      };
    },
  },
});
