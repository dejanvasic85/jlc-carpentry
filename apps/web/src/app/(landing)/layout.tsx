import Image from 'next/image';
import Link from 'next/link';
import { getSiteSettingsData } from '@/lib/sanity/client';
import StickyCallBar from '@/components/landing/StickyCallBar';
import { ReCaptchaScript } from '@/components/ReCaptcha';
import { getConfig } from '@/lib/config';
import { MetaScript } from '@/components/MetaScript';
import { PropsWithChildren } from 'react';

export default async function LandingLayout({ children }: PropsWithChildren) {
  const [siteSettings, config] = await Promise.all([getSiteSettingsData(), Promise.resolve(getConfig())]);
  const phone = siteSettings.contact?.phone ?? '';

  return (
    <div className="min-h-screen bg-white">
      {config.recaptchaSiteKey && <ReCaptchaScript siteKey={config.recaptchaSiteKey} />}
      <MetaScript />
      {/* Minimal sticky header: logo + tap-to-call only */}
      <header className="sticky top-0 z-40 bg-jlc-black text-white shadow-md">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 hover:opacity-90 transition-opacity">
            <Image
              src="/Business Logo 1.jpg"
              alt="JLC Carpentry & Building Services Logo"
              width={36}
              height={36}
              className="rounded-md"
            />
            <span className="font-heading text-sm sm:text-base leading-tight">
              JLC CARPENTRY &amp; BUILDING SERVICES
            </span>
          </Link>

          {phone && (
            <a
              href={`tel:${phone}`}
              className="hidden sm:flex items-center gap-2 bg-jlc-blue hover:bg-jlc-blue-dark transition-colors text-white font-bold text-sm px-4 py-2 rounded-lg"
              aria-label={`Call us on ${phone}`}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
              {phone}
            </a>
          )}
        </div>
      </header>

      <main>{children}</main>

      {phone && <StickyCallBar phone={phone} />}
    </div>
  );
}
