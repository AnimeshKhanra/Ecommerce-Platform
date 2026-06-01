"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import api from "@/lib/axios";
import {
    Product,
    SingleProductResponse,
} from "@/types/product.types";
import ImageGallery from "@/components/ImageGallery";
import StockIndicator from "@/components/StockIndicator";
import AddToCartButton from "@/components/AddToCartButton";
import RelatedProducts from "@/components/RelatedProducts";
import ReviewSection from "@/components/reviews/ReviewSection";

export default function ProductDetailPage() {
    const params = useParams();
    const id = params.id as string;

    const [product, setProduct] =
        useState<Product | null>(null);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchProduct();
    }, [id]);

    async function fetchProduct() {
        try {
            const res =
                await api.get<SingleProductResponse>(
                    `/products/${id}`
                );

            setProduct(res.data.data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    if (loading) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="h-[500px] bg-slate-200 animate-pulse rounded-2xl" />
            </div>
        );
    }

    if (!product) {
        return (
            <div className="text-center py-20">
                Product not found
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-6 py-10">
            <div className="grid md:grid-cols-2 gap-10">
                <ImageGallery
                    images={product.images}
                    productName={product.name}
                />

                <div className="space-y-6">
                    <p className="text-indigo-600 font-semibold uppercase">
                        {product.category.name}
                    </p>

                    <h1 className="text-4xl font-bold text-slate-900">
                        {product.name}
                    </h1>

                    <p className="text-slate-600 leading-relaxed">
                        {product.description}
                    </p>

                    <p className="text-4xl font-bold text-slate-900">
                        ₹{product.price}
                    </p>

                    <StockIndicator stock={product.stock} />

                    <AddToCartButton stock={product.stock} />
                </div>
            </div>

            <RelatedProducts
                categoryId={product.categoryId}
                currentProductId={product.id}
            />
            
            <ReviewSection
                productId={product.id}
            />
        </div>
    );
}