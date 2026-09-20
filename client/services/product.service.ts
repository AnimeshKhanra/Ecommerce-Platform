import api from "@/lib/axios";
import {
    Product,
    ProductsResponse,
    SingleProductResponse,
} from "@/types/product.types";




export const getAllProducts = async (
    params: {
        search?: string;
        category?: string;
        minPrice?: string;
        maxPrice?: string;
        sortBy?: string;
        order?: "asc" | "desc";
        page?: number;
        limit?: number;
    }
): Promise<ProductsResponse> => {

    const response = await api.get<{ data: ProductsResponse }>("/products", {
        params,
    });

    return response.data.data;
};

export const getProductById = async (id:string): Promise<Product> => {
    const response  = await api.get<SingleProductResponse>(`/products/${id}`);

    return response .data.data;
}


export const getRelatedProducts = async (
    categoryId: string,
    limit: number = 4
): Promise<Product[]> => {

    const response = await api.get<{
        data: ProductsResponse;
    }>("/products", {
        params: {
            category: categoryId,
            limit,
        },
    });

    return response.data.data.products;
};