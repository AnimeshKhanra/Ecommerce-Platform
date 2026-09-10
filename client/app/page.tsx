// export default function Home() {
//   return (
//     <div className="p-10">
//       <h1 className="text-4xl font-bold">
//         E-Commerce App Working 🚀

//       </h1>
//     </div>
//   );
// }

'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import api from '@/lib/axios';
import { Product, ProductsResponse, Category } from '@/types/product.types';
import { useDebounce } from '@/hooks/useDebounce';
import Link from 'next/link';

export default function HomePage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // State management for catalog data & filters
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Filter parameters from URL or defaults
  const [searchQuery, setSearchQuery] = useState(
    searchParams.get('search') || ''
  );
  const [selectedCategory, setSelectedCategory] = useState(
    searchParams.get('categoryId') || ''
  );
  const [page, setPage] = useState<number>(
    Number(searchParams.get('page')) || 1
  );
  const [totalPages, setTotalPages] = useState<number>(1);

  // Apply debounce to prevent spamming backend search queries
  const debouncedSearch = useDebounce(searchQuery, 500);

  // Fetch categories on initial mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await api.get('/categories');
        setCategories(res.data.data);
      } catch (error) {
        console.error('Failed to load categories:', error);
      }
    };
    fetchCategories();
  }, []);

  // Fetch products whenever search, category, or page changes
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams();
        if (debouncedSearch) params.append('search', debouncedSearch);
        if (selectedCategory) params.append('categoryId', selectedCategory);
        params.append('page', page.toString());
        params.append('limit', '12');

        // Update browser URL query string dynamically
        router.push(`?${params.toString()}`, { scroll: false });

        const res = await api.get<ProductsResponse>(`/products?${params.toString()}`
        );
        setProducts(res.data.products || res.data?.products || []);
        setTotalPages(res.data.pagination?.totalPages || res.data?.pagination?.totalPages || 1);
      } catch (error) {
        console.error('Failed to fetch products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [debouncedSearch, selectedCategory, page, router]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      {/* Page Header & Search Bar */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Explore Products</h1>

        <div className="w-full md:w-96">
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setPage(1); // Reset to page 1 on new search
            }}
            className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>
      </div>



      {/* Category Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        <button
          onClick={() => {
            setSelectedCategory('');
            setPage(1);
          }}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            selectedCategory === ''
              ? 'bg-black text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          All Categories
        </button>
        {categories?.map((cat) => (
          <button
            key={cat.id}
            onClick={() => {
              setSelectedCategory(cat.id);
              setPage(1);
            }}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
              selectedCategory === cat.id
                ? 'bg-black text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>


      {/* Product Grid */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="border rounded-lg p-4 h-80 animate-pulse bg-gray-50"
            />
          ))}
        </div>
      ) : products?.length === 0 ? (
        <div className="text-center py-20 text-gray-500">
          <p className="text-xl">No products found matching your criteria.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products?.map((product) => (
            <Link
              key={product.id}
              href={`/products/${product.id}`}
              className="group border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col bg-white"
            >
              <div className="aspect-square bg-gray-100 overflow-hidden relative">
                <img
                  src={product.images[0] || '/placeholder.png'}
                  alt={product.name}
                  className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-4 flex flex-col flex-grow justify-between space-y-2">
                <div>
                  <span className="text-xs text-gray-500 uppercase tracking-wider">
                    {product.category?.name}
                  </span>
                  <h3 className="font-semibold text-gray-800 line-clamp-1">
                    {product.name}
                  </h3>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-black">
                    ₹{product.price}
                  </span>
                  <span
                    className={`text-xs px-2 py-1 rounded ${product.stock > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}
                  >
                    {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center space-x-4 pt-6">
          <button
            onClick={() => setPage((p) => Math.max(p - 1, 1))}
            disabled={page === 1}
            className="px-4 py-2 border rounded-md text-sm font-medium disabled:opacity-50 hover:bg-gray-50"
          >
            Previous
          </button>
          <span className="text-sm text-gray-600">
            Page {page} of {totalPages}
          </span>
          <button
            onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
            disabled={page === totalPages}
            className="px-4 py-2 border rounded-md text-sm font-medium disabled:opacity-50 hover:bg-gray-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
