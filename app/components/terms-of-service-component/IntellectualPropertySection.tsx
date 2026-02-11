import { Shield, Ban } from 'lucide-react';

export function IntellectualPropertySection() {
  const restrictions = [
    'Don\'t copy or modify our source code',
    'Don\'t use our trademarks without permission',
    'Don\'t reverse engineer our software',
    'Don\'t create derivative works'
  ];

  return (
    <section id="ip" className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm dark:shadow-gray-900/20 p-8 lg:p-10 border border-gray-200 dark:border-gray-700">
      <div className="flex items-center space-x-4 mb-6">
        <div className="w-12 h-12 bg-[#d97757] bg-opacity-20 dark:bg-[#d97757] dark:bg-opacity-20 rounded-xl flex items-center justify-center">
          <Shield className="w-6 h-6 text-white" strokeWidth={2} />
        </div>
        <h2 className="text-3xl font-heading font-bold text-gray-900 dark:text-white">Intellectual Property</h2>
      </div>

      <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border border-purple-200 dark:border-purple-800 rounded-xl p-6">
        <p className="text-gray-700 dark:text-gray-200 font-body leading-relaxed mb-4">
          The StudyVault platform, including its design, features, and functionality, is protected by international copyright and trademark laws.
        </p>
        <ul className="space-y-2">
          {restrictions.map((item, idx) => (
            <li key={idx} className="flex items-start space-x-2 text-sm text-gray-700 dark:text-gray-200 font-body">
              <Ban className="w-4 h-4 text-purple-600 dark:text-purple-400 shrink-0 mt-0.5" strokeWidth={2} />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

