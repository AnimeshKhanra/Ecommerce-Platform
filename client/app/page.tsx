import { getHomeData } from "@/services/home.service";

import HeroSection from "@/components/home/HeroSection";
import FeaturedCategories from "@/components/home/FeaturedCategories";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import NewArrivals from "@/components/home/NewArrivals";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import type { Metadata } from "next";



export const metadata: Metadata = {
    title: "Your Store | Shop Quality Products",
    description:
        "Discover quality products, new arrivals, and great shopping experiences.",
};




export default async function HomePage() {
    const homeData = await getHomeData();

    return (
        <main>
            <HeroSection />

            <FeaturedCategories
                categories={homeData.featuredCategories}
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