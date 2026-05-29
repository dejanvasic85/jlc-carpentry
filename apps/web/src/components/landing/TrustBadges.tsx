interface TrustBadge {
  icon: React.ReactNode;
  label: string;
}

const badges: TrustBadge[] = [
  {
    icon: (
      <svg className="w-6 h-6 text-yellow-400 fill-current" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
    ),
    label: '5-Star Google Rated',
  },
  {
    icon: (
      <svg className="w-6 h-6 text-jlc-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
        />
      </svg>
    ),
    label: '7-Year Structural Warranty',
  },
  {
    icon: (
      <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
    label: 'Free Quotes',
  },
  {
    icon: (
      <svg className="w-6 h-6 text-jlc-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9"
        />
      </svg>
    ),
    label: 'Fully Insured',
  },
];

export default function TrustBadges() {
  return (
    <div className="grid grid-cols-2 justify-items-center gap-3 sm:gap-4" role="list" aria-label="Trust credentials">
      {badges.map((badge) => (
        <div
          key={badge.label}
          role="listitem"
          className="flex items-center gap-2 bg-white/90 backdrop-blur-sm rounded-full px-3 py-2 shadow-sm border border-slate-100"
        >
          {badge.icon}
          <span className="text-xs sm:text-sm font-semibold text-slate-800 whitespace-nowrap">{badge.label}</span>
        </div>
      ))}
    </div>
  );
}
