import { defineField, defineType } from 'sanity';

const pageTypeOptions = [
  { title: 'Terms & Conditions', value: 'terms' },
  { title: 'Privacy Policy', value: 'privacy-policy' },
];

export default defineType({
  name: 'legalPage',
  title: 'Legal Pages',
  type: 'document',
  fields: [
    defineField({
      name: 'pageType',
      title: 'Page Type',
      type: 'string',
      description: 'Determines which page this content appears on (/terms or /privacy-policy)',
      options: {
        list: pageTypeOptions,
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'string',
      description: 'Heading displayed at the top of the page',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'lastUpdated',
      title: 'Last Updated',
      type: 'date',
      description: 'Date shown below the title so visitors know when the policy last changed',
      options: {
        dateFormat: 'DD MMMM YYYY',
      },
    }),
    defineField({
      name: 'content',
      title: 'Page Content',
      type: 'array',
      description: 'The full legal text. Use headings and lists to keep it readable.',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'H2', value: 'h2' },
            { title: 'H3', value: 'h3' },
            { title: 'Quote', value: 'blockquote' },
          ],
          lists: [
            { title: 'Bullet', value: 'bullet' },
            { title: 'Number', value: 'number' },
          ],
          marks: {
            decorators: [
              { title: 'Strong', value: 'strong' },
              { title: 'Emphasis', value: 'em' },
              { title: 'Underline', value: 'underline' },
            ],
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'External link',
                fields: [
                  {
                    name: 'href',
                    type: 'url',
                    title: 'URL',
                  },
                  {
                    title: 'Open in new tab',
                    name: 'blank',
                    type: 'boolean',
                  },
                ],
              },
            ],
          },
        },
      ],
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      pageType: 'pageType',
    },
    prepare({ title, pageType }) {
      const label = pageTypeOptions.find((option) => option.value === pageType)?.title;
      return {
        title: title || label || 'Legal Page',
        subtitle: label,
      };
    },
  },
});
