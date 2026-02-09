import { memo } from 'react';
import type { LucideIcon } from 'lucide-react';

interface StatCardProps {
  icon: LucideIcon;
  value: string | number;
  label: string;
}

export const StatCard = memo(function StatCard({ icon: Icon, value, label }: StatCardProps) {
  return (
    <div className="group bg-white/80 dark:bg-gray-700/80 backdrop-blur-sm rounded-xl p-4 shadow-sm dark:shadow-gray-900/20 border border-gray-200/60 dark:border-gray-600/50 hover:shadow-md dark:hover:shadow-gray-900/40 hover:border-[#d97757]/30 transition-all duration-300">
      <div className="flex items-center space-x-3">
        <div className="relative">
          <div className="absolute inset-0 bg-[#d97757] rounded-lg blur-md opacity-20 group-hover:opacity-30 transition-opacity"></div>
          <div className="relative w-10 h-10 bg-[#d97757]/10 dark:bg-[#d97757]/20 rounded-lg flex items-center justify-center">
            <Icon className="w-5 h-5 text-[#d97757]" />
          </div>
        </div>
        <div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">{value}</h3>
          <p className="text-xs font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wider">{label}</p>
        </div>
      </div>
    </div>
  );
});

