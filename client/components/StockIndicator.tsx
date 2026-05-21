interface StockIndicatorProps {
    stock: number;
}

export default function StockIndicator({
    stock,
}: StockIndicatorProps) {
    if (stock === 0) {
        return (
            <span className="inline-block px-4 py-2 rounded-full bg-red-100 text-red-600 font-medium">
                Out of Stock
            </span>
        );
    }

    if (stock <= 5) {
        return (
            <span className="inline-block px-4 py-2 rounded-full bg-yellow-100 text-yellow-700 font-medium">
                Only {stock} left
            </span>
        );
    }

    return (
        <span className="inline-block px-4 py-2 rounded-full bg-green-100 text-green-700 font-medium">
            In Stock
        </span>
    );
}