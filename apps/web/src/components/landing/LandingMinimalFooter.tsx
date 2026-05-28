interface LandingMinimalFooterProps {
  phone?: string | null;
  email?: string | null;
  abn?: string | null;
  licenseNumber?: string | null;
  companyName: string;
}

export default function LandingMinimalFooter({
  phone,
  email,
  abn,
  licenseNumber,
  companyName,
}: LandingMinimalFooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-jlc-black text-white py-8 pb-24 md:pb-8">
      <div className="max-w-5xl mx-auto px-6">
        <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-3 sm:gap-6 text-sm text-gray-400 mb-4">
          {phone && (
            <a href={`tel:${phone}`} className="hover:text-white transition-colors font-medium text-white">
              {phone}
            </a>
          )}
          {email && (
            <a href={`mailto:${email}`} className="hover:text-white transition-colors">
              {email}
            </a>
          )}
          {abn && (
            <span>
              ABN: <span className="text-gray-300">{abn}</span>
            </span>
          )}
          {licenseNumber && (
            <span>
              License: <span className="text-gray-300">{licenseNumber}</span>
            </span>
          )}
        </div>
        <p className="text-center text-gray-500 text-xs">
          &copy; {currentYear} {companyName}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
