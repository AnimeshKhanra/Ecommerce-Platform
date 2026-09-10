import api from './axios';



// api.interceptors.request.use((config) => {
//   const token = localStorage.getItem('token');

//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }

//   return config;
// });

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
