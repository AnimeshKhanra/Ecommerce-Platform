export const dynamic = "force-dynamic";


import { getHomeData } from "@/services/home.service";
import HeroSection from "@/components/home/HeroSection";
import FeaturedCategories from "@/components/home/FeaturedCategories";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import NewArrivals from "@/components/home/NewArrivals";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import type { Metadata } from "next";
// import { useEffect, useState } from "react";
// import { getAllProducts } from "@/services/product.service";



export const metadata: Metadata = {
    title: "Your Store | Shop Quality Products",
    description:
        "Discover quality products, new arrivals, and great shopping experiences.",
};

// const [selectedCategory, setselectedCategory] = useState("");

// useEffect(() => {
//   fetchProducts();
// }, [selectedCategory])

// async function fetchProducts(){
//     const data = await getAllProducts({
//         category: selectedCategory,
//     })
// }


export default async function HomePage() {
    const homeData = await getHomeData();

    return (
        <main>
            <HeroSection />

            <FeaturedCategories
                categories={homeData.featuredCategories}
                // selectedCategory={selectedCategory}
            />

            <FeaturedProducts
                products={homeData.featuredProducts}
            />

            <NewArrivals
                products={homeData.newArrivals}
            />

            <WhyChooseUs />
        </main>
    );
}