import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getLegalPageData, getSiteSettingsData } from '@/lib/sanity/client';
import LegalPageContent from '@/components/LegalPageContent';

export const revalidate = false; // Use tag-based revalidation
export const dynamic = 'force-static';

export async function generateMetadata(): Promise<Metadata> {
  const [siteSettings, page] = await Promise.all([getSiteSettingsData(), getLegalPageData('terms')]);

  const businessName = siteSettings.company.name;
  const title = `${page?.title ?? 'Terms & Conditions'} | ${businessName}`;
  const description = `Terms and conditions for using the ${businessName} website and services.`;

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

export default async function TermsPage() {
  const page = await getLegalPageData('terms');

  if (!page) {
    return notFound();
  }

  return <LegalPageContent page={page} />;
}
