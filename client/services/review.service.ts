// import api from "@/lib/axios";

// export const getReviews = async (productId: string) => {
//   const res = await api.get(`/reviews/${productId}`);

//   return res.data.data;
// };

// export const createReview = async (payload: {
//   productId: string;
//   rating: number;
//   comment: string;
// }) => {
//   const res = await api.post('/reviews', payload);

//   return res.data.data;
// };





import api from "@/lib/axios";

export interface CreateReviewPayload {
  productId: string;
  rating: number;
  comment?: string;
}

export interface UpdateReviewPayload {
  rating: number;
  comment?: string;
}

export const getReviews = async (productId: string) => {
  const response = await api.get(`/reviews/${productId}`);

  return response.data.data;
};

export const createReview = async (
  payload: CreateReviewPayload
) => {
  const response = await api.post("/reviews", payload);

  return response.data.data;
};

export const updateReview = async (
  reviewId: string,
  payload: UpdateReviewPayload
) => {
  const response = await api.put(
    `/reviews/${reviewId}`,
    payload
  );

  return response.data.data;
};

export const deleteReview = async (
  reviewId: string
) => {
  const response = await api.delete(
    `/reviews/${reviewId}`
  );

  return response.data.data;
};