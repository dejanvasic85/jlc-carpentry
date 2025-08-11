import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'recentProject',
  title: 'Recent Project',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Project Title',
      type: 'string',
      description: 'A brief title for this project (e.g., "Modern Kitchen Renovation")',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'suburb',
      title: 'Suburb',
      type: 'string',
      description: 'The suburb where this project was completed',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'date',
      title: 'Completion Date',
      type: 'object',
      fields: [
        defineField({
          name: 'month',
          title: 'Month',
          type: 'string',
          options: {
            list: [
              'January',
              'February',
              'March',
              'April',
              'May',
              'June',
              'July',
              'August',
              'September',
              'October',
              'November',
              'December',
            ],
          },
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'year',
          title: 'Year',
          type: 'number',
          validation: (Rule) =>
            Rule.required()
              .min(2020)
              .max(new Date().getFullYear() + 1),
        }),
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Project Description',
      type: 'text',
      description: 'A detailed description of the work completed, materials used, and special features',
      validation: (Rule) => Rule.required().max(500),
    }),
    defineField({
      name: 'imageGallery',
      title: 'Image Gallery',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true,
          },
          fields: [
            defineField({
              name: 'alt',
              title: 'Alt Text',
              type: 'string',
              description: 'Describe the image for accessibility',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'caption',
              title: 'Caption',
              type: 'string',
              description: 'Optional caption for the image',
            }),
          ],
        },
      ],
      validation: (Rule) => Rule.required().min(1).max(10),
      description: 'Upload 1-10 images showcasing this project',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'suburb',
      media: 'imageGallery.0',
      month: 'date.month',
      year: 'date.year',
    },
    prepare(selection) {
      const { title, subtitle, month, year } = selection;
      return {
        title: title,
        subtitle: `${subtitle} - ${month} ${year}`,
        media: selection.media,
      };
    },
  },
});
