"use client";

import { useEffect, useState } from "react";
import api from "@/lib/axios";
import Link from "next/link";
import { Product } from "@/types/product.types";
import ProductTable from "@/components/admin/ProductTable";

export default function AdminProductsPage() {
  const [products, setProducts] = useState<
    Product[]
  >([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  async function fetchProducts() {
    try {
      const res = await api.get("/products");

      setProducts(res.data.data.products);
    } catch (error) {
      console.error(error);
    }
  }

  async function handleDelete(id: string) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmed) return;

    try {
      await api.delete(`/products/${id}`);

      setProducts((prev) =>
        prev.filter((p) => p.id !== id)
      );
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <div className="flex flex-col md:flex-row gap-4 justify-between md:items-center mb-8">
        <h1 className="text-3xl font-bold">
          Admin Products
        </h1>

        <Link
          href="/admin/products/create"
          className="bg-indigo-600 text-white px-6 py-3 rounded-xl"
        >
          Add Product
        </Link>
      </div>

      <ProductTable
        products={products}
        onDelete={handleDelete}
      />
    </div>
  );
}