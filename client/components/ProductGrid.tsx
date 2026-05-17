import { Product } from "@/types/product.types";
import ProductCard from "./ProductCard";

interface Props {
    products: Product[];
}

export default function ProductGrid({ products }: Props) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
                <ProductCard key={product.id} product={product} />
            ))}
        </div>
    );
}