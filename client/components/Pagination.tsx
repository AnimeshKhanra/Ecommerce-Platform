"use client";

interface Props {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

export default function Pagination({
    currentPage,
    totalPages,
    onPageChange,
}: Props) {
    return (
        <div className="flex gap-2 justify-center mt-8">
            <button
                disabled={currentPage === 1}
                onClick={() => onPageChange(currentPage - 1)}
                className="px-4 py-2 border rounded disabled:opacity-50"
            >
                Prev
            </button>

            <span className="px-4 py-2">
                {currentPage} / {totalPages}
            </span>

            <button
                disabled={currentPage === totalPages}
                onClick={() => onPageChange(currentPage + 1)}
                className="px-4 py-2 border rounded disabled:opacity-50"
            >
                Next
            </button>
        </div>
    );
}