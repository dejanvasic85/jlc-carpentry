'use client';

import { gtag } from '@/components/GoogleTagManager';

interface PhoneCallLinkProps {
  phone: string;
  variant?: 'solid' | 'outline';
}

export default function PhoneCallLink({ phone, variant = 'solid' }: PhoneCallLinkProps) {
  const handleClick = () => {
    gtag.trackContact('phone');
    gtag.conversion('phone_call_click');
  };

  const solidClasses =
    'flex items-center justify-center gap-2 bg-white hover:bg-slate-100 text-slate-900 font-bold text-base px-8 py-4 rounded-lg transition-colors shadow-lg';
  const outlineClasses =
    'flex items-center justify-center gap-2 border-2 border-white hover:bg-white/10 text-white font-bold text-base px-8 py-4 rounded-lg transition-colors';

  return (
    <a
      href={`tel:${phone}`}
      onClick={handleClick}
      className={variant === 'outline' ? outlineClasses : solidClasses}
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
      Call {phone}
    </a>
  );
}
