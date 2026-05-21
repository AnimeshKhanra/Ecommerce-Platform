"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import api from "@/lib/axios";
import ProductForm from "@/components/admin/ProductForm";
import {
  Product,
  ProductFormData,
} from "@/types/product.types";

export default function EditProductPage() {
  const params = useParams();
  const id = params.id as string;

  const [loading, setLoading] = useState(true);
  const [productData, setProductData] =
    useState<ProductFormData | null>(null);

  useEffect(() => {
    fetchProduct();
  }, [id]);

  async function fetchProduct() {
    try {
      const res = await api.get(
        `/products/${id}`
      );

      const product: Product =
        res.data.data;

      setProductData({
        name: product.name,
        description:
          product.description || "",
        price: product.price,
        stock: product.stock,
        categoryId:
          product.categoryId,
        images: product.images || [],
      });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-10">
        <div className="h-96 bg-slate-200 animate-pulse rounded-2xl" />
      </div>
    );
  }

  if (!productData) {
    return (
      <div className="text-center py-20">
        Product not found
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-8">
        Edit Product
      </h1>

      <ProductForm
        initialData={productData}
        productId={id}
        isEdit={true}
      />
    </div>
  );
}