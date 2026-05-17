'use client';

interface Props {
    value: string;
    onChange: (value: string) => void;
}

export default function SearchBar({ value, onChange }: Props) {
    return (
        <input
            type="text"
            placeholder="Search Product...."
            value={value}
            onChange={(e) => e.target.value}
            className="w-full border rounded-lg px-4 py-2 outline-none"
        />
    );
}
