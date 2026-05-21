"use client";

import Link from "next/link";
import { Product } from "@/types/product.types";

interface ProductTableProps {
  products: Product[];
  onDelete: (id: string) => void;
}

export default function ProductTable({
  products,
  onDelete,
}: ProductTableProps) {
  return (
    <div className="bg-white rounded-2xl shadow border overflow-x-auto">
      <table className="w-full">
        <thead className="bg-slate-100">
          <tr>
            <th className="text-left px-6 py-4">Name</th>
            <th className="text-left px-6 py-4">Category</th>
            <th className="text-left px-6 py-4">Price</th>
            <th className="text-left px-6 py-4">Stock</th>
            <th className="text-left px-6 py-4">Actions</th>
          </tr>
        </thead>

        <tbody>
          {products.map((product) => (
            <tr
              key={product.id}
              className="border-t"
            >
              <td className="px-6 py-4">
                {product.name}
              </td>

              <td className="px-6 py-4">
                {product.category?.name}
              </td>

              <td className="px-6 py-4">
                ₹{product.price}
              </td>

              <td className="px-6 py-4">
                {product.stock}
              </td>

              <td className="px-6 py-4 flex gap-3">
                <Link
                  href={`/admin/products/edit/${product.id}`}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg"
                >
                  Edit
                </Link>

                <button
                  onClick={() =>
                    onDelete(product.id)
                  }
                  className="px-4 py-2 bg-red-600 text-white rounded-lg"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}