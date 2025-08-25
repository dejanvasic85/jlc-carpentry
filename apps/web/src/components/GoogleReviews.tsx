import { googleReviews } from 'reviews';
import ReviewCard from '@/components/ReviewCard';

export default function GoogleReviews() {
  const latestReviews = googleReviews.reviews.slice(0, 9);

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="font-heading text-3xl md:text-4xl mb-4 tracking-tight uppercase text-slate-900">
            What our <span className="text-jlc-blue-dark">customers say</span>
          </h2>
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="text-2xl font-bold text-slate-900">{googleReviews.overallRatingValue}</span>
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className="w-6 h-6 text-yellow-400 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              ))}
            </div>
            <span className="text-gray-600">({googleReviews.numberOfReviews})</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {latestReviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>

        <div className="text-center mt-12">
          <a
            href="https://g.co/kgs/ZxMwn9o"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-6 py-3 bg-jlc-blue text-white font-medium rounded-lg hover:bg-jlc-blue-dark transition-colors duration-300"
          >
            View all reviews on Google
            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
