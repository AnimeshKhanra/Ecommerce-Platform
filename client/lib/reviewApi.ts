import axios from "axios";

const API = axios.create({
    baseURL:
        process.env
            .NEXT_PUBLIC_API_URL,
});

API.interceptors.request.use(
    (config) => {
        const token =
            localStorage.getItem(
                "token"
            );

        if (token) {
            config.headers.Authorization =
                `Bearer ${token}`;
        }

        return config;
    }
);

export const getReviews =
    async (
        productId: string
    ) => {
        const res =
            await API.get(
                `/reviews/${productId}`
            );

        return res.data.data;
    };

export const createReview =
    async (payload: {
        productId: string;
        rating: number;
        comment: string;
    }) => {
        const res =
            await API.post(
                "/reviews",
                payload
            );

        return res.data.data;
    };