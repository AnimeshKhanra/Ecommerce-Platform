'use client';

import Link from "next/link";
import Image from 'next/image';
import { Product } from '@/types/product.types';
import { ShoppingBag } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({
  product,
}: ProductCardProps) {
  const productImage =
    product.images?.[0] ||
    'https://via.placeholder.com/400';

  return (
    <Link href={`/products/${product.id}`}>
    <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition">
      <div className="relative w-full aspect-square">
        <Image
          src={productImage}
          alt={product.name}
          fill
          className="object-cover"
        />
      </div>

      <div className="p-5">
        <p className="text-xs uppercase text-indigo-600 font-semibold mb-2">
          {product.category?.name}
        </p>

        <h3 className="text-lg font-bold text-slate-900 line-clamp-1">
          {product.name}
        </h3>

        <p className="text-sm text-slate-500 mt-2 line-clamp-2">
          {product.description}
        </p>

        <div className="flex items-center justify-between mt-5">
          <span className="text-xl font-bold">
            ₹{product.price}
          </span>

          <button className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg">
            <ShoppingBag className="w-4 h-4" />
            Add
          </button>
        </div>
      </div>
    </div>
    </Link>
  );
}