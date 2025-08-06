import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'license',
  title: 'License & Certification',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'License/Certification Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
      description: 'e.g. "Building Practitioner License", "Electrical License"',
    }),

    defineField({
      name: 'type',
      title: 'License Type',
      type: 'string',
      options: {
        list: [
          { title: 'Building License', value: 'building' },
          { title: 'Electrical License', value: 'electrical' },
          { title: 'Plumbing License', value: 'plumbing' },
          { title: 'Trade Certification', value: 'trade' },
          { title: 'Insurance Certificate', value: 'insurance' },
          { title: 'Professional Membership', value: 'membership' },
          { title: 'Safety Certification', value: 'safety' },
          { title: 'Other', value: 'other' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'number',
      title: 'License/Certificate Number',
      type: 'string',
      description: 'Official license or certificate number',
    }),

    defineField({
      name: 'issuingAuthority',
      title: 'Issuing Authority',
      type: 'string',
      validation: (Rule) => Rule.required(),
      description: 'e.g. "Victorian Building Authority", "WorkSafe Victoria"',
    }),

    defineField({
      name: 'displaySettings',
      title: 'Display Settings',
      type: 'object',
      fields: [
        defineField({
          name: 'showOnWebsite',
          title: 'Display on Website',
          type: 'boolean',
          initialValue: true,
        }),
        defineField({
          name: 'displayOrder',
          title: 'Display Order',
          type: 'number',
          description: 'Order in which to display (lower numbers first)',
          initialValue: 0,
        }),
        defineField({
          name: 'highlightAsMain',
          title: 'Highlight as Main License',
          type: 'boolean',
          initialValue: false,
          description: 'Feature this as a primary credential',
        }),
      ],
    }),

    defineField({
      name: 'notes',
      title: 'Internal Notes',
      type: 'text',
      description: 'Private notes for internal use (not displayed publicly)',
    }),
  ],

  orderings: [
    {
      title: 'Display Order',
      name: 'displayOrderAsc',
      by: [{ field: 'displaySettings.displayOrder', direction: 'asc' }],
    },
    {
      title: 'Expiry Date',
      name: 'expiryDateAsc',
      by: [{ field: 'dates.expiryDate', direction: 'asc' }],
    },
    {
      title: 'License Type',
      name: 'typeAsc',
      by: [{ field: 'type', direction: 'asc' }],
    },
  ],

  preview: {
    select: {
      title: 'name',
      subtitle: 'issuingAuthority',
    },
  },
});
