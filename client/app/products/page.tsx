"use client";

import { useEffect, useState } from "react";
import { Category, Product, ProductsResponse } from "@/types/product.types";
import { useDebounce } from "@/hooks/useDebounce";
import { getAllProducts } from "@/services/product.service";
import { getAllCategories } from "@/services/category.service";

import SearchBar from "@/components/SearchBar";
import SortDropdown from "@/components/SortDropdown";
import FilterSidebar from "@/components/FilterSidebar";
import ProductGrid from "@/components/ProductGrid";
import Pagination from "@/components/Pagination";

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Search
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 500);

  // Filters
  const [selectedCategory, setSelectedCategory] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  // Sorting
  const [sort, setSort] = useState("createdAt-desc");

  // Pagination
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);


  // Fetch all operational categories once on mount
  useEffect(() => {
    fetchCategories();
  }, []);

  // Trigger query refetch whenever parameters change
  useEffect(() => {
    fetchProducts();
  }, [debouncedSearch, selectedCategory, sort, minPrice, maxPrice, page]);

  async function fetchCategories() {
    try {
      const data = await getAllCategories();
      setCategories(data);
    } catch (error) {
      console.error("Failed to fetch categories:", error);
    }
  }

  async function fetchProducts() {
    setIsLoading(true);
    try {
      const [sortBy, order] = sort.split("-");

      const data = await getAllProducts({
        search: debouncedSearch,
        category: selectedCategory,
        minPrice,
        maxPrice,
        sortBy,
        order: order as "asc" | "desc",
        page,
        limit: 9,
      });

      setProducts(data.products);
      setTotalPages(data.pagination.totalPages);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    } finally {
      setIsLoading(false);
    }
  }

  // Explicit handler mapping for the SortDropdown structure
  const handleSortChange = (sortByField: string, orderDirection: 'asc' | 'desc') => {
    setSort(`${sortByField}-${orderDirection}`);
    setPage(1); // Reset to first page on sort change
  };

  // Explicit handler mapping for the FilterSidebar multi-variable price adjustments
  const handlePriceChange = (min: string, max: string) => {
    setMinPrice(min);
    setMaxPrice(max);
    setPage(1); // Reset to first page on boundary change
  };

  // Reset helper passing clean defaults through sub-components
  const handleClearFilters = () => {
    setSelectedCategory("");
    setMinPrice("");
    setMaxPrice("");
    setSearch("");
    setSort("createdAt-desc");
    setPage(1);
  };

  // Parsing individual sort variables out of standard string state for sub-components
  const [currentSortBy, currentOrder] = sort.split("-");


  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="grid md:grid-cols-2 gap-10">
          <div className="h-[500px] bg-slate-200 animate-pulse rounded-2xl" />

          <div className="space-y-4">
            <div className="h-6 w-32 bg-slate-200 rounded" />
            <div className="h-10 w-full bg-slate-200 rounded" />
            <div className="h-24 w-full bg-slate-200 rounded" />
            <div className="h-10 w-40 bg-slate-200 rounded" />
            <div className="h-12 w-full bg-slate-200 rounded-xl" />
          </div>
        </div>
      </div>
    );
  }


  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="mb-10">
          <h1 className="text-5xl font-bold text-slate-900">
            Discover Products
          </h1>

          <p className="mt-3 text-lg text-slate-600">
            Browse our latest collection with filters and search.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <aside className="lg:w-72">
            <FilterSidebar
              categories={categories}
              selectedCategory={selectedCategory}
              minPrice={minPrice}
              maxPrice={maxPrice}
              onCategoryChange={(id) => {
                setSelectedCategory(id);
                setPage(1);
              }}
              onPriceChange={handlePriceChange}
              onClearFilters={handleClearFilters}
            />
          </aside>

          <main className="flex-1">
            <div className="bg-white rounded-2xl p-4 shadow-sm border mb-6">
              <div className="flex flex-col md:flex-row gap-4">
                <SearchBar
                  value={search}
                  onChange={(value) => {
                    setSearch(value);
                    setPage(1);
                  }}
                />

                <SortDropdown
                  sortBy={currentSortBy}
                  order={currentOrder as "asc" | "desc"}
                  onSortChange={handleSortChange}
                />
              </div>
            </div>

            <ProductGrid
              products={products}
              isLoading={isLoading}
            />

            <Pagination
              currentPage={page}
              totalPages={totalPages}
              onPageChange={setPage}
            />
          </main>
        </div>
      </div>
    </div>
  );

}