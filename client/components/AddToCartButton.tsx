"use client";

import { useCartStore } from "@/store/cartStore";
import { CartProduct } from "@/types/cart.types";
import { ShoppingCart } from "lucide-react";
import toast from "react-hot-toast";

interface AddToCartButtonProps {
    stock: number;
    product: CartProduct;
}

export default function AddToCartButton({
    stock,
    product
}: AddToCartButtonProps) {
    const { addToCart } = useCartStore();
    
    const handleAddToCart = async () => {
        // alert("Cart functionality coming in next day");
        try {
            await addToCart(product, 1);

            toast.success("Product added to cart");
        } catch (error) {
            console.error("Failed to add product:", error);

            toast.error("Failed to add product to cart");
        }
    };

    return (
        <button
            onClick={handleAddToCart}
            disabled={stock <= 0}
            className={`w-full md:w-auto flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-semibold text-white transition ${stock <= 0
                    ? "bg-slate-400 cursor-not-allowed"
                    : "bg-indigo-600 hover:bg-indigo-700"
                }`}
        >
            <ShoppingCart className="w-5 h-5" />
            {/* Add to Cart */}
            {stock <= 0 ? "Out of Stock" : "Add to Cart"}
        </button>
    );
}