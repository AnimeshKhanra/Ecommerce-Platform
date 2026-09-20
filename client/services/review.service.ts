import api from "@/lib/axios";

export const getReviews = async (productId: string) => {
  const res = await api.get(`/reviews/${productId}`);

  return res.data.data;
};

export const createReview = async (payload: {
  productId: string;
  rating: number;
  comment: string;
}) => {
  const res = await api.post('/reviews', payload);

  return res.data.data;
};
