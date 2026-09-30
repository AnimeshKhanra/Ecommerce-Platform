import Link from "next/link";

export default function Footer() {
    return (
        <footer className="border-t bg-white">
            <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
                <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">

                    {/* Brand */}
                    <div>
                        <Link
                            href="/"
                            className="text-xl font-bold text-gray-900"
                        >
                            Your Store
                        </Link>

                        <p className="mt-4 max-w-xs text-sm leading-6 text-gray-600">
                            Discover quality products and enjoy a simple,
                            secure, and convenient shopping experience.
                        </p>
                    </div>

                    {/* Shop */}
                    <div>
                        <h3 className="text-sm font-semibold text-gray-900">
                            Shop
                        </h3>

                        <ul className="mt-4 space-y-3 text-sm">
                            <li>
                                <Link
                                    href="/products"
                                    className="text-gray-600 hover:text-gray-900"
                                >
                                    All Products
                                </Link>
                            </li>

                            <li>
                                <Link
                                    href="/products"
                                    className="text-gray-600 hover:text-gray-900"
                                >
                                    New Arrivals
                                </Link>
                            </li>

                            <li>
                                <Link
                                    href="/cart"
                                    className="text-gray-600 hover:text-gray-900"
                                >
                                    Cart
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Account */}
                    <div>
                        <h3 className="text-sm font-semibold text-gray-900">
                            Account
                        </h3>

                        <ul className="mt-4 space-y-3 text-sm">
                            <li>
                                <Link
                                    href="/login"
                                    className="text-gray-600 hover:text-gray-900"
                                >
                                    Login
                                </Link>
                            </li>

                            <li>
                                <Link
                                    href="/register"
                                    className="text-gray-600 hover:text-gray-900"
                                >
                                    Create Account
                                </Link>
                            </li>

                            <li>
                                <Link
                                    href="/orders"
                                    className="text-gray-600 hover:text-gray-900"
                                >
                                    My Orders
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Support */}
                    <div>
                        <h3 className="text-sm font-semibold text-gray-900">
                            Support
                        </h3>

                        <ul className="mt-4 space-y-3 text-sm">
                            <li>
                                <Link
                                    href="/contact"
                                    className="text-gray-600 hover:text-gray-900"
                                >
                                    Contact Us
                                </Link>
                            </li>

                            <li>
                                <Link
                                    href="/shipping"
                                    className="text-gray-600 hover:text-gray-900"
                                >
                                    Shipping Information
                                </Link>
                            </li>

                            <li>
                                <Link
                                    href="/returns"
                                    className="text-gray-600 hover:text-gray-900"
                                >
                                    Returns
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom */}
                <div className="mt-12 border-t pt-8">
                    <div className="flex flex-col gap-4 text-sm text-gray-500 sm:flex-row sm:items-center sm:justify-between">
                        <p>
                            © {new Date().getFullYear()} Your Store. All
                            rights reserved.
                        </p>

                        <div className="flex gap-6">
                            <Link
                                href="/privacy"
                                className="hover:text-gray-900"
                            >
                                Privacy Policy
                            </Link>

                            <Link
                                href="/terms"
                                className="hover:text-gray-900"
                            >
                                Terms & Conditions
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}