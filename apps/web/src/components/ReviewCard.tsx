'use client';

import { useState } from 'react';
import Image from 'next/image';

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

interface ReviewCardProps {
  review: Review;
}

export default function ReviewCard({ review }: ReviewCardProps) {
  const [showFullText, setShowFullText] = useState(false);
  
  // Simple check if text is likely longer than 4 lines (rough estimation)
  const hasMore = review.comment.length > 200; // Approximate character count for 4 lines

  return (
    <div className="bg-white rounded-xl border-2 border-jlc-blue/20 p-6 hover:border-jlc-blue/40 transition-colors duration-300 shadow-sm">
      {/* Header with profile */}
      <div className="flex items-center gap-3 mb-4">
        <div className="relative w-12 h-12 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
          <Image
            src={review.reviewer.profilePhotoUrl}
            alt={review.reviewer.displayName}
            fill
            className="object-cover"
            unoptimized // Google profile images are external
          />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-medium text-slate-900 truncate">
            {review.reviewer.displayName}
          </h3>
          <p className="text-sm text-gray-500">{review.date}</p>
        </div>
      </div>

      {/* Star rating */}
      <div className="flex mb-4">
        {[...Array(5)].map((_, i) => (
          <svg
            key={i}
            className={`w-5 h-5 ${
              i < review.starRating ? 'text-yellow-400' : 'text-gray-300'
            } fill-current`}
            viewBox="0 0 24 24"
          >
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
        ))}
      </div>

      {/* Review text */}
      <div className="mb-4">
        <p className={`text-gray-700 leading-relaxed whitespace-pre-line ${
          !showFullText ? 'line-clamp-4' : ''
        }`}>
          {review.comment}
        </p>
        {hasMore && !showFullText && (
          <button
            onClick={() => setShowFullText(true)}
            className="text-jlc-blue hover:text-jlc-blue-dark font-medium text-sm mt-2 transition-colors duration-200"
          >
            Show more
          </button>
        )}
        {showFullText && hasMore && (
          <button
            onClick={() => setShowFullText(false)}
            className="text-jlc-blue hover:text-jlc-blue-dark font-medium text-sm mt-2 transition-colors duration-200"
          >
            Show less
          </button>
        )}
      </div>

      {/* Link to original review */}
      <div className="pt-4 border-t border-gray-100">
        <a
          href={review.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center text-sm text-jlc-blue hover:text-jlc-blue-dark font-medium transition-colors duration-200"
        >
          View on Google
          <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </a>
      </div>
    </div>
  );
}