"use client";

import { ShoppingCart } from "lucide-react";

interface AddToCartButtonProps {
    stock: number;
}

export default function AddToCartButton({
    stock,
}: AddToCartButtonProps) {
    const handleAddToCart = () => {
        alert("Cart functionality coming in next day");
    };

    return (
        <button
            onClick={handleAddToCart}
            disabled={stock === 0}
            className={`w-full md:w-auto flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-semibold text-white transition ${stock === 0
                    ? "bg-slate-400 cursor-not-allowed"
                    : "bg-indigo-600 hover:bg-indigo-700"
                }`}
        >
            <ShoppingCart className="w-5 h-5" />
            Add to Cart
        </button>
    );
}