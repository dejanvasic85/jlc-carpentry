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
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description: 'URL-friendly identifier for this project page',
      options: {
        source: 'title',
        maxLength: 96,
      },
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
      name: 'featuredImage',
      title: 'Featured Image',
      type: 'image',
      description: 'Hero image for the project page. Falls back to the first gallery image if not set.',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
          description: 'Describe the image for accessibility',
        }),
      ],
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
      validation: (Rule) => Rule.required().min(1).max(20),
      description: 'Upload 1-20 images showcasing this project',
    }),
    defineField({
      name: 'videoGallery',
      title: 'Video Gallery',
      type: 'array',
      description: 'Upload project videos (MP4 recommended). Max 5.',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'video',
              title: 'Video File',
              type: 'file',
              options: { accept: 'video/*' },
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'title',
              title: 'Video Title',
              type: 'string',
              description: 'Short label shown under the video thumbnail',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'thumbnail',
              title: 'Thumbnail Image',
              type: 'image',
              description: 'Optional custom thumbnail; shown as poster image',
              options: { hotspot: true },
            }),
            defineField({
              name: 'description',
              title: 'Description',
              type: 'text',
              description: 'Screen reader description for accessibility',
            }),
            defineField({
              name: 'transcript',
              title: 'Transcript',
              type: 'text',
              description: 'For accessibility and SEO',
            }),
          ],
        },
      ],
      validation: (Rule) => Rule.max(5),
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
