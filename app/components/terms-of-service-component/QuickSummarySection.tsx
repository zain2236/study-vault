import { Zap, CheckCircle } from 'lucide-react';

export function QuickSummarySection() {
  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border border-blue-200 dark:border-blue-800 rounded-2xl p-8">
      <div className="flex items-start space-x-4">
        <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center shrink-0">
          <Zap className="w-6 h-6 text-white" strokeWidth={2} />
        </div>
        <div>
          <h3 className="text-2xl font-heading font-bold text-blue-900 dark:text-blue-200 mb-3">TL;DR - Key Points</h3>
          <ul className="space-y-2 text-blue-800 dark:text-blue-300 font-body">
            <li className="flex items-start space-x-2">
              <CheckCircle className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" strokeWidth={2} />
              <span>Be respectful and follow academic integrity</span>
            </li>
            <li className="flex items-start space-x-2">
              <CheckCircle className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" strokeWidth={2} />
              <span>You own your content, but we can use it to operate the service</span>
            </li>
            <li className="flex items-start space-x-2">
              <CheckCircle className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" strokeWidth={2} />
              <span>Don't upload copyrighted material without permission</span>
            </li>
            <li className="flex items-start space-x-2">
              <CheckCircle className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" strokeWidth={2} />
              <span>We can terminate accounts that violate these terms</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

