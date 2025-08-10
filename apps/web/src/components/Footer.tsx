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
            {siteSettings?.company && (
              <div className="flex items-center space-x-4 mb-6">
                {siteSettings.company.logo && (
                  <Image
                    src={urlFor(siteSettings.company.logo).width(60).height(60).url()}
                    alt={`${siteSettings.company.name} Logo`}
                    width={60}
                    height={60}
                    className="rounded-lg"
                  />
                )}
                <div>
                  {siteSettings.company.shortName && (
                    <h3 className="font-heading text-2xl">{siteSettings.company.shortName}</h3>
                  )}
                  {siteSettings.company.name && (
                    <p className="text-jlc-blue-light font-semibold">{siteSettings.company.name}</p>
                  )}
                </div>
              </div>
            )}
            {siteSettings?.company?.shortDescription && (
              <p className="text-gray-300 leading-relaxed mb-4">{siteSettings.company.shortDescription}</p>
            )}
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

          {siteSettings?.location &&
            (siteSettings.location.address?.suburb ||
              (siteSettings.location.serviceAreas && siteSettings.location.serviceAreas.length > 0)) && (
              <div>
                <h4 className="font-heading text-xl text-jlc-blue-light mb-4 uppercase">Location</h4>
                <div className="space-y-2">
                  {siteSettings.location.address?.suburb && (
                    <p className="text-gray-300">Based in {siteSettings.location.address.suburb}</p>
                  )}
                  {siteSettings.location.serviceAreas && siteSettings.location.serviceAreas.length > 0 && (
                    <p className="text-gray-300">Serving {siteSettings.location.serviceAreas.join(', ')}</p>
                  )}
                </div>
              </div>
            )}

          {siteSettings?.socialMedia &&
            (siteSettings.socialMedia.googleBusinessLink ||
              siteSettings.socialMedia.instagram ||
              siteSettings.socialMedia.facebook) && (
              <div>
                <h4 className="font-heading text-xl text-jlc-blue-light mb-4">CONNECT</h4>
                <div className="space-y-3">
                  {siteSettings?.socialMedia?.googleBusinessLink && (
                    <a
                      href={siteSettings.socialMedia.googleBusinessLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white hover:text-jlc-blue-light transition-colors font-medium flex gap-1 items-center"
                    >
                      <svg
                        role="img"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                        className="size-5 text-white"
                        fill="currentColor"
                      >
                        <title>Google Maps</title>
                        <path d="M19.527 4.799c1.212 2.608.937 5.678-.405 8.173-1.101 2.047-2.744 3.74-4.098 5.614-.619.858-1.244 1.75-1.669 2.727-.141.325-.263.658-.383.992-.121.333-.224.673-.34 1.008-.109.314-.236.684-.627.687h-.007c-.466-.001-.579-.53-.695-.887-.284-.874-.581-1.713-1.019-2.525-.51-.944-1.145-1.817-1.79-2.671L19.527 4.799zM8.545 7.705l-3.959 4.707c.724 1.54 1.821 2.863 2.871 4.18.247.31.494.622.737.936l4.984-5.925-.029.01c-1.741.601-3.691-.291-4.392-1.987a3.377 3.377 0 0 1-.209-.716c-.063-.437-.077-.761-.004-1.198l.001-.007zM5.492 3.149l-.003.004c-1.947 2.466-2.281 5.88-1.117 8.77l4.785-5.689-.058-.05-3.607-3.035zM14.661.436l-3.838 4.563a.295.295 0 0 1 .027-.01c1.6-.551 3.403.15 4.22 1.626.176.319.323.683.377 1.045.068.446.085.773.012 1.22l-.003.016 3.836-4.561A8.382 8.382 0 0 0 14.67.439l-.009-.003zM9.466 5.868L14.162.285l-.047-.012A8.31 8.31 0 0 0 11.986 0a8.439 8.439 0 0 0-6.169 2.766l-.016.018 3.665 3.084z" />
                      </svg>
                      Google Business Profile
                    </a>
                  )}
                  {siteSettings?.socialMedia?.instagram && (
                    <a
                      href={`https://instagram.com/${siteSettings.socialMedia.instagram}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white hover:text-jlc-blue-light transition-colors font-medium flex gap-1 items-center"
                    >
                      <svg
                        viewBox="0 0 24 24"
                        focusable="false"
                        role="img"
                        fill="currentColor"
                        className="size-5 text-white"
                      >
                        <title>Instagram</title>
                        <path d="M11.999 7.377a4.623 4.623 0 1 0 0 9.248 4.623 4.623 0 0 0 0-9.248zm0 7.627a3.004 3.004 0 1 1 0-6.008 3.004 3.004 0 0 1 0 6.008z"></path>
                        <circle cx="16.806" cy="7.207" r="1.078"></circle>
                        <path d="M20.533 6.111A4.605 4.605 0 0 0 17.9 3.479a6.606 6.606 0 0 0-2.186-.42c-.963-.042-1.268-.054-3.71-.054s-2.755 0-3.71.054a6.554 6.554 0 0 0-2.184.42 4.6 4.6 0 0 0-2.633 2.632 6.585 6.585 0 0 0-.419 2.186c-.043.962-.056 1.267-.056 3.71 0 2.442 0 2.753.056 3.71.015.748.156 1.486.419 2.187a4.61 4.61 0 0 0 2.634 2.632 6.584 6.584 0 0 0 2.185.45c.963.042 1.268.055 3.71.055s2.755 0 3.71-.055a6.615 6.615 0 0 0 2.186-.419 4.613 4.613 0 0 0 2.633-2.633c.263-.7.404-1.438.419-2.186.043-.962.056-1.267.056-3.71s0-2.753-.056-3.71a6.581 6.581 0 0 0-.421-2.217zm-1.218 9.532a5.043 5.043 0 0 1-.311 1.688 2.987 2.987 0 0 1-1.712 1.711 4.985 4.985 0 0 1-1.67.311c-.95.044-1.218.055-3.654.055-2.438 0-2.687 0-3.655-.055a4.96 4.96 0 0 1-1.669-.311 2.985 2.985 0 0 1-1.719-1.711 5.08 5.08 0 0 1-.311-1.669c-.043-.95-.053-1.218-.053-3.654 0-2.437 0-2.686.053-3.655a5.038 5.038 0 0 1 .311-1.687c.305-.789.93-1.41 1.719-1.712a5.01 5.01 0 0 1 1.669-.311c.951-.043 1.218-.055 3.655-.055s2.687 0 3.654.055a4.96 4.96 0 0 1 1.67.311 2.991 2.991 0 0 1 1.712 1.712 5.08 5.08 0 0 1 .311 1.669c.043.951.054 1.218.054 3.655 0 2.436 0 2.698-.043 3.654h-.011z"></path>
                      </svg>
                      Instagram page
                    </a>
                  )}
                  {siteSettings?.socialMedia?.facebook && (
                    <a
                      href={siteSettings.socialMedia.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      className=" text-white hover:text-jlc-blue-light transition-colors font-medium flex gap-1 items-center"
                    >
                      <svg
                        viewBox="0 0 448 512"
                        className="size-5"
                        focusable="false"
                        role="img"
                        fill="currentColor"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <title>Facebook</title>
                        <path
                          fill="currentColor"
                          d="M400 32H48A48 48 0 0 0 0 80v352a48 48 0 0 0 48 48h137.3V327.7h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.27c-30.81 0-40.42 19.12-40.42 38.73V256h68.78l-11 71.69H262.8V480H400a48 48 0 0 0 48-48V80a48 48 0 0 0-48-48z"
                        ></path>
                      </svg>{' '}
                      Facebook Page
                    </a>
                  )}
                </div>
              </div>
            )}
        </div>

        {siteSettings?.company?.name && (
          <div className="border-t border-slate-700 pt-8 text-center">
            <p className="text-gray-400">
              © {new Date().getFullYear()} {siteSettings.company.name}. All rights reserved.
            </p>
          </div>
        )}
      </div>
    </footer>
  );
}
