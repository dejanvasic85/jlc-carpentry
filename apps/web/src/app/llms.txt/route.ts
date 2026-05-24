import { sanityFetch, siteSettingsQuery, servicesQuery } from '@/lib/sanity/queries';
import { SiteSettings, SiteSettingsSchema, Service, ServiceSchema } from '@/lib/sanity/schemas';
import { z } from 'zod';

export const dynamic = 'force-static';
export const revalidate = 86400;

type LlmsData = {
  siteSettings: SiteSettings;
  services: Service[];
};

function buildServicesSection(services: Service[]): string {
  return services.map((s) => `- ${s.title} — ${s.description}`).join('\n');
}

function buildServiceAreasSection(areas: string[]): string {
  return areas.join(', ');
}

function buildBusinessHours(hours: { day: string; hours: string }[]): string {
  return hours.map((h) => `- ${h.day}: ${h.hours}`).join('\n');
}

function buildLlmsText({ siteSettings, services }: LlmsData): string {
  const { company, location, contact, socialMedia, licenses } = siteSettings;
  const address = location?.address;
  const suburb = address?.suburb ?? 'Alphington';
  const state = address?.state ?? 'VIC';

  const lines = [
    `# ${company.name}`,
    '',
    '## About',
    '',
    ...(company.description ? [company.description] : []),
    `Based in ${suburb}, ${state}, Melbourne, Victoria, Australia.`,
    ...(company.yearsOfExperience ? [`${company.yearsOfExperience}+ years of experience.`] : []),
    ...(company.abn ? [`ABN: ${company.abn}`] : []),
    '',
    '## Services',
    '',
    buildServicesSection(services),
    '',
  ];

  if (location?.serviceAreas && location.serviceAreas.length > 0) {
    lines.push('## Service Areas', '', buildServiceAreasSection(location.serviceAreas), '');
  }

  lines.push('## Contact', '');

  if (contact?.phone) lines.push(`- Phone: ${contact.phone}`);
  if (contact?.email) lines.push(`- Email: ${contact.email}`);
  if (socialMedia?.website) lines.push(`- Website: ${socialMedia.website}`);

  lines.push('');

  if (socialMedia?.googleBusinessLink || socialMedia?.instagram || socialMedia?.facebook) {
    lines.push('## Social', '');
    if (socialMedia.googleBusinessLink) lines.push(`- Google Business: ${socialMedia.googleBusinessLink}`);
    if (socialMedia.instagram) lines.push(`- Instagram: ${socialMedia.instagram}`);
    if (socialMedia.facebook) lines.push(`- Facebook: ${socialMedia.facebook}`);
    lines.push('');
  }

  if (licenses && licenses.length > 0) {
    lines.push('## Licenses', '');
    licenses.forEach((l) => lines.push(`- ${l.name}: ${l.number}`));
    lines.push('');
  }

  if (contact?.businessHours && contact.businessHours.length > 0) {
    lines.push('## Business Hours', '', buildBusinessHours(contact.businessHours), '');
  }

  return lines.join('\n');
}

export async function GET(): Promise<Response> {
  const [siteSettings, services] = await Promise.all([
    sanityFetch({ query: siteSettingsQuery, schema: SiteSettingsSchema }),
    sanityFetch({ query: servicesQuery, schema: z.array(ServiceSchema) }),
  ]);

  const body = buildLlmsText({ siteSettings, services });

  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
