export interface HomeCategory {
    id: string;
    name: string;
}

export interface HomeProduct {
    id: string;
    name: string;
    price: string;
    images: string[];
    stock: number;
    categoryId: string;
}

export interface HomeResponse {
    featuredCategories: HomeCategory[];
    featuredProducts: HomeProduct[];
    newArrivals: HomeProduct[];
}