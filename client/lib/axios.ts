import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
});

export default api;







// import axios from "axios";
// import { useAuthStore } from "../store/auth.store";

// const api = axios.create({
//     baseURL: process.env.NEXT_PUBLIC_API_URL,
//     withCredentials: true,
// });

// api.interceptors.request.use(
//     (config) => {
//         const token = useAuthStore.getState().token;

//         if (token) {
//             config.headers.Authorization = `Bearer ${token}`;
//         }

//         return config;
//     },
//     (error) => Promise.reject(error)
// );

// let isRefreshing = false;
// let failedQueue: Array<any> = [];

// const processQueue = (error: any, token: string | null = null) => {
//     failedQueue.forEach((promise) => {
//         if (error) {
//             promise.reject(error);
//         } else {
//             promise.resolve(token);
//         }
//     });

//     failedQueue = [];
// };

// api.interceptors.response.use(
//     (response) => response,
//     async (error) => {
//         const originalRequest = error.config;

//         if (
//             error.response?.status === 401 &&
//             !originalRequest._retry
//         ) {
//             if (isRefreshing) {
//                 return new Promise((resolve, reject) => {
//                     failedQueue.push({ resolve, reject });
//                 }).then((token) => {
//                     originalRequest.headers.Authorization = `Bearer ${token}`;
//                     return api(originalRequest);
//                 });
//             }

//             originalRequest._retry = true;
//             isRefreshing = true;

//             try {
//                 const res = await axios.post(
//                     `${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`,
//                     {},
//                     { withCredentials: true }
//                 );

//                 const newToken = res.data.accessToken;

//                 useAuthStore.getState().setToken(newToken);

//                 processQueue(null, newToken);  // call processQueue

//                 originalRequest.headers.Authorization = `Bearer ${newToken}`;

//                 return api(originalRequest);
//             } catch (err) {
//                 processQueue(err, null);
//                 useAuthStore.getState().logout();
//                 return Promise.reject(err);
//             } finally {
//                 isRefreshing = false;
//             }
//         }

//         return Promise.reject(error);
//     }
// );

// export default api;