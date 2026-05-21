'use client';

import { Category } from '@/types/product.types';

interface FilterSidebarProps {
  categories: Category[];
  selectedCategory: string;
  minPrice: string;
  maxPrice: string;
  onCategoryChange: (id: string) => void;
  onPriceChange: (
    min: string,
    max: string
  ) => void;
  onClearFilters: () => void;
}

export default function FilterSidebar({
  categories,
  selectedCategory,
  minPrice,
  maxPrice,
  onCategoryChange,
  onPriceChange,
  onClearFilters,
}: FilterSidebarProps) {
  return (
    <aside className="w-full md:w-72 bg-white rounded-2xl border border-slate-200 p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-bold">
          Filters
        </h3>

        <button
          onClick={onClearFilters}
          className="text-sm text-indigo-600"
        >
          Reset
        </button>
      </div>

      <div className="mb-8">
        <h4 className="font-semibold mb-3">
          Categories
        </h4>

        <div className="space-y-2">
          <button
            onClick={() => onCategoryChange('')}
            className={`block w-full text-left px-3 py-2 rounded-lg ${
              selectedCategory === ''
                ? 'bg-indigo-50 text-indigo-600'
                : 'hover:bg-slate-50'
            }`}
          >
            All Categories
          </button>

          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() =>
                onCategoryChange(category.id)
              }
              className={`block w-full text-left px-3 py-2 rounded-lg ${
                selectedCategory === category.id
                  ? 'bg-indigo-50 text-indigo-600'
                  : 'hover:bg-slate-50'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h4 className="font-semibold mb-3">
          Price Range
        </h4>

        <div className="flex gap-2">
          <input
            type="number"
            placeholder="Min"
            value={minPrice}
            onChange={(e) =>
              onPriceChange(
                e.target.value,
                maxPrice
              )
            }
            className="w-full border border-slate-200 rounded-lg p-2"
          />

          <input
            type="number"
            placeholder="Max"
            value={maxPrice}
            onChange={(e) =>
              onPriceChange(
                minPrice,
                e.target.value
              )
            }
            className="w-full border border-slate-200 rounded-lg p-2"
          />
        </div>
      </div>
    </aside>
  );
}