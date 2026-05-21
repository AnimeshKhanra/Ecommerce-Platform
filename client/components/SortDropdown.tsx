'use client';

import { ArrowUpDown } from 'lucide-react';

interface SortDropdownProps {
  sortBy: string;
  order: 'asc' | 'desc';
  onSortChange: (
    sortBy: string,
    order: 'asc' | 'desc'
  ) => void;
}

export default function SortDropdown({
  sortBy,
  order,
  onSortChange,
}: SortDropdownProps) {
  const currentValue = `${sortBy}-${order}`;

  const handleChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const [field, direction] =
      e.target.value.split('-');

    onSortChange(
      field,
      direction as 'asc' | 'desc'
    );
  };

  return (
    <div className="flex items-center gap-2 bg-white px-4 py-3 rounded-xl border border-slate-200">
      <ArrowUpDown className="w-4 h-4 text-slate-400" />

      <select
        value={currentValue}
        onChange={handleChange}
        className="bg-transparent focus:outline-none"
      >
        <option value="createdAt-desc">
          Newest
        </option>
        <option value="price-asc">
          Price Low → High
        </option>
        <option value="price-desc">
          Price High → Low
        </option>
        <option value="name-asc">
          Name A → Z
        </option>
      </select>
    </div>
  );
}