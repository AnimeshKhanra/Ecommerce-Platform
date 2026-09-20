"use client";

import { useEffect, useState } from "react";
import { Product } from "@/types/product.types";
import { getRelatedProducts } from "@/services/product.service";
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
    }, [categoryId, currentProductId]);

    async function fetchRelatedProducts() {
        try {
            const products = await getRelatedProducts(categoryId, 5);

            const filtered = products.filter(
                (product: Product) => product.id !== currentProductId
            );
            setProducts(filtered.slice(0, 4));
        } catch (error) {
            console.error("Failed to fetch related products:", error);
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