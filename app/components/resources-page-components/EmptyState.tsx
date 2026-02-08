import { Search } from 'lucide-react';

interface EmptyStateProps {
  onClearFilters: () => void;
}

export function EmptyState({ onClearFilters }: EmptyStateProps) {
  return (
    <div className="bg-white/80 dark:bg-gray-700/80 backdrop-blur-sm rounded-2xl p-12 lg:p-16 text-center shadow-sm dark:shadow-gray-900/20 border border-gray-200/60 dark:border-gray-600/50">
      <div className="relative w-24 h-24 mx-auto mb-6">
        <div className="absolute inset-0 bg-[#d97757] rounded-full blur-2xl opacity-20"></div>
        <div className="relative w-24 h-24 bg-[#d97757]/10 dark:bg-[#d97757]/20 rounded-full flex items-center justify-center">
          <Search className="w-12 h-12 text-[#d97757]" />
        </div>
      </div>
      <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-3">No Resources Found</h3>
      <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto">
        Try adjusting your filters or search query to find what you're looking for
      </p>
      <button
        onClick={onClearFilters}
        className="bg-[#d97757] text-white px-8 py-3 rounded-xl hover:bg-[#c66847] transition-all transform hover:scale-105 shadow-lg shadow-[#d97757]/30 font-semibold"
      >
        Clear Filters
      </button>
    </div>
  );
}

