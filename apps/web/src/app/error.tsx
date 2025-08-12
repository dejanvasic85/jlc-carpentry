'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import Button from '@/components/Button';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  const getErrorMessage = () => {
    if (error.message.includes('NEXT_REDIRECT')) {
      return "Looks like we're redirecting you somewhere that doesn't exist!";
    }
    if (error.message.includes('fetch')) {
      return 'Our tools are having trouble connecting to the workshop.';
    }
    return 'Something went wrong in our workshop.';
  };

  const getErrorPun = () => {
    const puns = [
      'This error really screwed things up!',
      'Looks like we hit a snag in our plans.',
      'Our blueprints seem to have a bug in them.',
      "We've encountered a rough patch!",
    ];
    return puns[Math.floor(Math.random() * puns.length)];
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
          <path d="M21.71 8.71c1.25-1.25.68-2.71 0-3.42L17.29 1.87c-.71-.71-2.17-1.25-3.42 0L12 3.74l1.29 1.29c.72.72.72 1.87 0 2.59-.72.72-1.87.72-2.59 0L9.41 6.33 2 13.74v8.24h8.24l7.41-7.41-1.29-1.29c-.72-.72-.72-1.87 0-2.59.72-.72 1.87-.72 2.59 0l1.29 1.29-.53.53z" />
        </svg>
      </div>
      <div className="absolute top-1/3 right-1/3 text-white/20 transform rotate-45">
        <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2L13.5 5.5L17 4L15.5 7.5L19 9L15.5 10.5L17 14L13.5 12.5L12 16L10.5 12.5L7 14L8.5 10.5L5 9L8.5 7.5L7 4L10.5 5.5L12 2Z" />
        </svg>
      </div>
      <div className="absolute bottom-1/3 left-1/2 text-white/20 transform -rotate-90">
        <svg className="w-20 h-20" fill="currentColor" viewBox="0 0 24 24">
          <path d="M7 4V2C7 1.45 7.45 1 8 1H9C9.55 1 10 1.45 10 2V4H14V2C14 1.45 14.45 1 15 1H16C16.55 1 17 1.45 17 2V4H19C20.11 4 21 4.89 21 6V8H3V6C3 4.89 3.89 4 5 4H7M3 19C3 20.11 3.89 21 5 21H19C20.11 21 21 20.11 21 19V10H3V19Z" />
        </svg>
      </div>

      {/* Main content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        {/* Error symbol with wrench/tools */}
        <div className="mb-8 relative">
          <div className="inline-block relative">
            {/* Warning triangle with exclamation */}
            <div className="relative">
              <svg
                className="w-32 h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 text-yellow-400 mb-4 mx-auto animate-pulse-slow"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z" />
              </svg>

              {/* Crossed tools behind the warning */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 -z-10">
                <svg
                  className="w-24 h-24 md:w-32 md:h-32 text-white/30 transform rotate-45"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M21.71 8.71c1.25-1.25.68-2.71 0-3.42L17.29 1.87c-.71-.71-2.17-1.25-3.42 0L12 3.74l1.29 1.29c.72.72.72 1.87 0 2.59-.72.72-1.87.72-2.59 0L9.41 6.33 2 13.74v8.24h8.24l7.41-7.41-1.29-1.29c-.72-.72-.72-1.87 0-2.59.72-.72 1.87-.72 2.59 0l1.29 1.29-.53.53z" />
                </svg>
                <svg
                  className="w-24 h-24 md:w-32 md:h-32 text-white/30 transform -rotate-45 absolute top-0 left-0"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M9 2l1.5 1.5L9 5H7v2H5V5H3l1.5-1.5L3 2h2V0h2v2h2z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Main message */}
        <div className="mb-8">
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl mb-4 text-white font-bold">
            Oops! We hit a snag in our workshop.
          </h2>
          <p className="text-xl md:text-2xl text-jlc-blue-light/90 mb-6 font-light">{getErrorMessage()}</p>
          <p className="text-lg text-white/80 max-w-2xl mx-auto">
            {`Don't worry - even the best craftsmen encounter unexpected challenges. Let's get you back on track!`}
          </p>
        </div>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
          <Button variant="primary" size="lg" onClick={reset}>
            Try Again
          </Button>
          <Link href="/">
            <Button variant="outline" size="lg">
              Back to Home
            </Button>
          </Link>
        </div>

        {/* Error details for developers (in development mode) */}
        {process.env.NODE_ENV === 'development' && (
          <div className="bg-black/30 backdrop-blur-md rounded-2xl p-6 border border-red-500/30 max-w-2xl mx-auto mb-8">
            <h3 className="text-lg font-semibold text-red-400 mb-4">Development Error Details:</h3>
            <div className="text-left text-sm text-white/80 font-mono bg-black/40 p-4 rounded-lg overflow-auto">
              <p className="text-red-300 mb-2">
                {error.name}: {error.message}
              </p>
              {error.digest && <p className="text-yellow-300">Error ID: {error.digest}</p>}
            </div>
          </div>
        )}

        {/* Carpentry humor */}
        <div className="bg-black/20 backdrop-blur-md rounded-2xl p-6 border border-white/10 max-w-2xl mx-auto mb-10">
          <h3 className="text-lg font-semibold text-jlc-blue-light mb-4">
            {`While we fix this, here's some workshop wisdom:`}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-white/80">
            <p>{getErrorPun()}</p>
            <p>{`"Measure twice, code once!"`}</p>
            <p>{`"Every error is just practice in disguise."`}</p>
            <p>{`"We'll nail this fix!"`}</p>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes pulse-slow {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }
        .animate-pulse-slow {
          animation: pulse-slow 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
