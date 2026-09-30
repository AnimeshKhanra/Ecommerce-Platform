"use client";

import { useEffect } from "react";

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <main className="flex min-h-[60vh] items-center justify-center px-6">
            <div className="max-w-md text-center">
                <h1 className="text-3xl font-bold text-gray-900">
                    Something went wrong
                </h1>

                <p className="mt-4 text-gray-600">
                    We couldn't load the store right now.
                    Please try again.
                </p>

                <button
                    type="button"
                    onClick={() => reset()}
                    className="mt-8 rounded-lg bg-black px-6 py-3 text-sm font-semibold text-white transition hover:bg-gray-800"
                >
                    Try Again
                </button>
            </div>
        </main>
    );
}