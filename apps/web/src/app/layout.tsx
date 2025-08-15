import type { Metadata } from 'next';
import { Bebas_Neue, Oswald, Nunito_Sans } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { GoogleTagManager, GoogleTagManagerNoscript } from '@/components/GoogleTagManager';
import LocalBusinessStructuredData from '@/components/LocalBusinessStructuredData';
import { getSiteSettingsData } from '@/lib/sanity/client';

const bebasNeue = Bebas_Neue({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-bebas-neue',
});

const oswald = Oswald({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-oswald',
});

const nunitoSans = Nunito_Sans({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-nunito-sans',
});

export async function generateMetadata(): Promise<Metadata> {
  const siteSettings = await getSiteSettingsData();

  return {
    title: siteSettings.seoDefaults.siteTitle,
    description: siteSettings.seoDefaults.siteDescription,
    keywords: siteSettings.seoDefaults.keywords?.join(', '),
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const siteSettings = await getSiteSettingsData();
  const gtmId = siteSettings.analytics?.gtmId || process.env.NEXT_PUBLIC_GTM_ID;

  return (
    <html lang="en">
      <head>
        {gtmId && <GoogleTagManager gtmId={gtmId} />}
        <LocalBusinessStructuredData siteSettings={siteSettings} />
      </head>
      <body className={`${bebasNeue.variable} ${oswald.variable} ${nunitoSans.variable}`}>
        {gtmId && <GoogleTagManagerNoscript gtmId={gtmId} />}
        <div className="min-h-screen bg-slate-50">
          <Header />
          <main>{children}</main>
          {siteSettings && <Footer siteSettings={siteSettings} />}
        </div>
      </body>
    </html>
  );
}
