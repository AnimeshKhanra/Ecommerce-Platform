import { HomeProduct } from '@/types/home.types';
import ProductCard from '@/components/ProductCard';
import Link from 'next/link';

interface FeaturedProductsProps {
    products: HomeProduct[];
}

export default function FeaturedProducts({ products }: FeaturedProductsProps) {
    if (products.length === 0) {
        return null;
    }

    return (
        <section className="bg-gray-50">
            <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
                <div className="mb-8 flex items-end justify-between gap-4">
                    <div>
                        <p className="text-sm font-semibold uppercase tracking-wide text-gray-500">
                            Our selection
                        </p>

                        <h2 className="mt-2 text-3xl font-bold tracking-tight text-gray-900">
                            Featured Products
                        </h2>

                        <p className="mt-2 text-gray-600">
                            Explore some of our most recent products.
                        </p>
                    </div>

                    <Link
                        href="/products"
                        className="hidden shrink-0 text-sm font-semibold text-gray-900 hover:underline sm:block"
                    >
                        View all →
                    </Link>
                </div>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {products.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </div>
        </section>
    );
}
