import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'service',
  title: 'Services',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Service Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Service Description',
      type: 'text',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'features',
      title: 'Key Features',
      type: 'array',
      of: [{ type: 'string' }],
      validation: (Rule) => Rule.required().min(1),
      description: 'List of key features or benefits',
    }),
    defineField({
      name: 'icon',
      title: 'Icon',
      type: 'string',
      validation: (Rule) => Rule.required(),
      description: 'Emoji or Unicode character',
    }),
    defineField({
      name: 'color',
      title: 'Color Theme',
      type: 'string',
      options: {
        list: [
          { title: 'Blue', value: 'from-blue-500 to-blue-600' },
          { title: 'Emerald', value: 'from-emerald-500 to-emerald-600' },
          { title: 'Purple', value: 'from-purple-500 to-purple-600' },
          { title: 'Orange', value: 'from-orange-500 to-orange-600' },
          { title: 'Teal', value: 'from-teal-500 to-teal-600' },
          { title: 'Red', value: 'from-red-500 to-red-600' },
          { title: 'Indigo', value: 'from-indigo-500 to-indigo-600' },
          { title: 'Pink', value: 'from-pink-500 to-pink-600' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Service Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'link',
      title: 'Service Link',
      type: 'object',
      fields: [
        defineField({
          name: 'text',
          title: 'Link Text',
          type: 'string',
          initialValue: 'LEARN MORE',
        }),
        defineField({
          name: 'url',
          title: 'Link URL',
          type: 'string',
          description: 'Internal path or external URL',
        }),
        defineField({
          name: 'action',
          title: 'Link Action',
          type: 'string',
          options: {
            list: [
              { title: 'Navigate to Page', value: 'navigate' },
              { title: 'Open Contact Dialog', value: 'contact' },
              { title: 'External Link', value: 'external' },
              { title: 'Scroll to Section', value: 'scroll' },
            ],
          },
          initialValue: 'navigate',
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'description',
      media: 'image',
    },
    prepare({ title, subtitle, media }) {
      return {
        title,
        subtitle: subtitle ? subtitle.substring(0, 60) + '...' : '',
        media,
      };
    },
  },
});
