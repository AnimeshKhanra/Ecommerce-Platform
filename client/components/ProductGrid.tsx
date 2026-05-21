'use client';

import ProductCard from './ProductCard';
import { Product } from '@/types/product.types';

interface ProductGridProps {
  products: Product[];
  isLoading: boolean;
}

export default function ProductGrid({
  products,
  isLoading,
}: ProductGridProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map(
          (_, index) => (
            <div
              key={index}
              className="h-96 bg-slate-200 rounded-2xl animate-pulse"
            />
          )
        )}
      </div>
    );
  }

  if (!products.length) {
    return (
      <div className="text-center py-20 bg-white rounded-2xl border border-slate-200">
        <h3 className="text-xl font-bold">
          No products found
        </h3>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
        />
      ))}
    </div>
  );
}