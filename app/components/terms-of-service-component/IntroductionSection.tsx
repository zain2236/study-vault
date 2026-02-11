import { BookOpen } from 'lucide-react';

export function IntroductionSection() {
  return (
    <section id="introduction" className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm dark:shadow-gray-900/20 p-8 lg:p-10 border border-gray-200 dark:border-gray-700">
      <div className="flex items-center space-x-4 mb-6">
        <div className="w-12 h-12 bg-[#d97757] bg-opacity-20 dark:bg-[#d97757] dark:bg-opacity-20 rounded-xl flex items-center justify-center">
          <BookOpen className="w-6 h-6 text-white" strokeWidth={2} />
        </div>
        <h2 className="text-3xl font-heading font-bold text-gray-900 dark:text-white">Introduction</h2>
      </div>
      
      <div className="space-y-4">
        <p className="text-gray-700 dark:text-gray-200 font-body leading-relaxed">
          Welcome to StudyVault! These Terms of Service govern your use of our platform. By using StudyVault, you agree to these terms.
        </p>
        <div className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-400 dark:border-yellow-600 p-4 rounded-r-lg">
          <p className="text-sm text-yellow-800 dark:text-yellow-200 font-body">
            <strong className="font-heading">Important:</strong> If you don't agree with these terms, please don't use our service.
          </p>
        </div>
      </div>
    </section>
  );
}

