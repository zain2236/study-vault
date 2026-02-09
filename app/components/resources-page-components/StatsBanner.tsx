import { FileText, Users, BookOpen } from 'lucide-react';
import { StatCard } from './StatCard';

interface StatsBannerProps {
  resourceCount: number;
  userCount: number;
}

export function StatsBanner({ resourceCount, userCount }: StatsBannerProps) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 mb-8">
      <StatCard icon={FileText} value={resourceCount} label="Total Resources" />
      <StatCard icon={Users} value={userCount} label="Contributors" />
      <StatCard icon={BookOpen} value="8" label="Semesters" />
    </div>
  );
}

