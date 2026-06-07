import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { getSiteSettingsData } from '@/lib/sanity/client';
import { MetaScript } from '@/components/MetaScript';
import { PropsWithChildren } from 'react';

export default async function MainLayout({ children }: PropsWithChildren) {
  const siteSettings = await getSiteSettingsData();

  return (
    <div className="min-h-screen bg-slate-50">
      <Header siteSettings={siteSettings} />
      <MetaScript />
      <main>{children}</main>
      <Footer siteSettings={siteSettings} />
    </div>
  );
}
