import { BookOpen, Search, Bell, Settings, Menu } from 'lucide-react';

interface HeaderProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

export function Header({ sidebarOpen, setSidebarOpen }: HeaderProps) {
  return (
    <nav className="bg-white shadow-sm sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo & Mobile Menu Button */}
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden text-gray-700 hover:text-[#d97757] transition-colors"
            >
              <Menu className="w-6 h-6" />
            </button>
            
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-[#d97757] rounded-lg flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900 hidden sm:block">Dashbord</span>
            </div>
          </div>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex flex-1 max-w-lg mx-8">
            <div className="relative w-full">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search resources..."
                className="block w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d97757] focus:border-[#d97757] transition-all outline-none"
              />
            </div>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            <button className="relative text-gray-700 hover:text-[#d97757] transition-colors">
              <Bell className="w-6 h-6" />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#d97757] rounded-full text-xs text-white flex items-center justify-center">3</span>
            </button>
            
            <button className="text-gray-700 hover:text-[#d97757] transition-colors">
              <Settings className="w-6 h-6" />
            </button>

            {/* User Avatar */}
            <div className="flex items-center space-x-2 cursor-pointer group">
              <div className="w-9 h-9 bg-[#d97757] rounded-full flex items-center justify-center text-white font-semibold">
                JD
              </div>
              <span className="hidden lg:block text-sm font-medium text-gray-700 group-hover:text-[#d97757] transition-colors">
                John Doe
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Search */}
      <div className="md:hidden px-4 pb-4">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search resources..."
            className="block w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d97757] focus:border-[#d97757] transition-all outline-none"
          />
        </div>
      </div>
    </nav>
  );
}
