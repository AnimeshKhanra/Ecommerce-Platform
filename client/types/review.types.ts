export interface ReviewUser {
    id: string;
    name: string;
}


export interface Review {
    id: string;
    rating: number;
    comment: string | null;
    user: ReviewUser;
}

export interface ReviewResponse {
    avgRating: number;
    totalReviews: number;
    reviews: Review[];
}