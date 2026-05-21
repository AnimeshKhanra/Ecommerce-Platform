"use client";

import { useEffect, useState } from "react";
import api from "@/lib/axios";
import { Product } from "@/types/product.types";
import ProductGrid from "./ProductGrid";

interface RelatedProductsProps {
    categoryId: string;
    currentProductId: string;
}

export default function RelatedProducts({
    categoryId,
    currentProductId,
}: RelatedProductsProps) {
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        fetchRelatedProducts();
    }, [categoryId]);

    async function fetchRelatedProducts() {
        try {
            const res = await api.get("/products", {
                params: {
                    category: categoryId,
                    limit: 4,
                },
            });

            const filtered = res.data.data.products.filter(
                (product: Product) => product.id !== currentProductId
            );

            setProducts(filtered.slice(0, 4));
        } catch (error) {
            console.error(error);
        }
    }

    if (!products.length) return null;

    return (
        <section className="mt-16">
            <h2 className="text-3xl font-bold mb-8">
                Related Products
            </h2>

            <ProductGrid
                products={products}
                isLoading={false}
            />
        </section>
    );
}