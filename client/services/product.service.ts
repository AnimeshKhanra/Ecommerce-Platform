import api from "@/lib/axios";
import {
    Product,
    ProductFormData,
    ProductsResponse,
    SingleProductResponse,
} from "@/types/product.types";


// private -------------------
export const adminProductsService = async (): Promise<ProductsResponse> => {
    const product = await api.get("/admin/products");
    return product.data.data;
}

export const createProductService = async (data: ProductFormData): Promise<Product> => {
  const response = await api.post<{ data: Product }>("/admin/products/create", data);
  return response.data.data;
};

export const updateProductService = async (id: string, data: Partial<ProductFormData>): Promise<Product> => {
  const response = await api.patch<{ data: Product }>(`/admin/products/${id}`,data);
  return response.data.data;
};

export const deleteProductService = async (id: string):Promise<void> => {
    await api.delete(`/admin/products/${id}`);
}



// Public ------------------
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

    return response.data.data;
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