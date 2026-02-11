import { Users, UserCheck, Lock, AlertTriangle } from 'lucide-react';

export function UserAccountsSection() {
  return (
    <section id="accounts" className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm dark:shadow-gray-900/20 p-8 lg:p-10 border border-gray-200 dark:border-gray-700">
      <div className="flex items-center space-x-4 mb-6">
        <div className="w-12 h-12 bg-[#d97757] bg-opacity-20 dark:bg-[#d97757] dark:bg-opacity-20 rounded-xl flex items-center justify-center">
          <Users className="w-6 h-6 text-white" strokeWidth={2} />
        </div>
        <h2 className="text-3xl font-heading font-bold text-gray-900 dark:text-white">User Accounts</h2>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="p-6 border-2 border-gray-200 dark:border-gray-600 rounded-xl hover:border-[#d97757] hover:shadow-md transition-all">
          <div className="w-10 h-10 bg-[#d97757] bg-opacity-10 dark:bg-[#d97757] dark:bg-opacity-20 rounded-lg flex items-center justify-center mb-4">
            <UserCheck className="w-5 h-5 text-white" strokeWidth={2} />
          </div>
          <h3 className="font-heading font-bold text-gray-900 dark:text-white mb-2">Account Creation</h3>
          <p className="text-sm text-gray-600 dark:text-gray-200 font-body">Provide accurate and complete information when registering</p>
        </div>
        <div className="p-6 border-2 border-gray-200 dark:border-gray-600 rounded-xl hover:border-[#d97757] hover:shadow-md transition-all">
          <div className="w-10 h-10 bg-[#d97757] bg-opacity-10 dark:bg-[#d97757] dark:bg-opacity-20 rounded-lg flex items-center justify-center mb-4">
            <Lock className="w-5 h-5 text-white" strokeWidth={2} />
          </div>
          <h3 className="font-heading font-bold text-gray-900 dark:text-white mb-2">Security</h3>
          <p className="text-sm text-gray-600 dark:text-gray-200 font-body">Keep your password secure and notify us of unauthorized access</p>
        </div>
        <div className="p-6 border-2 border-gray-200 dark:border-gray-600 rounded-xl hover:border-[#d97757] hover:shadow-md transition-all">
          <div className="w-10 h-10 bg-[#d97757] bg-opacity-10 dark:bg-[#d97757] dark:bg-opacity-20 rounded-lg flex items-center justify-center mb-4">
            <AlertTriangle className="w-5 h-5 text-white" strokeWidth={2} />
          </div>
          <h3 className="font-heading font-bold text-gray-900 dark:text-white mb-2">Age Requirement</h3>
          <p className="text-sm text-gray-600 dark:text-gray-200 font-body">Must be 13+ years old. If under 18, parental consent required</p>
        </div>
      </div>
    </section>
  );
}

