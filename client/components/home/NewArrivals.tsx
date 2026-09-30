import Link from "next/link";
import { HomeProduct } from "@/types/home.types";
import ProductCard from "@/components/ProductCard";

interface NewArrivalsProps {
    products: HomeProduct[];
}

export default function NewArrivals({
    products,
}: NewArrivalsProps) {
    if (products.length === 0) {
        return null;
    }

    return (
        <section className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
            {/* <div className="mb-8 flex items-end justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900">
                        New Arrivals
                    </h2>

                    <p className="mt-2 text-gray-600">
                        Discover the newest products in our store.
                    </p>
                </div>

                <Link
                    href="/products"
                    className="text-sm font-semibold text-gray-900 hover:underline"
                >
                    View all
                </Link>
            </div> */}

            <div className="mb-8 flex items-end justify-between gap-4">
    <div>
        <p className="text-sm font-semibold uppercase tracking-wide text-gray-500">
            Just added
        </p>

        <h2 className="mt-2 text-3xl font-bold tracking-tight text-gray-900">
            New Arrivals
        </h2>

        <p className="mt-2 text-gray-600">
            Discover the latest additions to our store.
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
                    <ProductCard
                        key={product.id}
                        product={product}
                    />
                ))}
            </div>
        </section>
    );
}