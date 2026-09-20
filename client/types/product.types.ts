export interface Category {
  id: string;
  name: string;
}

export interface Product {
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
  category: Category;
}

export interface ProductPagination {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

export interface ProductsResponse {
  products: Product[];
  pagination: ProductPagination;
}

export interface SingleProductResponse {
  data: Product;
}

export interface ProductFormData {
  name: string;
  description: string;
  price: number;
  stock: number;
  categoryId: string;
  images: string[];
}