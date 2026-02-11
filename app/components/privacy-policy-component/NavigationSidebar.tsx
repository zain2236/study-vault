import { Shield, Database, Eye, Users, Lock, FileText, Mail } from 'lucide-react';

export function NavigationSidebar() {
  return (
    <aside className="hidden lg:block lg:col-span-1">
      <div className="sticky top-8 bg-white dark:bg-gray-800 rounded-xl shadow-sm dark:shadow-gray-900/20 p-6 border border-gray-200 dark:border-gray-700">
        <h3 className="text-sm font-heading font-bold text-gray-900 dark:text-white uppercase tracking-wider mb-4">
          Quick Links
        </h3>
        <nav className="space-y-2">
          <a
            href="#introduction"
            className="flex items-center space-x-3 px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:text-[#d97757] hover:bg-[#f5f5f0] dark:hover:bg-gray-700 rounded-lg transition-colors group"
          >
            <Shield className="w-4 h-4 text-gray-700 dark:text-gray-200 group-hover:text-[#d97757] transition-colors" strokeWidth={2} />
            <span className="font-body text-gray-700 dark:text-gray-200">Introduction</span>
          </a>
          <a
            href="#collection"
            className="flex items-center space-x-3 px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:text-[#d97757] hover:bg-[#f5f5f0] dark:hover:bg-gray-700 rounded-lg transition-colors group"
          >
            <Database className="w-4 h-4 text-gray-700 dark:text-gray-200 group-hover:text-[#d97757] transition-colors" strokeWidth={2} />
            <span className="font-body text-gray-700 dark:text-gray-200">Information We Collect</span>
          </a>
          <a
            href="#usage"
            className="flex items-center space-x-3 px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:text-[#d97757] hover:bg-[#f5f5f0] dark:hover:bg-gray-700 rounded-lg transition-colors group"
          >
            <Eye className="w-4 h-4 text-gray-700 dark:text-gray-200 group-hover:text-[#d97757] transition-colors" strokeWidth={2} />
            <span className="font-body text-gray-700 dark:text-gray-200">How We Use Your Information</span>
          </a>
          <a
            href="#sharing"
            className="flex items-center space-x-3 px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:text-[#d97757] hover:bg-[#f5f5f0] dark:hover:bg-gray-700 rounded-lg transition-colors group"
          >
            <Users className="w-4 h-4 text-gray-700 dark:text-gray-200 group-hover:text-[#d97757] transition-colors" strokeWidth={2} />
            <span className="font-body text-gray-700 dark:text-gray-200">How We Share Information</span>
          </a>
          <a
            href="#security"
            className="flex items-center space-x-3 px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:text-[#d97757] hover:bg-[#f5f5f0] dark:hover:bg-gray-700 rounded-lg transition-colors group"
          >
            <Lock className="w-4 h-4 text-gray-700 dark:text-gray-200 group-hover:text-[#d97757] transition-colors" strokeWidth={2} />
            <span className="font-body text-gray-700 dark:text-gray-200">Data Security</span>
          </a>
          <a
            href="#rights"
            className="flex items-center space-x-3 px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:text-[#d97757] hover:bg-[#f5f5f0] dark:hover:bg-gray-700 rounded-lg transition-colors group"
          >
            <FileText className="w-4 h-4 text-gray-700 dark:text-gray-200 group-hover:text-[#d97757] transition-colors" strokeWidth={2} />
            <span className="font-body text-gray-700 dark:text-gray-200">Your Privacy Rights</span>
          </a>
          <a
            href="#contact"
            className="flex items-center space-x-3 px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:text-[#d97757] hover:bg-[#f5f5f0] dark:hover:bg-gray-700 rounded-lg transition-colors group"
          >
            <Mail className="w-4 h-4 text-gray-700 dark:text-gray-200 group-hover:text-[#d97757] transition-colors" strokeWidth={2} />
            <span className="font-body text-gray-700 dark:text-gray-200">Contact Us</span>
          </a>
        </nav>
      </div>
    </aside>
  );
}

