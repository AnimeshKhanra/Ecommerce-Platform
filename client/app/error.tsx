"use client";

export default function Error({
    error,
    reset,
}: {
    error: Error;
    reset: () => void;
}) {
    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="text-center">
                <h1 className="text-4xl font-bold text-red-500">
                    Something went wrong
                </h1>

                <p className="mt-4 text-slate-600">
                    {error.message}
                </p>

                <button
                    onClick={() => reset()}
                    className="mt-6 px-6 py-3 bg-indigo-600 text-white rounded-xl"
                >
                    Try Again
                </button>
            </div>
        </div>
    );
}