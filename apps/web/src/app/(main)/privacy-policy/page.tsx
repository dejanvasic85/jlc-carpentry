import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getLegalPageData, getSiteSettingsData } from '@/lib/sanity/client';
import LegalPageContent from '@/components/LegalPageContent';

export const revalidate = false; // Use tag-based revalidation
export const dynamic = 'force-static';

export async function generateMetadata(): Promise<Metadata> {
  const [siteSettings, page] = await Promise.all([getSiteSettingsData(), getLegalPageData('privacy-policy')]);

  const businessName = siteSettings.company.name;
  const title = `${page?.title ?? 'Privacy Policy'} | ${businessName}`;
  const description = `How ${businessName} collects, uses and protects your personal information.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'website',
      locale: 'en_AU',
      siteName: businessName,
    },
  };
}

export default async function PrivacyPolicyPage() {
  const page = await getLegalPageData('privacy-policy');

  if (!page) {
    return notFound();
  }

  return <LegalPageContent page={page} />;
}
