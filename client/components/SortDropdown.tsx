"use client";

interface Props {
    value: string;
    onChange: (value: string) => void;
}

export default function SortDropdown({ value, onChange }: Props) {
    return (
        <select
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="border rounded-lg px-4 py-2"

        >
            <option value="createdAt-desc">Newest</option>
            <option value="price-asc">Price Low to High</option>
            <option value="price-desc">Price High to Low</option>
        </select>
    )
}