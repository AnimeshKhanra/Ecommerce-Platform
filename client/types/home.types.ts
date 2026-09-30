export interface HomeCategory {
    id: string;
    name: string;
}

export interface HomeProduct {
    // id: string;
    // name: string;
    // price: string;
    // images: string[];
    // stock: number;
    // categoryId: string;

    id: string;
      name: string;
      description?: string | null;
      price: string; // ← change this
      stock: number;
      images: string[];
      isActive: boolean;
      categoryId: string;
      adminId: string;
      createdAt: string;
      updatedAt: string;
      category: HomeCategory;
}

export interface HomeData {
    featuredCategories: HomeCategory[];
    featuredProducts: HomeProduct[];
    newArrivals: HomeProduct[];
}

export interface HomeApiResponse {
    statusCode: number;
    data: HomeData;
    message: string;
    success: boolean;
}