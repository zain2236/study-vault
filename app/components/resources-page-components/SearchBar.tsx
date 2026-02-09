import { Search } from 'lucide-react';

interface SearchBarProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
}

export function SearchBar({ searchQuery, onSearchChange }: SearchBarProps) {
  return (
    <div className="flex-1 relative group">
      <div className="absolute inset-0 bg-[#d97757]/10 dark:bg-[#d97757]/20 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      <div className="relative bg-white/80 dark:bg-gray-700/80 backdrop-blur-sm rounded-xl shadow-sm dark:shadow-gray-900/20 border border-gray-200/60 dark:border-gray-600/50 group-hover:border-[#d97757]/40 transition-all duration-300">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400 dark:text-gray-500 group-hover:text-[#d97757] transition-colors" />
          </div>
          <input
            type="text"
            placeholder="Search by subject, title, or keyword..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="block w-full pl-12 pr-4 py-3 border-0 bg-transparent text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-[#d97757]/50 focus:outline-none transition-all rounded-xl"
          />
        </div>
      </div>
    </div>
  );
}

