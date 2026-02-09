import { Search, Menu, User } from 'lucide-react';
import { Link } from 'react-router';

interface HeaderProps {
  sidebarOpen: boolean;
  userInfo: {
    userName: string;
    profileImg?: string | null;
  };
  setSidebarOpen: (open: boolean) => void;
  searchQuery?: string;
  onSearchChange?: (value: string) => void;
}

export function Header({ sidebarOpen, setSidebarOpen , userInfo, searchQuery = '', onSearchChange }: HeaderProps) {
  return (
    <nav className="bg-white dark:bg-gray-700 shadow-sm dark:shadow-gray-900/20 sticky top-0 z-40 border-b border-gray-200/60 dark:border-gray-600/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo & Mobile Menu Button */}
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden text-gray-700 dark:text-gray-300 hover:text-[#d97757] transition-colors"
            >
              <Menu className="w-6 h-6" />
            </button>
            
            <Link to="/user/dashboard" className="flex items-center space-x-2 group">
              <div className="relative">
                {/* Glow effect behind logo */}
                <div className="absolute inset-0 bg-[#d97757] rounded-xl blur-lg opacity-20 group-hover:opacity-35 transition-opacity"></div>
                {/* Logo icon */}
                <div className="relative w-9 h-9 rounded-xl flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
                  <img src="/assests/fav-icon.png" alt="logo" className="w-full h-full object-contain" />
                </div>
              </div>
              <span className="text-xl font-heading font-bold dark:text-white text-[#d97757] group-hover:text-[#c66847] transition-all duration-300 hidden sm:block">
                Dashboard
              </span>
            </Link>
          </div>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex flex-1 max-w-lg mx-8">
            <div className="relative w-full">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400 dark:text-gray-500" />
              </div>
              <input
                type="text"
                placeholder="Search resources..."
                value={searchQuery}
                onChange={(e) => onSearchChange?.(e.target.value)}
                className="block w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-600 rounded-lg focus:ring-2 focus:ring-[#d97757] focus:border-[#d97757] transition-all outline-none text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-400"
              />
            </div>
          </div>

          {/* User Profile */}
          <div className="flex items-center space-x-2">
            <User className="w-5 h-5 text-[#d97757] dark:text-gray-300" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {userInfo.userName}
            </span>
          </div>
        </div>
      </div>

      {/* Mobile Search */}
      <div className="md:hidden px-4 sm:px-6 lg:px-8 pb-4">
        <div className="max-w-7xl mx-auto">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400 dark:text-gray-500" />
            </div>
            <input
              type="text"
              placeholder="Search resources..."
              value={searchQuery}
              onChange={(e) => onSearchChange?.(e.target.value)}
              className="block w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-600 rounded-lg focus:ring-2 focus:ring-[#d97757] focus:border-[#d97757] transition-all outline-none text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-400"
            />
          </div>
        </div>
      </div>
    </nav>
  );
}
