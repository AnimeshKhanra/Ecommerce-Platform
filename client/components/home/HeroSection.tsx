// import Link from "next/link";

// export default function HeroSection() {
//     return (
//         <section className="bg-gray-100">
//             <div className="mx-auto flex min-h-[500px] max-w-7xl items-center px-6 py-16 lg:px-8">
//                 <div className="max-w-2xl">
//                     <p className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-600">
//                         Welcome to our store
//                     </p>

//                     <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
//                         Discover products you’ll love.
//                     </h1>

//                     <p className="mt-6 max-w-xl text-lg leading-8 text-gray-600">
//                         Explore our collection of quality products,
//                         discover new arrivals, and find something
//                         perfect for you.
//                     </p>

//                     <div className="mt-8">
//                         <Link
//                             href="/products"
//                             className="inline-flex rounded-lg bg-black px-6 py-3 text-sm font-semibold text-white transition hover:bg-gray-800"
//                         >
//                             Shop Now
//                         </Link>
//                     </div>
//                 </div>
//             </div>
//         </section>
//     );
// }

import Link from "next/link";

export default function HeroSection() {
    return (
        <section className="overflow-hidden bg-gray-100">
            <div className="mx-auto flex min-h-[520px] max-w-7xl items-center px-6 py-20 lg:px-8">
                <div className="max-w-3xl">
                    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-500">
                        Welcome to our store
                    </p>

                    <h1 className="mt-5 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-7xl">
                        Find something
                        <br />
                        you'll love.
                    </h1>

                    <p className="mt-6 max-w-xl text-lg leading-8 text-gray-600">
                        Discover quality products, explore our latest
                        arrivals, and enjoy a simple shopping experience.
                    </p>

                    <div className="mt-8 flex flex-wrap gap-4">
                        <Link
                            href="/products"
                            className="rounded-lg bg-black px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-gray-800"
                        >
                            Shop Now
                        </Link>

                        {/* <Link
                            href="/products"
                            className="rounded-lg border border-gray-300 bg-white px-7 py-3.5 text-sm font-semibold text-gray-900 transition hover:bg-gray-50"
                        >
                            Explore Products
                        </Link> */}
                    </div>
                </div>
            </div>
        </section>
    );
}