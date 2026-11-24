import axios from "axios";

// const api = axios.create({
//   baseURL: process.env.NEXT_PUBLIC_API_URL,
//   withCredentials: true,
// });

const api = axios.create({
  baseURL:
    typeof window === "undefined"
      ? (process.env.INTERNAL_API_URL ??
         process.env.NEXT_PUBLIC_API_URL)
      : process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
});


api.interceptors.request.use((config) => {
  if(typeof window !== "undefined"){
    const authStorage = localStorage.getItem("auth-storage");

    if(authStorage){
      try {
        const parsedAuth = JSON.parse(authStorage);

        // console.log(parsedAuth?.state)
        // console.log(parsedAuth?.state?.token)

        const token = parsedAuth?.state?.token;
        if(token){
          config.headers.Authorization = `Bearer ${token}`;
        }
      } catch (error) {
        console.error("Failed to parse auth storage:", error);
      }
    }
  }

  return config;
});

export default api;