import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'statistic',
  title: 'Statistics',
  type: 'document',
  fields: [
    defineField({
      name: 'number',
      title: 'Number/Value',
      type: 'string',
      validation: (Rule) => Rule.required(),
      description: 'e.g. "25+", "1000+", "100%"',
    }),
    defineField({
      name: 'label',
      title: 'Label',
      type: 'string',
      validation: (Rule) => Rule.required(),
      description: 'e.g. "Years Experience", "Projects Completed"',
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'string',
      validation: (Rule) => Rule.required(),
      description: 'e.g. "Established 1995", "Residential & Commercial"',
    }),
    defineField({
      name: 'icon',
      title: 'Icon',
      type: 'string',
      description: 'Emoji or Unicode character (optional)',
    }),
    defineField({
      name: 'color',
      title: 'Accent Color',
      type: 'string',
      options: {
        list: [
          { title: 'Blue', value: 'blue' },
          { title: 'Green', value: 'green' },
          { title: 'Purple', value: 'purple' },
          { title: 'Orange', value: 'orange' },
          { title: 'Red', value: 'red' },
          { title: 'Teal', value: 'teal' },
        ],
      },
      initialValue: 'blue',
    }),
  ],
  preview: {
    select: {
      title: 'label',
      subtitle: 'number',
    },
  },
});
