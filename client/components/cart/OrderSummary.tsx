// components/cart/OrderSummary.tsx

"use client";

import { useCartStore } from "@/store/cartStore";

export default function OrderSummary() {
  const { subtotal, totalItems } = useCartStore();

  const shipping = subtotal() > 1000 ? 0 : 99;
  const total = subtotal() + shipping;

  return (
    <div className="sticky top-24 rounded-xl border bg-white p-6 shadow-sm">
      <h2 className="mb-6 text-xl font-bold">
        Order Summary
      </h2>

      <div className="space-y-4">
        <div className="flex justify-between">
          <span>Items ({totalItems()})</span>
          <span>₹{subtotal()}</span>
        </div>

        <div className="flex justify-between">
          <span>Shipping</span>
          <span>
            {shipping === 0 ? "FREE" : `₹${shipping}`}
          </span>
        </div>

        <hr />

        <div className="flex justify-between text-lg font-bold">
          <span>Total</span>
          <span>₹{total}</span>
        </div>

        <button className="w-full rounded-lg bg-black py-3 text-white hover:opacity-90">
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
}