// app/cart/page.tsx

"use client";

import { useEffect } from "react";
import CartItem from "@/components/cart/CartItem";
import OrderSummary from "@/components/cart/OrderSummary";
import { useCartStore } from "@/store/cartStore";
import Link from "next/link";

export default function CartPage() {
    const { cartItems, fetchCart, loading } = useCartStore();

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (token) {
            fetchCart();
        }
    }, [fetchCart]);

    if (loading) {
        return (
            <div className="mx-auto max-w-7xl px-4 py-10">
                <h1 className="text-3xl font-bold">Loading cart...</h1>
            </div>
        );
    }

    if (cartItems.length === 0) {
        return (
            <div className="mx-auto flex min-h-[70vh] max-w-7xl flex-col items-center justify-center px-4">
                <h1 className="mb-4 text-3xl font-bold">Your cart is empty</h1>

                <p className="mb-6 text-gray-600">
                    Looks like you haven't added anything yet.
                </p>

                <Link
                    href="/products"
                    className="rounded-lg bg-black px-6 py-3 text-white hover:opacity-90"
                >
                    Continue Shopping
                </Link>
            </div>
        );
    }

    return (
        <div className="mx-auto max-w-7xl px-4 py-10">
            <h1 className="mb-8 text-3xl font-bold">Shopping Cart</h1>

            <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                {/* Cart Items */}
                <div className="space-y-4 lg:col-span-2">
                    {cartItems.map((item) => (
                        <CartItem key={item.id} item={item} />
                    ))}
                </div>

                {/* Summary */}
                <div>
                    <OrderSummary />
                </div>
            </div>
        </div>
    );
}