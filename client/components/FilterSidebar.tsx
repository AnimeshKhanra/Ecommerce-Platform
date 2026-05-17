"use client";

import { Category } from "@/types/product.types";

interface Props {
    categories: Category[];
    selectedCategory: string;
    setSelectedCategory: (id: string) => void;
    minPrice: string;
    maxPrice: string;
    setMinPrice: (value: string) => void;
    setMaxPrice: (value: string) => void;
}

export default function FilterSidebar({
    categories,
    selectedCategory,
    setSelectedCategory,
    minPrice,
    maxPrice,
    setMinPrice,
    setMaxPrice,
}: Props) {
    return (
        <div className="space-y-6">
            <div>
                <h2 className="font-semibold mb-3">Categories</h2>

                <button
                    onClick={() => setSelectedCategory("")}
                    className="block mb-2"
                >
                    All
                </button>

                {categories.map((cat) => (
                    <button
                        key={cat.id}
                        onClick={() => setSelectedCategory(cat.id)}
                        className={`block mb-2 ${selectedCategory === cat.id ? "font-bold text-blue-600" : ""
                            }`}
                    >
                        {cat.name}
                    </button>
                ))}
            </div>

            <div>
                <h2 className="font-semibold mb-3">Price Range</h2>

                <input
                    type="number"
                    placeholder="Min"
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                    className="border rounded-lg px-3 py-2 w-full mb-2"
                />

                <input
                    type="number"
                    placeholder="Max"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                    className="border rounded-lg px-3 py-2 w-full"
                />
            </div>
        </div>
    );
}