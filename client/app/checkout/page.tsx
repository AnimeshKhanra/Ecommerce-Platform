"use client";

import ShippingForm from "@/components/checkout/ShippingForm";
import { useCartStore } from "@/store/cartStore";
import { useEffect } from "react";

export default function CheckoutPage() {
  const { cartItems, fetchCart, subtotal } =
    useCartStore();

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  const shipping = subtotal() > 1000 ? 0 : 99;
  const total = subtotal() + shipping;

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-8">
        Checkout
      </h1>

      <div className="grid lg:grid-cols-2 gap-10">
        <ShippingForm />

        <div className="bg-white rounded-2xl border p-6 shadow-sm h-fit">
          <h2 className="text-2xl font-bold mb-6">
            Order Summary
          </h2>

          <div className="space-y-4">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex justify-between"
              >
                <span>
                  {item.product.name} × {item.quantity}
                </span>

                <span>
                  ₹
                  {item.product.price *
                    item.quantity}
                </span>
              </div>
            ))}

            <hr />

            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>₹{subtotal()}</span>
            </div>

            <div className="flex justify-between">
              <span>Shipping</span>
              <span>
                {shipping === 0
                  ? "FREE"
                  : `₹${shipping}`}
              </span>
            </div>

            <div className="flex justify-between text-xl font-bold">
              <span>Total</span>
              <span>₹{total}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}