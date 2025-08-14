'use client';

import Script from 'next/script';

interface GoogleTagManagerProps {
  gtmId: string;
}

export function GoogleTagManager({ gtmId }: GoogleTagManagerProps) {
  if (!gtmId) {
    return null;
  }

  return (
    <>
      {/* Google Tag Manager - Head */}
      <Script
        id="gtm-script"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${gtmId}');
          `,
        }}
      />
    </>
  );
}

export function GoogleTagManagerNoscript({ gtmId }: GoogleTagManagerProps) {
  if (!gtmId) {
    return null;
  }

  return (
    <noscript>
      <iframe
        src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
        height="0"
        width="0"
        style={{ display: 'none', visibility: 'hidden' }}
      />
    </noscript>
  );
}

// Analytics utility functions for tracking custom events
export const gtag = {
  // Send custom events to GTM
  event: (action: string, parameters?: Record<string, any>) => {
    if (typeof window !== 'undefined' && (window as any).dataLayer) {
      (window as any).dataLayer.push({
        event: action,
        ...parameters,
      });
    }
  },

  // Track page views
  pageview: (url: string, title?: string) => {
    if (typeof window !== 'undefined' && (window as any).dataLayer) {
      (window as any).dataLayer.push({
        event: 'page_view',
        page_location: url,
        page_title: title || document.title,
      });
    }
  },

  // Track conversions (form submissions, calls, etc.)
  conversion: (eventName: string, value?: number, currency: string = 'AUD') => {
    if (typeof window !== 'undefined' && (window as any).dataLayer) {
      (window as any).dataLayer.push({
        event: 'conversion',
        event_name: eventName,
        value: value,
        currency: currency,
      });
    }
  },

  // Track custom carpentry-related events
  trackService: (serviceName: string, action: string = 'view') => {
    gtag.event('service_interaction', {
      service_name: serviceName,
      action: action,
      category: 'carpentry_services',
    });
  },

  trackContact: (method: string = 'form') => {
    gtag.event('contact_attempt', {
      contact_method: method,
      category: 'lead_generation',
    });
  },

  trackProjectView: (projectLocation: string) => {
    gtag.event('project_view', {
      project_location: projectLocation,
      category: 'portfolio_engagement',
    });
  },
};
