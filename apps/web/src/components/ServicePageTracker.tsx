'use client';

import { useEffect } from 'react';
import { gtag } from '@/components/GoogleTagManager';

interface ServicePageTrackerProps {
  serviceName: string;
}

export default function ServicePageTracker({ serviceName }: ServicePageTrackerProps) {
  useEffect(() => {
    // Track service page view
    gtag.trackService(serviceName, 'view');

    // Also track as a standard page view
    gtag.pageview(window.location.href, `${serviceName} Service Page`);
  }, [serviceName]);

  return null; // This component doesn't render anything
}
