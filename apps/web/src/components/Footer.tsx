import Image from 'next/image';
import { type SiteSettings } from '@/lib/sanity/schemas';
import { urlFor } from '@/lib/sanity/image';

interface FooterProps {
  className?: string;
  siteSettings?: SiteSettings;
}

export default function Footer({ className = '', siteSettings }: FooterProps) {
  return (
    <footer className={`bg-slate-800 text-white py-16 ${className}`}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div className="md:col-span-2">
            <div className="flex items-center space-x-4 mb-6">
              {siteSettings?.company?.logo ? (
                <Image
                  src={urlFor(siteSettings.company.logo).width(60).height(60).url()}
                  alt={`${siteSettings.company.name} Logo`}
                  width={60}
                  height={60}
                  className="rounded-lg"
                />
              ) : (
                <Image src="/Business Logo 2.jpg" alt="JLC Logo" width={60} height={60} className="rounded-lg" />
              )}
              <div>
                <h3 className="font-heading text-2xl">{siteSettings?.company?.shortName || 'JLC CARPENTRY'}</h3>
                <p className="text-jlc-blue-light font-semibold">
                  {siteSettings?.company?.name || '& BUILDING SERVICES PTY LTD'}
                </p>
              </div>
            </div>
            <p className="text-gray-300 leading-relaxed mb-4">
              {siteSettings?.company?.shortDescription ||
                'Professional carpentry and building services throughout Melbourne, delivering exceptional quality and craftsmanship since 1995. Licensed, insured, and committed to excellence.'}
            </p>
            <div className="space-y-2">
              {siteSettings?.company?.abn && (
                <p className="text-gray-400">
                  <span className="text-jlc-blue-light font-semibold">ABN:</span> {siteSettings.company.abn}
                </p>
              )}
              {siteSettings?.licenses && siteSettings.licenses.length > 0 && (
                <p className="text-gray-400">
                  <span className="text-jlc-blue-light font-semibold">License:</span> {siteSettings.licenses[0].number}
                </p>
              )}
            </div>
          </div>

          <div>
            <h4 className="font-heading text-xl text-jlc-blue-light mb-4 uppercase">Location</h4>
            <div className="space-y-2">
              <p className="text-gray-300">Based in {siteSettings?.location?.address?.suburb || 'Alphington'}</p>
              <p className="text-gray-300">
                {siteSettings?.location?.serviceAreas && siteSettings.location.serviceAreas.length > 0
                  ? `Serving ${siteSettings.location.serviceAreas.join(', ')}`
                  : 'Serving all areas of Melbourne'}
              </p>
            </div>
          </div>

          <div>
            <h4 className="font-heading text-xl text-jlc-blue-light mb-4">CONNECT</h4>
            <div className="space-y-3">
              {siteSettings?.socialMedia?.googleBusinessLink && (
                <a
                  href={siteSettings.socialMedia.googleBusinessLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-white hover:text-jlc-blue-light transition-colors font-medium"
                >
                  📍 Google Business Profile
                </a>
              )}
              {siteSettings?.socialMedia?.instagram && (
                <a
                  href={`https://instagram.com/${siteSettings.socialMedia.instagram}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-white hover:text-jlc-blue-light transition-colors font-medium"
                >
                  📱 @{siteSettings.socialMedia.instagram}
                </a>
              )}
              {siteSettings?.socialMedia?.facebook && (
                <a
                  href={siteSettings.socialMedia.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-white hover:text-jlc-blue-light transition-colors font-medium"
                >
                  📘 Facebook Page
                </a>
              )}
            </div>
          </div>
        </div>

        <div className="border-t border-slate-700 pt-8 text-center">
          <p className="text-gray-400">
            © {new Date().getFullYear()} {siteSettings?.company?.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
