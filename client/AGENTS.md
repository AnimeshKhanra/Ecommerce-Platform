<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->


 ## product/page.tsx
 
```javascript
'use client';

import {
  useEffect,
  useState,
  useCallback,
} from 'react';

import axiosInstance from '@/lib/axios';

import {
  Product,
  Category,
  ProductsResponse,
} from '@/types/product.types';

import SearchBar from '@/components/SearchBar';
import FilterSidebar from '@/components/FilterSidebar';
import SortDropdown from '@/components/SortDropdown';
import ProductGrid from '@/components/ProductGrid';
import Pagination from '@/components/Pagination';

import { useDebounce } from '@/hooks/useDebounce';

export default function ProductsPage() {
  const [products, setProducts] = useState<
    Product[]
  >([]);

  const [categories, setCategories] = useState<
    Category[]
  >([]);

  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] =
    useState('');

  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  const [sortBy, setSortBy] =
    useState('createdAt');

  const [order, setOrder] = useState<
    'asc' | 'desc'
  >('desc');

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] =
    useState(1);

  const [isLoading, setIsLoading] =
    useState(true);

  const debouncedSearch = useDebounce(
    search,
    500
  );

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res =
        await axiosInstance.get('/categories');

      setCategories(res.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchProducts = useCallback(
    async () => {
      setIsLoading(true);

      try {
        const params = {
          search: debouncedSearch,
          category: selectedCategory,
          minPrice,
          maxPrice,
          sortBy,
          order,
          page,
          limit: 9,
        };

        const res =
          await axiosInstance.get('/products', {
            params,
          });

        const data: ProductsResponse =
          res.data.data;

        setProducts(data.products);
        setTotalPages(
          data.pagination.totalPages
        );
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    },
    [
      debouncedSearch,
      selectedCategory,
      minPrice,
      maxPrice,
      sortBy,
      order,
      page,
    ]
  );

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleSortChange = (
    field: string,
    direction: 'asc' | 'desc'
  ) => {
    setSortBy(field);
    setOrder(direction);
    setPage(1);
  };

  const clearFilters = () => {
    setSearch('');
    setSelectedCategory('');
    setMinPrice('');
    setMaxPrice('');
    setSortBy('createdAt');
    setOrder('desc');
    setPage(1);
  };

  // Helper handler for Sort Dropdown changes
  const handleSortChange = (field: string, direction: 'asc' | 'desc') => {
    setSort(`${field}-${direction}`);
  };

  // Helper handler for Price variations
  const handlePriceChange = (min: string, max: string) => {
    setMinPrice(min);
    setMaxPrice(max);
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <SearchBar
          value={search}
          onChange={(value) => {
            setSearch(value);
            setPage(1);
          }}
        />

        <SortDropdown
          sortBy={sortBy}
          order={order}
          onSortChange={handleSortChange}
        />
      </div>

      <div className="flex gap-8">
        <FilterSidebar
          categories={categories}
          selectedCategory={selectedCategory}
          minPrice={minPrice}
          maxPrice={maxPrice}
          onCategoryChange={(id) => {
            setSelectedCategory(id);
            setPage(1);
          }}
          onPriceChange={(min, max) => {
            setMinPrice(min);
            setMaxPrice(max);
            setPage(1);
          }}
          onClearFilters={clearFilters}
        />

        <div className="flex-1">
          <ProductGrid
            products={products}
            isLoading={isLoading}
          />

          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={setPage}
          />
        </div>
      </div>
    </div>
  );




}
```