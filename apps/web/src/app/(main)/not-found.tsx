'use client';

import Link from 'next/link';
import Button from '@/components/Button';
import { useRouter } from 'next/navigation';

export default function NotFound() {
  const router = useRouter();

  const handleGoBack = () => {
    router.back();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-jlc-blue-dark via-jlc-blue-dark to-jlc-blue flex items-center justify-center relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent"></div>
      <div className="absolute top-20 right-20 w-64 h-64 bg-white/5 rounded-full blur-xl opacity-60"></div>
      <div className="absolute bottom-20 left-20 w-48 h-48 bg-jlc-blue-light/10 rounded-full blur-xl opacity-70"></div>

      {/* Floating tool icons */}
      <div className="absolute top-1/4 left-1/4 text-white/20 transform -rotate-12">
        <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 24 24">
          <path d="M13.5 2c-.178 0-.356.013-.534.039L12 3.5v17l.966-1.461c.178.026.356.039.534.039 3.59 0 6.5-2.91 6.5-6.5V8.5c0-3.59-2.91-6.5-6.5-6.5zM12 3.5l-.966-1.461C11.212 2.013 11.392 2 11.5 2c3.59 0 6.5 2.91 6.5 6.5v6.078c0 3.59-2.91 6.5-6.5 6.5-.178 0-.356-.013-.534-.039L12 20.5V3.5z" />
        </svg>
      </div>
      <div className="absolute top-1/3 right-1/3 text-white/20 transform rotate-45">
        <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
          <path d="M9 2l1.5 1.5L9 5H7v2H5V5H3l1.5-1.5L3 2h2V0h2v2h2zm6 0l1.5 1.5L15 5h-2v2h-2V5h-2l1.5-1.5L9 2h2V0h2v2h2zm-6 8l1.5 1.5L9 13H7v2H5v-2H3l1.5-1.5L3 10h2V8h2v2h2z" />
        </svg>
      </div>
      <div className="absolute bottom-1/3 left-1/2 text-white/20 transform -rotate-90">
        <svg className="w-20 h-20" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12.5 2L2 7.5v9L12.5 22 23 16.5v-9L12.5 2zm0 2.83L20.17 9.5H4.83L12.5 4.83zm-8.67 6.34L11 13.83v6.34L3.83 15.5v-6.33zm17.34 0v6.33L13 20.17v-6.34l7.17-4.66z" />
        </svg>
      </div>

      {/* Main content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        {/* 404 with saw blade design */}
        <div className="mb-8 relative">
          <div className="inline-block relative">
            <h1 className="font-display text-8xl md:text-9xl lg:text-[12rem] font-bold text-white/90 leading-none">
              4
            </h1>
            {/* Saw blade as the "0" */}
            <div className="inline-block mx-4 relative">
              <svg
                className="w-20 h-20 md:w-24 md:h-24 lg:w-32 lg:h-32 text-jlc-blue-light animate-spin-slow"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 2L13.09 8.26L22 7L20.74 8.74L19.91 16.09L16.09 19.91L8.74 20.74L7 22L8.26 13.09L2 12L8.26 10.91L7 2L8.74 3.26L16.09 4.09L19.91 7.91L20.74 15.26L22 17L13.09 15.74L12 22L10.91 15.74L2 17L3.26 15.26L4.09 7.91L7.91 4.09L15.26 3.26L17 2L15.74 10.91L22 12L15.74 13.09L17 22L15.26 20.74L7.91 19.91L4.09 16.09L3.26 8.74L2 7L10.91 8.26L12 2Z" />
              </svg>
              <div className="absolute inset-0 bg-gradient-to-br from-jlc-blue-light/20 to-transparent rounded-full blur-sm"></div>
            </div>
            <h1 className="font-display text-8xl md:text-9xl lg:text-[12rem] font-bold text-white/90 leading-none">
              4
            </h1>
          </div>
        </div>

        {/* Main message */}
        <div className="mb-8">
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl mb-4 text-white font-bold">
            {`Looks like this page didn't make the cut.`}
          </h2>
          <p className="text-xl md:text-2xl text-jlc-blue-light/90 mb-6 font-light">
            {`We've hammered through our site, but this page seems to have been misplaced.`}
          </p>
          <p className="text-lg text-white/80 max-w-2xl mx-auto">
            {`Don't worry though - our craftsmanship is much better than our navigation! Let's get you back to the right
            place.`}
          </p>
        </div>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
          <Link href="/">
            <Button variant="primary" size="lg">
              Back to Home
            </Button>
          </Link>
          <Button variant="outline" size="lg" onClick={handleGoBack}>
            Go Back
          </Button>
        </div>

        {/* Carpentry puns */}
        <div className="bg-black/20 backdrop-blur-md rounded-2xl p-6 border border-white/10 max-w-2xl mx-auto mb-10">
          <h3 className="text-lg font-semibold text-jlc-blue-light mb-4">
            {`While you're here, enjoy some quality carpentry humor:`}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-white/80">
            <p>{`"This error really nailed it!"`}</p>
            <p>{`"We're sawry for the inconvenience."`}</p>
            <p>{`"Don't get board, we'll fix this!"`}</p>
            <p>{`"We wood never do this on purpose."`}</p>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
      `}</style>
    </div>
  );
}
