import Image from 'next/image';

interface FooterProps {
  className?: string;
}

export default function Footer({ className = '' }: FooterProps) {
  return (
    <footer className={`bg-slate-800 text-white py-16 ${className}`}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div className="md:col-span-2">
            <div className="flex items-center space-x-4 mb-6">
              <Image src="/Business Logo 2.jpg" alt="JLC Logo" width={60} height={60} className="rounded-lg" />
              <div>
                <h3 className="font-heading text-2xl">JLC CARPENTRY</h3>
                <p className="text-blue-300 font-semibold">& BUILDING SERVICES PTY LTD</p>
              </div>
            </div>
            <p className="text-gray-300 leading-relaxed mb-4">
              Professional carpentry and building services throughout Melbourne, delivering exceptional quality and
              craftsmanship since 1995. Licensed, insured, and committed to excellence.
            </p>
            <div className="space-y-2">
              <p className="text-gray-400">
                <span className="text-blue-300 font-semibold">ABN:</span> [Company ABN]
              </p>
              <p className="text-gray-400">
                <span className="text-blue-300 font-semibold">License:</span> [Builder License]
              </p>
            </div>
          </div>

          <div>
            <h4 className="font-heading text-xl text-blue-300 mb-4">LOCATION</h4>
            <div className="space-y-2">
              <p className="text-gray-300">Based in Alphington</p>
              <p className="text-gray-300">Serving all areas of Melbourne</p>
              <p className="text-blue-300 font-semibold">24/7 Emergency Services</p>
            </div>
          </div>

          <div>
            <h4 className="font-heading text-xl text-blue-300 mb-4">CONNECT</h4>
            <div className="space-y-3">
              <a
                href="https://g.co/kgs/ZxMwn9o"
                className="block text-white hover:text-blue-300 transition-colors font-medium"
              >
                📍 Google Business Profile
              </a>
              <a href="#" className="block text-white hover:text-blue-300 transition-colors font-medium">
                📱 @Jlcbuilding
              </a>
              <a href="#" className="block text-white hover:text-blue-300 transition-colors font-medium">
                📘 Facebook Page
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-700 pt-8 text-center">
          <p className="text-gray-400">© 2024 JLC Carpentry & Building Services Pty Ltd. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
