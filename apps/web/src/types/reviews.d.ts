declare module 'reviews' {
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

  interface GoogleReviews {
    overallRatingValue: string;
    numberOfReviews: string;
    reviews: Review[];
  }

  export const googleReviews: GoogleReviews;
}