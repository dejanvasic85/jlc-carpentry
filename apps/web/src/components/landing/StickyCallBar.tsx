'use client';

import { gtag } from '@/components/GoogleTagManager';

interface StickyCallBarProps {
  phone: string;
}

export default function StickyCallBar({ phone }: StickyCallBarProps) {
  const handlePhoneClick = () => {
    gtag.trackContact('phone');
    gtag.conversion('phone_call_click');
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-jlc-black border-t border-white/10 safe-area-pb">
      <div className="flex">
        <a
          href={`tel:${phone}`}
          onClick={handlePhoneClick}
          className="flex-1 flex items-center justify-center gap-2 py-4 bg-jlc-blue text-white font-bold text-base active:bg-jlc-blue-dark transition-colors"
          aria-label={`Call JLC Carpentry on ${phone}`}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
            />
          </svg>
          Call James Now
        </a>
        <a
          href="#quote-form"
          className="flex-1 flex items-center justify-center gap-2 py-4 bg-slate-800 text-white font-bold text-base active:bg-slate-700 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
          Get a Quote
        </a>
      </div>
    </div>
  );
}
