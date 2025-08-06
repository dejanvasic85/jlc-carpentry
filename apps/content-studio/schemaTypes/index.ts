import homepage from './homepage';
import siteSettings from './siteSettings';
import heroSection from './heroSection';
import statisticItem from './statistic';
import serviceItem from './service';
import license from './license';

export const schemaTypes = [
  // Site-wide settings (singleton)
  siteSettings,

  // Reusable components
  heroSection,
  statisticItem,
  serviceItem,

  // Content types
  license,

  // Pages
  homepage,
];
