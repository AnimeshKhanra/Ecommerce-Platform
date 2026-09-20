import api from "@/lib/axios";
import { Category } from "@/types/product.types";

export const getAllCategories = async (): Promise<Category[]> => {
    const response = await api.get<{data: Category[]}>("/categories");

    return response.data.data;
}