"use client";

import { useEffect } from "react";
import Link from "next/link";
import { ShoppingCart, ArrowRight } from "lucide-react";

import CartItem from "@/components/cart/CartItem";
import OrderSummary from "@/components/cart/OrderSummary";
import { useCartStore } from "@/store/cartStore";
import { buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

export default function CartPage() {
    const { cartItems, fetchCart, loading } = useCartStore();

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (token) {
            fetchCart();
        }
    }, [fetchCart]);

    // Loading skeleton
    if (loading) {
        return (
            <div className="mx-auto max-w-7xl space-y-8 px-4 py-10 md:px-6">
                <div className="flex items-center gap-3">
                    <Skeleton className="size-10 rounded-lg" />
                    <div className="space-y-2">
                        <Skeleton className="h-8 w-56" />
                        <Skeleton className="h-4 w-40" />
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                    <div className="space-y-4 lg:col-span-2">
                        {Array.from({ length: 3 }).map((_, i) => (
                            <Skeleton key={i} className="h-28 w-full" />
                        ))}
                    </div>
                    <Skeleton className="h-64 w-full" />
                </div>
            </div>
        );
    }

    // Empty cart
    if (!cartItems || cartItems.length === 0) {
        return (
            <div className="mx-auto flex min-h-[70vh] max-w-7xl flex-col items-center justify-center px-4 text-center">
                <div className="mb-4 flex size-16 items-center justify-center rounded-full bg-muted">
                    <ShoppingCart className="size-8 text-muted-foreground" />
                </div>

                <h1 className="mb-2 text-2xl font-bold tracking-tight md:text-3xl">
                    Your cart is empty
                </h1>

                <p className="mb-6 text-sm text-muted-foreground">
                    Looks like you haven&apos;t added anything yet.
                </p>

                <Link
                    href="/products"
                    className={cn(buttonVariants(), "gap-2")}
                >
                    Continue Shopping
                    <ArrowRight className="size-4" />
                </Link>
            </div>
        );
    }

    return (
        <div className="mx-auto max-w-7xl px-4 py-10 md:px-6">
            {/* Header */}
            <div className="mb-8 flex items-center gap-3">
                <div>
                    <div className="flex items-center gap-2">
                        <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
                            Shopping Cart
                        </h1>
                        <Badge variant="secondary">
                            {cartItems.length}{" "}
                            {cartItems.length === 1 ? "item" : "items"}
                        </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                        Review your items before checkout
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                {/* Cart Items */}
                <div className="space-y-4 lg:col-span-2">
                    {cartItems.map((item) => (
                        <CartItem key={item.id} item={item} />
                    ))}
                </div>

                {/* Summary */}
                <aside className="lg:sticky lg:top-24 lg:self-start">
                    <OrderSummary />
                </aside>
            </div>
        </div>
    );
}