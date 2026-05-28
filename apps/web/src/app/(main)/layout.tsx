import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { getSiteSettingsData } from '@/lib/sanity/client';

export default async function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const siteSettings = await getSiteSettingsData();

  return (
    <div className="min-h-screen bg-slate-50">
      <Header siteSettings={siteSettings} />
      <main>{children}</main>
      <Footer siteSettings={siteSettings} />
    </div>
  );
}
