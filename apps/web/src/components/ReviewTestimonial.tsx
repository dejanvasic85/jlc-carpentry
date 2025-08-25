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

interface ReviewTestimonialProps {
  review: Review;
}

export default function ReviewTestimonial({ review }: ReviewTestimonialProps) {
  return (
    <section className="py-16 bg-jlc-blue-light/10">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h2 className="text-xl font-semibold text-jlc-black mb-8 uppercase tracking-wide">What our customers say</h2>

        {/* Star rating */}
        <div className="flex justify-center mb-6">
          {[...Array(5)].map((_, i) => (
            <svg
              key={i}
              className={`w-6 h-6 ${i < review.starRating ? 'text-yellow-400' : 'text-gray-300'} fill-current`}
              viewBox="0 0 24 24"
            >
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
          ))}
        </div>

        <blockquote className="text-2xl md:text-3xl font-light text-jlc-black mb-6 italic leading-relaxed">
          &quot;{review.comment}&quot;
        </blockquote>

        <cite className="text-lg text-gray-600 font-semibold">— {review.reviewer.displayName}</cite>

        <div className="mt-4">
          <a
            href={review.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-sm text-jlc-blue hover:text-jlc-blue-dark font-medium transition-colors duration-200"
          >
            View review on Google
            <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
