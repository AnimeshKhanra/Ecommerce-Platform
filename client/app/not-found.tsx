import Link from "next/link";

export default function NotFound() {
    return (
        <div className="min-h-screen flex items-center justify-center px-6">
            <div className="text-center">
                <h1 className="text-8xl font-bold text-indigo-600">
                    404
                </h1>

                <h2 className="text-3xl font-bold mt-4">
                    Page Not Found
                </h2>

                <p className="text-slate-500 mt-4">
                    The page you're looking for doesn't exist.
                </p>

                <Link
                    href="/"
                    className="inline-block mt-8 bg-indigo-600 text-white px-6 py-3 rounded-xl"
                >
                    Back Home
                </Link>
            </div>
        </div>
    );
}