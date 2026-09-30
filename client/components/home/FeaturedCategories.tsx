import Link from "next/link";
import { HomeCategory } from "@/types/home.types";

interface FeaturedCategoriesProps {
    categories: HomeCategory[];
}

export default function FeaturedCategories({
    categories,
}: FeaturedCategoriesProps) {

    if (categories.length === 0) {
        return null;
    }

    return (
        <section className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
            <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900">
                    Shop by Category
                </h2>

                <p className="mt-2 text-gray-600">
                    Explore our popular categories.
                </p>
            </div>

            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
                {categories.map((category) => (
                    <Link
                        key={category.id}
                        href={`/products?category=${category.id}`}
                        className="rounded-xl border bg-white p-6 text-center transition hover:-translate-y-1 hover:shadow-md"
                    >
                        <h3 className="font-semibold text-gray-900">
                            {category.name}
                        </h3>
                    </Link>
                ))}
            </div>
        </section>
    );
}