import { BookOpen, GraduationCap, Globe, AlertCircle, RefreshCw, Mail, Scale } from 'lucide-react';

export function NavigationSidebar() {
  return (
    <aside className="hidden lg:block lg:col-span-1">
      <div className="sticky top-8 bg-white dark:bg-gray-800 rounded-xl shadow-sm dark:shadow-gray-900/20 p-6 border border-gray-200 dark:border-gray-700">
        <h3 className="text-sm font-heading font-bold text-gray-900 dark:text-white uppercase tracking-wider mb-4">
          Sections
        </h3>
        <nav className="space-y-2">
          <a
            href="#introduction"
            className="flex items-center space-x-3 px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:text-[#d97757] hover:bg-[#f5f5f0] dark:hover:bg-gray-700 rounded-lg transition-colors group"
          >
            <BookOpen className="w-4 h-4 text-gray-700 dark:text-gray-200 group-hover:text-[#d97757] transition-colors" strokeWidth={2} />
            <span className="font-body text-gray-700 dark:text-gray-200">Introduction</span>
          </a>
          <a
            href="#educational-disclaimer"
            className="flex items-center space-x-3 px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:text-[#d97757] hover:bg-[#f5f5f0] dark:hover:bg-gray-700 rounded-lg transition-colors group"
          >
            <GraduationCap className="w-4 h-4 text-gray-700 dark:text-gray-200 group-hover:text-[#d97757] transition-colors" strokeWidth={2} />
            <span className="font-body text-gray-700 dark:text-gray-200">Educational Use</span>
          </a>
          <a
            href="#external-links"
            className="flex items-center space-x-3 px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:text-[#d97757] hover:bg-[#f5f5f0] dark:hover:bg-gray-700 rounded-lg transition-colors group"
          >
            <Globe className="w-4 h-4 text-gray-700 dark:text-gray-200 group-hover:text-[#d97757] transition-colors" strokeWidth={2} />
            <span className="font-body text-gray-700 dark:text-gray-200">External Links</span>
          </a>
          <a
            href="#errors-omissions"
            className="flex items-center space-x-3 px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:text-[#d97757] hover:bg-[#f5f5f0] dark:hover:bg-gray-700 rounded-lg transition-colors group"
          >
            <AlertCircle className="w-4 h-4 text-gray-700 dark:text-gray-200 group-hover:text-[#d97757] transition-colors" strokeWidth={2} />
            <span className="font-body text-gray-700 dark:text-gray-200">Errors & Omissions</span>
          </a>
          <a
            href="#fair-use"
            className="flex items-center space-x-3 px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:text-[#d97757] hover:bg-[#f5f5f0] dark:hover:bg-gray-700 rounded-lg transition-colors group"
          >
            <Scale className="w-4 h-4 text-gray-700 dark:text-gray-200 group-hover:text-[#d97757] transition-colors" strokeWidth={2} />
            <span className="font-body text-gray-700 dark:text-gray-200">Fair Use</span>
          </a>
          <a
            href="#contact"
            className="flex items-center space-x-3 px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:text-[#d97757] hover:bg-[#f5f5f0] dark:hover:bg-gray-700 rounded-lg transition-colors group"
          >
            <Mail className="w-4 h-4 text-gray-700 dark:text-gray-200 group-hover:text-[#d97757] transition-colors" strokeWidth={2} />
            <span className="font-body text-gray-700 dark:text-gray-200">Contact</span>
          </a>
        </nav>
      </div>
    </aside>
  );
}
