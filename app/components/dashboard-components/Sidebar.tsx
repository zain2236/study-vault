import { BookOpen, Search, Download, Users, LogOut, X } from 'lucide-react';

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

export function Sidebar({ sidebarOpen, setSidebarOpen }: SidebarProps) {
  return (
    <>
      {/* Sidebar - Desktop */}
      <aside className="hidden lg:flex lg:flex-col lg:w-64 bg-white shadow-sm min-h-[calc(100vh-4rem)] sticky top-16">
        <nav className="flex-1 p-4 space-y-2">
          <a href="#" className="flex items-center space-x-3 px-4 py-3 bg-[#d97757]/10 text-[#d97757] rounded-lg font-semibold">
            <BookOpen className="w-5 h-5" />
            <span>My Resources</span>
          </a>
          <a href="#" className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
            <Search className="w-5 h-5" />
            <span>Browse All</span>
          </a>
          <a href="#" className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
            <Download className="w-5 h-5" />
            <span>Downloads</span>
          </a>
          <a href="#" className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
            <Users className="w-5 h-5" />
            <span>Community</span>
          </a>

          <div className="pt-4 mt-4 border-t border-gray-200">
            <p className="px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
              Quick Filters
            </p>
            <a href="#" className="flex items-center justify-between px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
              <span>Semester 3</span>
              <span className="text-xs bg-gray-200 px-2 py-1 rounded-full">12</span>
            </a>
            <a href="#" className="flex items-center justify-between px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
              <span>Semester 4</span>
              <span className="text-xs bg-gray-200 px-2 py-1 rounded-full">8</span>
            </a>
            <a href="#" className="flex items-center justify-between px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
              <span>Semester 5</span>
              <span className="text-xs bg-gray-200 px-2 py-1 rounded-full">5</span>
            </a>
          </div>
        </nav>

        <div className="p-4 border-t border-gray-200">
          <button className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:text-[#d97757] rounded-lg transition-colors w-full">
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-gray-900/50" onClick={() => setSidebarOpen(false)}>
          <aside className="absolute left-0 top-0 bottom-0 w-64 bg-white shadow-xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between p-4 border-b">
              <span className="text-lg font-bold text-gray-900">Menu</span>
              <button onClick={() => setSidebarOpen(false)} className="text-gray-700">
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <nav className="flex-1 p-4 space-y-2">
              <a href="#" className="flex items-center space-x-3 px-4 py-3 bg-[#d97757]/10 text-[#d97757] rounded-lg font-semibold">
                <BookOpen className="w-5 h-5" />
                <span>My Resources</span>
              </a>
              <a href="#" className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
                <Search className="w-5 h-5" />
                <span>Browse All</span>
              </a>
              <a href="#" className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
                <Download className="w-5 h-5" />
                <span>Downloads</span>
              </a>
              <a href="#" className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
                <Users className="w-5 h-5" />
                <span>Community</span>
              </a>
              <a href="#" className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
                <LogOut className="w-5 h-5" />
                <span>Logout</span>
              </a>
            </nav>
          </aside>
        </div>
      )}
    </>
  );
}
