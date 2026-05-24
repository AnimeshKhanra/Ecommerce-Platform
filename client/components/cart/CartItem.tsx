// components/cart/CartItem.tsx

"use client";

import Image from "next/image";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useCartStore } from "@/store/cartStore";

interface CartItemProps {
  item: {
    id: string;
    quantity: number;
    product: {
      id: string;
      name: string;
      price: number;
      images: string[];
    };
  };
}

export default function CartItem({ item }: CartItemProps) {
  const { increaseQty, decreaseQty, removeItem } = useCartStore();

  return (
    <div className="flex gap-4 rounded-xl border bg-white p-4 shadow-sm">
      <div className="relative h-24 w-24 overflow-hidden rounded-lg">
        <Image
          src={item.product.images[0]}
          alt={item.product.name}
          fill
          className="object-cover"
        />
      </div>

      <div className="flex flex-1 flex-col justify-between">
        <div>
          <h3 className="text-lg font-semibold">{item.product.name}</h3>
          <p className="text-gray-600">₹{item.product.price}</p>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 rounded-lg border px-3 py-2">
            <button
              onClick={() => decreaseQty(item.id)}
              className="rounded p-1 hover:bg-gray-100"
            >
              <Minus size={18} />
            </button>

            <span className="min-w-[20px] text-center">
              {item.quantity}
            </span>

            <button
              onClick={() => increaseQty(item.id)}
              className="rounded p-1 hover:bg-gray-100"
            >
              <Plus size={18} />
            </button>
          </div>

          <button
            onClick={() => removeItem(item.id)}
            className="flex items-center gap-2 text-red-500 hover:text-red-700"
          >
            <Trash2 size={18} />
            Remove
          </button>
        </div>
      </div>
    </div>
  );
}