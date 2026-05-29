import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { getSiteSettingsData } from '@/lib/sanity/client';
import ContactFormBody from '@/components/ContactFormBody';
import TrustBadges from '@/components/landing/TrustBadges';
import ServiceAreaList from '@/components/landing/ServiceAreaList';
import LandingMinimalFooter from '@/components/landing/LandingMinimalFooter';
import PhoneCallLink from '@/components/landing/PhoneCallLink';

export const metadata: Metadata = {
  title: 'Get a Free Quote | JLC Carpentry & Building Services Melbourne',
  description:
    'Melbourne carpenter. Custom decks, pergolas, kitchen and bathroom renovations. 5-star Google rated. 7-year structural warranty. Free quotes with no obligation.',
  openGraph: {
    title: 'Get a Free Quote | JLC Carpentry & Building Services Melbourne',
    description:
      'Melbourne carpenter. Custom decks, pergolas, kitchen and bathroom renovations. 5-star Google rated. 7-year structural warranty.',
    type: 'website',
    locale: 'en_AU',
    siteName: 'JLC Carpentry & Building Services',
  },
  robots: {
    index: true,
    follow: true,
  },
};

const serviceSnapshots = [
  {
    name: 'Decks & Pergolas',
    description: 'Custom-built outdoor living spaces designed to last.',
    icon: (
      <svg className="w-6 h-6 text-jlc-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"
        />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
  },
  {
    name: 'Kitchen Renovations',
    description: 'Full kitchen remodels from layout planning to final fit-out.',
    icon: (
      <svg className="w-6 h-6 text-jlc-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
        />
      </svg>
    ),
  },
  {
    name: 'Bathroom Renovations',
    description: 'Complete bathroom transformations, waterproofing included.',
    icon: (
      <svg className="w-6 h-6 text-jlc-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
        />
      </svg>
    ),
  },
  {
    name: 'Walls & Cladding',
    description: 'Feature walls, external cladding, and structural framing.',
    icon: (
      <svg className="w-6 h-6 text-jlc-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
      </svg>
    ),
  },
  {
    name: 'Doors & Windows',
    description: 'Supply and install of doors, windows, and frames.',
    icon: (
      <svg className="w-6 h-6 text-jlc-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z"
        />
      </svg>
    ),
  },
  {
    name: 'General Renovations',
    description: 'Whole-home and commercial renovation projects of any scope.',
    icon: (
      <svg className="w-6 h-6 text-jlc-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z"
        />
      </svg>
    ),
  },
] as const;

const googleReviews = [
  {
    name: 'Sarah M.',
    date: 'March 2025',
    rating: 5,
    text: 'James and his team built us an incredible deck at the back of our home. The quality of the work is outstanding and it was completed on time and within budget. Highly recommend!',
    initials: 'SM',
  },
  {
    name: 'David K.',
    date: 'February 2025',
    rating: 5,
    text: 'We had our kitchen completely renovated by JLC. From the initial consultation through to the final touches, the whole process was smooth and professional. The result exceeded our expectations.',
    initials: 'DK',
  },
  {
    name: 'Melissa T.',
    date: 'January 2025',
    rating: 5,
    text: 'Fantastic work on our bathroom renovation. James was honest, reliable, and the standard of craftsmanship was excellent. We have already referred him to our neighbours.',
    initials: 'MT',
  },
  {
    name: 'Rob & Julie F.',
    date: 'December 2024',
    rating: 5,
    text: 'JLC built a pergola and entertainment area for us. The attention to detail was impressive and the structure is rock solid. Will absolutely use them again for future projects.',
    initials: 'RF',
  },
] as const;

const trustStats = [
  { value: '30+', label: 'Projects Completed' },
  { value: '5-Star', label: 'Google Rated' },
  { value: '7-Year', label: 'Structural Warranty' },
] as const;

export default async function FreeQuotePage() {
  const siteSettings = await getSiteSettingsData();
  const phone = siteSettings.contact?.phone ?? '';
  const email = siteSettings.contact?.email ?? '';
  const abn = siteSettings.company?.abn ?? '';
  const companyName = siteSettings.company?.name ?? 'JLC Carpentry & Building Services';
  const licenseNumber = siteSettings.licenses?.[0]?.number ?? '';

  return (
    <>
      {/* ── HERO ──────────────────────────────────────── */}
      <section className="relative bg-gradient-to-br from-jlc-black via-slate-800 to-slate-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-jlc-black/80 to-transparent z-10" aria-hidden="true" />
        <div className="absolute inset-0">
          <Image
            src="/hero.webp"
            alt="JLC Carpentry quality workmanship"
            fill
            className="object-cover opacity-30"
            priority
            sizes="100vw"
          />
        </div>

        <div className="relative z-20 max-w-5xl mx-auto px-6 pt-14 pb-10">
          <div className="max-w-2xl mx-auto text-center">
            <p className="text-jlc-blue font-semibold text-sm uppercase tracking-widest mb-3">
              Melbourne&apos;s Trusted Carpenter
            </p>
            <h1 className="font-display text-5xl sm:text-6xl md:text-7xl leading-none mb-4">
              MELBOURNE CARPENTER.
            </h1>
            <p className="text-xl sm:text-2xl font-light text-white/90 mb-3">
              Quality workmanship backed by a 7-year structural warranty.
            </p>
            <p className="text-base sm:text-lg text-white/75 mb-8">
              Custom decks, pergolas, kitchen and bathroom renovations across Melbourne.
            </p>

            <TrustBadges />

            <div className="flex flex-col sm:flex-row gap-3 mt-8 justify-center">
              <a
                href="#quote-form"
                className="flex items-center justify-center gap-2 bg-jlc-blue hover:bg-jlc-blue-dark text-white font-bold text-base px-8 py-4 rounded-lg transition-colors shadow-lg"
              >
                Get Your Free Quote
              </a>
              {phone && <PhoneCallLink phone={phone} />}
            </div>
          </div>
        </div>
      </section>

      {/* ── INLINE QUOTE FORM ─────────────────────────── */}
      <section id="quote-form" className="py-14 bg-slate-50" aria-labelledby="quote-form-heading" tabIndex={-1}>
        <div className="max-w-2xl mx-auto px-6">
          <div className="text-center mb-8">
            <h2 id="quote-form-heading" className="font-heading text-3xl md:text-4xl text-slate-900 mb-2">
              Request Your Free Quote
            </h2>
            <p className="text-slate-600">Tell us about your project and we will get back to you within 24 hours.</p>
          </div>

          <div className="bg-white rounded-2xl shadow-md border border-slate-100 p-6 sm:p-8">
            <ContactFormBody
              submitLabel="Request My Free Quote"
              formName="landing_page_quote"
              showServiceDropdown={true}
            />
            <p className="text-center text-slate-500 text-sm mt-4">
              We will get back to you within 24 hours. No obligation.
            </p>
          </div>
        </div>
      </section>

      {/* ── SERVICES SNAPSHOT ─────────────────────────── */}
      <section className="py-16 bg-white" aria-labelledby="services-heading">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-10">
            <h2 id="services-heading" className="font-heading text-3xl md:text-4xl text-slate-900 mb-3">
              What We Build
            </h2>
            <p className="text-slate-600 max-w-xl mx-auto">
              From a simple door replacement to a full home renovation, we do quality work across the board.
            </p>
          </div>

          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4" role="list">
            {serviceSnapshots.map((service) => (
              <li
                key={service.name}
                className="flex items-start gap-4 p-5 bg-slate-50 rounded-xl border border-slate-100"
              >
                <div className="flex-shrink-0 w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                  {service.icon}
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 mb-1">{service.name}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{service.description}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── WHY JLC ───────────────────────────────────── */}
      <section className="py-16 bg-slate-50" aria-labelledby="why-jlc-heading">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-10">
            <h2 id="why-jlc-heading" className="font-heading text-3xl md:text-4xl text-slate-900 mb-3">
              Why Homeowners Choose JLC
            </h2>
          </div>

          {/* Stats row */}
          <ul className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12" role="list" aria-label="Company credentials">
            {trustStats.map((stat) => (
              <li key={stat.label} className="text-center bg-white rounded-xl p-5 shadow-xs border border-slate-100">
                <p className="font-display text-4xl text-jlc-blue mb-1">{stat.value}</p>
                <p className="text-sm font-semibold text-slate-700">{stat.label}</p>
              </li>
            ))}
          </ul>

          {/* Google reviews */}
          <h3 className="font-heading text-xl text-slate-700 text-center mb-6 uppercase tracking-wide">
            What Our Clients Say
          </h3>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-5" role="list">
            {googleReviews.map((review) => (
              <li key={review.name} className="bg-white rounded-xl p-6 shadow-xs border border-slate-100">
                <div className="flex items-center gap-3 mb-3">
                  <div
                    className="w-10 h-10 rounded-full bg-jlc-blue flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
                    aria-hidden="true"
                  >
                    {review.initials}
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900 text-sm">{review.name}</p>
                    <p className="text-xs text-slate-500">{review.date}</p>
                  </div>
                  <div className="ml-auto flex gap-0.5" role="img" aria-label={`${review.rating} out of 5 stars`}>
                    {Array.from({ length: review.rating }).map((_, i) => (
                      <svg
                        key={i}
                        className="w-4 h-4 text-yellow-400 fill-current"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                    ))}
                  </div>
                </div>
                <p className="text-slate-700 text-sm leading-relaxed">{review.text}</p>
              </li>
            ))}
          </ul>

          <div className="text-center mt-8">
            <Link
              href="https://g.co/kgs/ZxMwn9o"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-jlc-blue-dark font-semibold text-sm hover:underline"
            >
              Read all our Google reviews
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* ── SERVICE AREAS ─────────────────────────────── */}
      <ServiceAreaList />

      {/* ── FINAL CTA ─────────────────────────────────── */}
      <section className="py-16 bg-jlc-black text-white" aria-labelledby="final-cta-heading">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 id="final-cta-heading" className="font-heading text-3xl md:text-4xl mb-4">
            Ready to Start Your Project?
          </h2>
          <p className="text-white/80 text-lg mb-8">
            Call James directly or fill out the form above. Free quote, no obligation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#quote-form"
              className="flex items-center justify-center gap-2 bg-jlc-blue hover:bg-jlc-blue-dark text-white font-bold text-base px-8 py-4 rounded-lg transition-colors"
            >
              Fill Out the Form
            </a>
            {phone && <PhoneCallLink phone={phone} variant="outline" />}
          </div>
        </div>
      </section>

      {/* ── MINIMAL FOOTER ────────────────────────────── */}
      <LandingMinimalFooter
        phone={phone}
        email={email}
        abn={abn}
        licenseNumber={licenseNumber}
        companyName={companyName}
      />
    </>
  );
}
