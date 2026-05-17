"use client";

import { useEffect, useState } from "react";
import api from "@/lib/axios";
import { Category, Product, ProductResponse } from "@/types/product.types";
import { useDebounce } from "@/hooks/useDebounce";
import SearchBar from "@/components/SearchBar";
import SortDropdown from "@/components/SortDropdown";
import FilterSidebar from "@/components/FilterSidebar";
import ProductGrid from "@/components/ProductGrid";
import Pagination from "@/components/Pagination";

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search);

  const [selectedCategory, setSelectedCategory] = useState("");
  const [sort, setSort] = useState("createdAt-desc");

  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [debouncedSearch, selectedCategory, sort, minPrice, maxPrice, page]);

  async function fetchCategories() {
    const res = await api.get("/categories");
    setCategories(res.data.data);
  }

  async function fetchProducts() {
    const [sortBy, order] = sort.split("-");

    const res = await api.get<ProductResponse>("/products", {
      params: {
        search: debouncedSearch,
        category: selectedCategory,
        minPrice,
        maxPrice,
        sortBy,
        order,
        page,
        limit: 9,
      },
    });

    setProducts(res.data.data.products);
    setTotalPages(res.data.data.pagination.totalPages);
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <div className="flex flex-col md:flex-row gap-6">
        <aside className="w-full md:w-64">
          <FilterSidebar
            categories={categories}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            minPrice={minPrice}
            maxPrice={maxPrice}
            setMinPrice={setMinPrice}
            setMaxPrice={setMaxPrice}
          />
        </aside>

        <main className="flex-1">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <SearchBar value={search} onChange={setSearch} />
            <SortDropdown value={sort} onChange={setSort} />
          </div>

          <ProductGrid products={products} />

          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={setPage}
          />
        </main>
      </div>
    </div>
  );
}