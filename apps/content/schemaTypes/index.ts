import homepage from './homepage';
import siteSettings from './siteSettings';
import heroSection from './heroSection';
import statisticItem from './statistic';
import aboutFeature from './aboutFeature';
import serviceItem from './service';
import license from './license';
import recentProject from './recentProject';
import legalPage from './legalPage';

export const schemaTypes = [
  // Pages
  homepage,

  // Reusable components
  heroSection,
  statisticItem,
  aboutFeature,

  // Service and recent projects
  serviceItem,
  recentProject,

  // Content types
  license,
  legalPage,
  // Site-wide settings (singleton)
  siteSettings,
];
