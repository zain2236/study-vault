import { BookOpen, Search, Users, LogOut, X , Home } from 'lucide-react';
import { Form, Link } from 'react-router';

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

export function Sidebar({ sidebarOpen, setSidebarOpen }: SidebarProps) {
  return (
    <>
      {/* Sidebar - Desktop */}
      <aside className="hidden lg:flex lg:flex-col lg:w-64 bg-white dark:bg-gray-700 shadow-sm dark:shadow-gray-900/20 min-h-[calc(100vh-4rem)] sticky top-16 border-r border-gray-200/60 dark:border-gray-600/50">
        <nav className="flex-1 p-4 space-y-2">
          <Link to="/user/dashboard" className="flex items-center space-x-3 px-4 py-3 bg-[#d97757]/10 dark:bg-[#d97757]/20 text-[#d97757] rounded-lg font-semibold">
            <BookOpen className="w-5 h-5" />
            <span>My Resources</span>
          </Link>
          <Link to="/resources" className="flex items-center space-x-3 px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-lg transition-colors">
            <Search className="w-5 h-5" />
            <span>Browse All</span>
          </Link>
          <Link to="/" className="flex items-center space-x-3 px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-lg transition-colors">
            <Home className="w-5 h-5" />
            <span>Home</span>
          </Link>
      

          <div className="pt-4 mt-4 border-t border-gray-200 dark:border-gray-600">
            <p className="px-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
              Quick Filters
            </p>
            <a href="#" className="flex items-center justify-between px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-lg transition-colors">
              <span>Semester 3</span>
              <span className="text-xs bg-gray-200 dark:bg-gray-600 px-2 py-1 rounded-full text-gray-700 dark:text-gray-300">12</span>
            </a>
            <a href="#" className="flex items-center justify-between px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-lg transition-colors">
              <span>Semester 4</span>
              <span className="text-xs bg-gray-200 dark:bg-gray-600 px-2 py-1 rounded-full text-gray-700 dark:text-gray-300">8</span>
            </a>
            <a href="#" className="flex items-center justify-between px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-lg transition-colors">
              <span>Semester 5</span>
              <span className="text-xs bg-gray-200 dark:bg-gray-600 px-2 py-1 rounded-full text-gray-700 dark:text-gray-300">5</span>
            </a>
          </div>
        </nav>

        <div className="p-4 border-t border-gray-200 dark:border-gray-600">
          <Form method="post" action="/logout">
          
          <button type="submit" className="flex items-center space-x-3 px-4 py-3 text-gray-700 dark:text-gray-300 hover:text-[#d97757] rounded-lg transition-colors w-full">
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </button>
          </Form>
        </div>
      </aside>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-gray-900/50 dark:bg-gray-900/70" onClick={() => setSidebarOpen(false)}>
          <aside className="absolute left-0 top-0 bottom-0 w-64 bg-white dark:bg-gray-700 shadow-xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-600">
              <span className="text-lg font-bold text-gray-900 dark:text-gray-100">Menu</span>
              <button onClick={() => setSidebarOpen(false)} className="text-gray-700 dark:text-gray-300">
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <nav className="flex-1 p-4 space-y-2">
              <Link to="/user/dashboard" className="flex items-center space-x-3 px-4 py-3 bg-[#d97757]/10 dark:bg-[#d97757]/20 text-[#d97757] rounded-lg font-semibold">
                <BookOpen className="w-5 h-5" />
                <span>My Resources</span>
              </Link>
              <Link to="/resources" className="flex items-center space-x-3 px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-lg transition-colors">
                <Search className="w-5 h-5" />
                <span>Browse All</span>
              </Link>
              <Link to="/" className="flex items-center space-x-3 px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-lg transition-colors">
                <Users className="w-5 h-5" />
                <span>Home</span>
              </Link>
              <Form method="post" action="/logout">
                <button type="submit" className="flex items-center space-x-3 px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-lg transition-colors w-full">
                  <LogOut className="w-5 h-5" />
                  <span>Logout</span>
                </button>
              </Form>
            </nav>
          </aside>
        </div>
      )}
    </>
  );
}
