import api from "@/lib/axios";
import {
    HomeApiResponse,
    HomeData,
} from "@/types/home.types";

const getHomeData = async (): Promise<HomeData> => {
    const response = await api.get<HomeApiResponse>("/home");

    return response.data.data;
};

export { getHomeData };