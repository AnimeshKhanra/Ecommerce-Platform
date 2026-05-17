import { Product } from "@/types/product.types";

interface Props {
    product: Product;
}

export default function ProductCard({ product }: Props) {
    return (
        <div className="border rounded-xl overflow-hidden shadow-sm">
            <img
                src={product.images[0]}
                alt={product.name}
                className="w-full h-52 object-cover"
            />

            <div className="p-4">
                <h2 className="font-semibold">{product.name}</h2>
                <p className="text-gray-500 text-sm">{product.category.name}</p>
                <p className="font-bold mt-2">₹{product.price}</p>
            </div>
        </div>
    );
}