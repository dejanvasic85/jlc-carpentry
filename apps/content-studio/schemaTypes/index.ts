import homepage from './homepage';
import siteSettings from './siteSettings';
import heroSection from './heroSection';
import statisticItem from './statistic';
import serviceItem from './service';
import license from './license';
import recentProject from './recentProject';

export const schemaTypes = [
  // Site-wide settings (singleton)
  siteSettings,

  // Reusable components
  heroSection,
  statisticItem,
  serviceItem,

  // Content types
  license,
  recentProject,

  // Pages
  homepage,
];
