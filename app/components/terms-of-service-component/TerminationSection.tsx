import { XCircle, Users, AlertTriangle } from 'lucide-react';

export function TerminationSection() {
  return (
    <section id="termination" className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm dark:shadow-gray-900/20 p-8 lg:p-10 border border-gray-200 dark:border-gray-700">
      <div className="flex items-center space-x-4 mb-6">
        <div className="w-12 h-12 bg-[#d97757] bg-opacity-20 dark:bg-[#d97757] dark:bg-opacity-20 rounded-xl flex items-center justify-center">
          <XCircle className="w-6 h-6 text-white" strokeWidth={2} />
        </div>
        <h2 className="text-3xl font-heading font-bold text-gray-900 dark:text-white">Account Termination</h2>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="p-6 border-2 border-gray-200 dark:border-gray-600 rounded-xl">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
              <Users className="w-4 h-4 text-blue-600 dark:text-blue-400" strokeWidth={2} />
            </div>
            <h3 className="font-heading font-bold text-gray-900 dark:text-white">By You</h3>
          </div>
          <p className="text-sm text-gray-700 dark:text-gray-200 font-body">
            You can delete your account anytime by contacting us or using the account deletion feature.
          </p>
        </div>

        <div className="p-6 border-2 border-red-200 dark:border-red-800 rounded-xl bg-red-50 dark:bg-red-900/20">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-8 h-8 bg-red-100 dark:bg-red-900/30 rounded-lg flex items-center justify-center">
              <AlertTriangle className="w-4 h-4 text-red-600 dark:text-red-400" strokeWidth={2} />
            </div>
            <h3 className="font-heading font-bold text-red-900 dark:text-red-200">By Us</h3>
          </div>
          <p className="text-sm text-red-800 dark:text-red-300 font-body">
            We may suspend or terminate your account immediately if you violate these terms or engage in fraudulent activity.
          </p>
        </div>
      </div>
    </section>
  );
}

