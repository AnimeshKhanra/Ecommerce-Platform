import Link from "next/link";

export default function CancelPage() {
    return (
        <div className="min-h-screen flex items-center justify-center px-6">
            <div className="bg-white border rounded-2xl p-10 shadow-sm text-center">
                <h1 className="text-4xl font-bold text-red-500 mb-4">
                    Payment Cancelled
                </h1>

                <p className="text-gray-600 mb-8">
                    Your payment was cancelled.
                    You can try again anytime.
                </p>

                <div className="flex gap-4 justify-center">
                    <Link
                        href="/cart"
                        className="bg-black text-white px-6 py-3 rounded-xl"
                    >
                        Back to Cart
                    </Link>

                    <Link
                        href="/checkout"
                        className="border px-6 py-3 rounded-xl"
                    >
                        Retry Payment
                    </Link>
                </div>
            </div>
        </div>
    );
}
