import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  __experimental_omnisearch_visibility: false,
  fields: [
    // Company Information
    defineField({
      name: 'company',
      title: 'Company Information',
      type: 'object',
      fields: [
        defineField({
          name: 'name',
          title: 'Company Name',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'abn',
          title: 'ABN (Australian Business Number)',
          type: 'string',
        }),
        defineField({
          name: 'shortName',
          title: 'Short Name',
          type: 'string',
        }),
        defineField({
          name: 'description',
          title: 'Company Description',
          type: 'text',
        }),
        defineField({
          name: 'shortDescription',
          title: 'Shorter Company Description (footer)',
          type: 'text',
        }),
        defineField({
          name: 'yearsOfExperience',
          title: 'Years of Experience',
          type: 'number',
        }),
        defineField({
          name: 'logo',
          title: 'Company Logo',
          type: 'image',
          options: {
            hotspot: true,
          },
        }),
      ],
    }),

    // Location & Service Areas
    defineField({
      name: 'location',
      title: 'Location & Service Areas',
      type: 'object',
      fields: [
        defineField({
          name: 'address',
          title: 'Business Address',
          type: 'object',
          fields: [
            defineField({
              name: 'street',
              title: 'Street Address',
              type: 'string',
            }),
            defineField({
              name: 'suburb',
              title: 'Suburb',
              type: 'string',
            }),
            defineField({
              name: 'state',
              title: 'State',
              type: 'string',
            }),
            defineField({
              name: 'postcode',
              title: 'Postcode',
              type: 'string',
            }),
          ],
        }),
        defineField({
          name: 'serviceAreas',
          title: 'Service Areas',
          type: 'array',
          of: [{ type: 'string' }],
          description: 'Areas where services are provided',
        }),
      ],
    }),

    // Contact Information
    defineField({
      name: 'contact',
      title: 'Contact Information',
      type: 'object',
      fields: [
        defineField({
          name: 'phone',
          title: 'Phone Number',
          type: 'string',
        }),
        defineField({
          name: 'email',
          title: 'Email Address',
          type: 'string',
          validation: (Rule) => Rule.email(),
        }),
        defineField({
          name: 'businessHours',
          title: 'Business Hours',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                defineField({
                  name: 'day',
                  title: 'Day',
                  type: 'string',
                  options: {
                    list: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
                  },
                }),
                defineField({
                  name: 'hours',
                  title: 'Hours',
                  type: 'string',
                  description: 'e.g. "9:00 AM - 5:00 PM" or "Closed"',
                }),
              ],
            },
          ],
        }),
      ],
    }),

    // Social Media & Online Presence
    defineField({
      name: 'socialMedia',
      title: 'Social Media & Online Presence',
      type: 'object',
      fields: [
        defineField({
          name: 'googleBusinessLink',
          title: 'Google Business Link',
          type: 'url',
        }),
        defineField({
          name: 'instagram',
          title: 'Instagram Link',
          type: 'string',
          description: 'Without @ symbol',
        }),
        defineField({
          name: 'facebook',
          title: 'Facebook page url',
          type: 'string',
        }),
        defineField({
          name: 'linkedin',
          title: 'LinkedIn Profile link',
          type: 'url',
        }),
        defineField({
          name: 'website',
          title: 'Website URL',
          type: 'url',
        }),
      ],
    }),

    // Licenses & Certifications (References)
    defineField({
      name: 'licenses',
      title: 'Licenses & Certifications',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'license' }] }],
      description: 'Select licenses to display on the website',
    }),

    // SEO Defaults
    defineField({
      name: 'seoDefaults',
      title: 'Default SEO Settings',
      type: 'object',
      fields: [
        defineField({
          name: 'siteTitle',
          title: 'Default Site Title',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'siteDescription',
          title: 'Default Site Description',
          type: 'text',
          validation: (Rule) => Rule.required().max(160),
        }),
        defineField({
          name: 'keywords',
          title: 'Default Keywords',
          type: 'array',
          of: [{ type: 'string' }],
        }),
        defineField({
          name: 'ogImage',
          title: 'Default Social Share Image',
          type: 'image',
          options: {
            hotspot: true,
          },
        }),
      ],
    }),
  ],

  preview: {
    select: {
      title: 'company.name',
      subtitle: 'company.shortName',
      media: 'company.logo',
    },
  },
});
