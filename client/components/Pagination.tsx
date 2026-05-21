'use client';

import {
    ChevronLeft,
    ChevronRight,
} from 'lucide-react';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

export default function Pagination({
    currentPage,
    totalPages,
    onPageChange,
}: PaginationProps) {
    if (totalPages <= 1) return null;

    return (
        <div className="flex justify-center items-center gap-3 mt-10">
            <button
                disabled={currentPage === 1}
                onClick={() =>
                    onPageChange(currentPage - 1)
                }
                className="p-2 border rounded-lg disabled:opacity-50"
            >
                <ChevronLeft />
            </button>

            {Array.from(
                { length: totalPages },
                (_, i) => i + 1
            ).map((page) => (
                <button
                    key={page}
                    onClick={() => onPageChange(page)}
                    className={`px-4 py-2 rounded-lg ${currentPage === page
                            ? 'bg-indigo-600 text-white'
                            : 'border'
                        }`}
                >
                    {page}
                </button>
            ))}

            <button
                disabled={currentPage === totalPages}
                onClick={() =>
                    onPageChange(currentPage + 1)
                }
                className="p-2 border rounded-lg disabled:opacity-50"
            >
                <ChevronRight />
            </button>
        </div>
    );
}