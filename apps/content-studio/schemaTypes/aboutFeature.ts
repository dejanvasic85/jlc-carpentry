import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'aboutFeature',
  title: 'About Feature',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Feature Title',
      type: 'string',
      validation: (Rule) => Rule.required().max(60).warning('Keep titles concise for better readability'),
      description: 'A short, impactful title for the feature',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required().max(200).warning('Keep descriptions under 200 characters'),
      description: 'Brief description explaining the feature benefit',
    }),
    defineField({
      name: 'icon',
      title: 'Icon',
      type: 'string',
      validation: (Rule) => Rule.required(),
      description: 'Emoji or Unicode character (e.g., 🛡️, ⭐, 📍)',
    }),
    defineField({
      name: 'displayOrder',
      title: 'Display Order',
      type: 'number',
      initialValue: 0,
      validation: (Rule) => Rule.required().min(0),
      description: 'Order in which this feature appears (lower numbers appear first)',
    }),
    defineField({
      name: 'isActive',
      title: 'Active',
      type: 'boolean',
      initialValue: true,
      description: 'Toggle to show/hide this feature on the website',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'description',
      icon: 'icon',
      order: 'displayOrder',
    },
    prepare(selection) {
      const { title, subtitle, icon, order } = selection;
      return {
        title: `${icon} ${title}`,
        subtitle: `Order: ${order} - ${subtitle}`,
      };
    },
  },
  orderings: [
    {
      title: 'Display Order',
      name: 'displayOrder',
      by: [{ field: 'displayOrder', direction: 'asc' }],
    },
    {
      title: 'Title A-Z',
      name: 'titleAsc',
      by: [{ field: 'title', direction: 'asc' }],
    },
  ],
});