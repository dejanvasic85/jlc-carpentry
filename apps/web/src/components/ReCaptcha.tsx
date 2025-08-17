'use client';

import Script from 'next/script';

interface ReCaptchaProps {
  siteKey: string;
}

export function ReCaptchaScript({ siteKey }: ReCaptchaProps) {
  return (
    <Script
      src={`https://www.google.com/recaptcha/enterprise.js?render=${siteKey}`}
      strategy="lazyOnload"
    />
  );
}

export function executeReCaptcha(action: string, siteKey?: string): Promise<string> {
  return new Promise((resolve, reject) => {
    if (!window.grecaptcha?.enterprise) {
      reject(new Error('reCAPTCHA not loaded'));
      return;
    }

    const key = siteKey || process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
    if (!key) {
      reject(new Error('reCAPTCHA site key not configured'));
      return;
    }

    window.grecaptcha!.enterprise.ready(async () => {
      try {
        const token = await window.grecaptcha!.enterprise.execute(key, { action });
        resolve(token);
      } catch (error) {
        reject(error);
      }
    });
  });
}

declare global {
  interface Window {
    grecaptcha?: {
      enterprise: {
        ready: (callback: () => void) => void;
        execute: (siteKey: string, options: { action: string }) => Promise<string>;
      };
    };
  }
}