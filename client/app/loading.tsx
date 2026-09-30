export default function Loading() {
    return (
        <main>
            {/* Hero Skeleton */}
            <section className="animate-pulse bg-gray-100">
                <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
                    <div className="h-5 w-40 rounded bg-gray-300" />

                    <div className="mt-6 h-12 max-w-2xl rounded bg-gray-300" />

                    <div className="mt-4 h-6 max-w-xl rounded bg-gray-300" />

                    <div className="mt-8 h-12 w-32 rounded bg-gray-300" />
                </div>
            </section>

            {/* Categories Skeleton */}
            <section className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
                <div className="mb-8">
                    <div className="h-8 w-52 animate-pulse rounded bg-gray-200" />
                    <div className="mt-3 h-5 w-72 animate-pulse rounded bg-gray-200" />
                </div>

                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
                    {Array.from({ length: 6 }).map((_, index) => (
                        <div
                            key={index}
                            className="h-24 animate-pulse rounded-xl bg-gray-200"
                        />
                    ))}
                </div>
            </section>

            {/* Products Skeleton */}
            <section className="bg-gray-50">
                <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
                    <div className="mb-8">
                        <div className="h-8 w-56 animate-pulse rounded bg-gray-200" />
                        <div className="mt-3 h-5 w-72 animate-pulse rounded bg-gray-200" />
                    </div>

                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                        {Array.from({ length: 8 }).map((_, index) => (
                            <div
                                key={index}
                                className="h-80 animate-pulse rounded-xl bg-gray-200"
                            />
                        ))}
                    </div>
                </div>
            </section>
        </main>
    );
}