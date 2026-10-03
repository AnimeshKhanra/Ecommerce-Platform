// export interface ReviewUser {
//     id: string;
//     name: string;
// }

// export interface Review {
//     id: string;
//     rating: number;
//     comment: string | null;
//     user: ReviewUser;
// }

// export interface ReviewResponse {
//     avgRating: number;
//     totalReviews: number;
//     reviews: Review[];
// }

export interface ReviewUser {
  name: string;
}

export interface Review {
  id: string;
  rating: number;
  comment: string | null;
  userId: string;
  productId: string;
  createdAt: string;
  user: ReviewUser;
}

export interface ReviewResponse {
  reviews: Review[];
  avgRating: number;
  totalReviews: number;
}