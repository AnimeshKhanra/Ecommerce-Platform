import Link from "next/link";

export default function Navbar() {
  return (
    <header className="bg-white border-b shadow-sm">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link
          href="/"
          className="text-2xl font-bold text-indigo-600"
        >
          ECOM
        </Link>

        <nav className="flex gap-6">
          <Link href="/products">Products</Link>
          <Link href="/cart">Cart</Link>
          <Link href="/orders">Orders</Link>
        </nav>
      </div>
    </header>
  );
}