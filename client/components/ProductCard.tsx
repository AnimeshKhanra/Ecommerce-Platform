"use client";

import Link from "next/link";
import Image from "next/image";
import { ShoppingBag } from "lucide-react";
import { Product } from "@/types/product.types";

interface ProductCardProps {
    product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
    const productImage =
        product.images?.[0] || "https://via.placeholder.com/400";

    return (
        <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
            
            {/* Product Image */}
            <Link href={`/products/${product.id}`}>
                <div className="relative w-full aspect-square">
                    <Image
                        src={productImage}
                        alt={product.name}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover"
                    />
                </div>
            </Link>

            {/* Product Information */}
            <div className="p-5">

                {/* Category */}
                <p className="text-sm text-indigo-600 uppercase font-medium">
                    {product.category?.name}
                </p>

                {/* Product Name */}
                <Link href={`/products/${product.id}`}>
                    <h3 className="mt-2 text-xl font-semibold hover:text-indigo-600">
                        {product.name}
                    </h3>
                </Link>

                {/* Description */}
                <p className="mt-2 text-sm text-gray-600 line-clamp-2">
                    {product.description || "No description available"}
                </p>

                {/* Price + Add */}
                <div className="mt-4 flex items-center justify-between">
                    <span className="text-xl font-bold">
                        ₹{product.price}
                    </span>

                    <button
                        type="button"
                        className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg"
                    >
                        <ShoppingBag size={18} />
                        Add
                    </button>
                </div>
            </div>
        </div>
    );
}