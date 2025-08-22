import { googleReviews } from 'reviews';

interface Review {
  id: string;
  url: string;
  reviewer: {
    profileUrl: string;
    profilePhotoUrl: string;
    displayName: string;
  };
  comment: string;
  starRating: number;
  date: string;
}

/**
 * Simple hash function to create consistent assignment
 */
function simpleHash(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  return Math.abs(hash);
}

/**
 * Get a review for a specific service page
 * Ensures consistent assignment and no duplicates across services
 */
export function getServiceReview(serviceName: string): Review | null {
  console.log('🔍 getServiceReview called with serviceName:', serviceName);
  console.log('📊 Total reviews available:', googleReviews.reviews.length);
  
  if (!googleReviews.reviews || googleReviews.reviews.length === 0) {
    console.warn('⚠️ No reviews available in googleReviews.reviews');
    return null;
  }

  // Predefined service slugs that should match your actual service pages
  const services = [
    'deck-construction',
    'pergola-installation', 
    'wall-construction',
    'door-installation',
    'cladding-services',
    'general-renovations',
    'bathroom-renovations',
    'kitchen-renovations'
  ];

  console.log('📋 Available services:', services);

  // Find the index of the current service
  const serviceIndex = services.indexOf(serviceName);
  console.log('📍 Service index for', serviceName, ':', serviceIndex);

  if (serviceIndex === -1) {
    console.warn('⚠️ Service not found in predefined list:', serviceName);
    // Fallback: use hash-based selection for unknown services
    const fallbackIndex = simpleHash(serviceName) % googleReviews.reviews.length;
    console.log('🔄 Using fallback index:', fallbackIndex);
    return googleReviews.reviews[fallbackIndex];
  }

  // Create a consistent but "shuffled" order using hash
  const shuffledReviews = [...googleReviews.reviews].sort((a, b) => {
    const hashA = simpleHash(a.id + 'shuffle-seed');
    const hashB = simpleHash(b.id + 'shuffle-seed');
    return hashA - hashB;
  });

  console.log('🔀 Shuffled reviews order (first 3 IDs):', shuffledReviews.slice(0, 3).map(r => r.id));

  // Get the review for this service index, cycling through if needed
  const reviewIndex = serviceIndex % shuffledReviews.length;
  const selectedReview = shuffledReviews[reviewIndex];

  console.log('✅ Selected review for', serviceName, ':', {
    id: selectedReview.id,
    author: selectedReview.reviewer.displayName,
    starRating: selectedReview.starRating,
    commentLength: selectedReview.comment.length
  });

  return selectedReview;
}

/**
 * Get all service review assignments (for debugging)
 */
export function getAllServiceReviews(): Record<string, Review | null> {
  const services = [
    'deck-construction',
    'pergola-installation', 
    'wall-construction',
    'door-installation',
    'cladding-services',
    'general-renovations',
    'bathroom-renovations',
    'kitchen-renovations'
  ];

  const assignments: Record<string, Review | null> = {};
  
  services.forEach(service => {
    assignments[service] = getServiceReview(service);
  });

  return assignments;
}

/**
 * Validate that no reviews are duplicated across services
 */
export function validateReviewDistribution(): { isValid: boolean; duplicates: string[] } {
  const assignments = getAllServiceReviews();
  const reviewIds = Object.values(assignments)
    .filter((review): review is Review => review !== null)
    .map(review => review.id);
  
  const uniqueIds = new Set(reviewIds);
  const isValid = reviewIds.length === uniqueIds.size;
  
  const duplicates: string[] = [];
  if (!isValid) {
    const seen = new Set<string>();
    reviewIds.forEach(id => {
      if (seen.has(id)) {
        duplicates.push(id);
      }
      seen.add(id);
    });
  }

  console.log('🔍 Distribution validation:', { isValid, duplicates, totalAssignments: reviewIds.length });
  
  return { isValid, duplicates };
}