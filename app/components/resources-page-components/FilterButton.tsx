import { memo } from 'react';

interface FilterButtonProps {
  label: string;
  isActive: boolean;
  onClick: () => void;
  count?: number;
}

export const FilterButton = memo(function FilterButton({ 
  label, 
  isActive, 
  onClick, 
  count 
}: FilterButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`px-3.5 py-2 rounded-lg text-xs font-semibold transition-all duration-200 ${
        isActive
          ? 'bg-[#d97757] text-white shadow-md shadow-[#d97757]/30'
          : 'bg-gray-100 dark:bg-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-500 hover:scale-105'
      }`}
    >
      {label}
      {count !== undefined && (
        <span className="ml-1.5 text-xs opacity-75">({count})</span>
      )}
    </button>
  );
});

