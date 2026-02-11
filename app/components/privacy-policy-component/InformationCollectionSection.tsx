import { Database, Users, FileText, Mail, CheckCircle } from 'lucide-react';

export function InformationCollectionSection() {
  return (
    <section id="collection" className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm dark:shadow-gray-900/20 p-8 lg:p-10 border border-gray-200 dark:border-gray-700">
      <div className="flex items-center space-x-4 mb-6">
        <div className="w-12 h-12 bg-[#d97757] bg-opacity-20 dark:bg-[#d97757] dark:bg-opacity-20 rounded-xl flex items-center justify-center">
          <Database className="w-6 h-6 text-white" strokeWidth={2} />
        </div>
        <h2 className="text-3xl font-heading font-bold text-gray-900 dark:text-white">Information We Collect</h2>
      </div>

      <div className="space-y-8">
        {/* Information You Provide */}
        <div>
          <h3 className="text-xl font-heading font-bold text-gray-900 dark:text-white mb-4">
            Information You Provide
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="flex items-start space-x-3 p-4 bg-[#f5f5f0] dark:bg-gray-700 rounded-lg">
              <div className="w-10 h-10 bg-white dark:bg-gray-800 rounded-lg flex items-center justify-center shrink-0 border border-gray-200 dark:border-gray-600">
                <Users className="w-5 h-5 text-[#d97757] dark:text-[#d97757]" strokeWidth={2} />
              </div>
              <div>
                <h4 className="font-heading font-semibold text-gray-900 dark:text-white mb-1">Account Info</h4>
                <p className="text-sm text-gray-600 dark:text-gray-200 font-body">Username, email, encrypted password</p>
              </div>
            </div>
            <div className="flex items-start space-x-3 p-4 bg-[#f5f5f0] dark:bg-gray-700 rounded-lg">
              <div className="w-10 h-10 bg-white dark:bg-gray-800 rounded-lg flex items-center justify-center shrink-0 border border-gray-200 dark:border-gray-600">
                <FileText className="w-5 h-5 text-[#d97757] dark:text-[#d97757]" strokeWidth={2} />
              </div>
              <div>
                <h4 className="font-heading font-semibold text-gray-900 dark:text-white mb-1">Profile</h4>
                <p className="text-sm text-gray-600 dark:text-gray-200 font-body">Picture and personal details</p>
              </div>
            </div>
            <div className="flex items-start space-x-3 p-4 bg-[#f5f5f0] dark:bg-gray-700 rounded-lg">
              <div className="w-10 h-10 bg-white dark:bg-gray-800 rounded-lg flex items-center justify-center shrink-0 border border-gray-200 dark:border-gray-600">
                <Database className="w-5 h-5 text-[#d97757] dark:text-[#d97757]" strokeWidth={2} />
              </div>
              <div>
                <h4 className="font-heading font-semibold text-gray-900 dark:text-white mb-1">Content</h4>
                <p className="text-sm text-gray-600 dark:text-gray-200 font-body">Files and documents you upload</p>
              </div>
            </div>
            <div className="flex items-start space-x-3 p-4 bg-[#f5f5f0] dark:bg-gray-700 rounded-lg">
              <div className="w-10 h-10 bg-white dark:bg-gray-800 rounded-lg flex items-center justify-center shrink-0 border border-gray-200 dark:border-gray-600">
                <Mail className="w-5 h-5 text-[#d97757] dark:text-[#d97757]" strokeWidth={2} />
              </div>
              <div>
                <h4 className="font-heading font-semibold text-gray-900 dark:text-white mb-1">Messages</h4>
                <p className="text-sm text-gray-600 dark:text-gray-200 font-body">Support communications</p>
              </div>
            </div>
          </div>
        </div>

        {/* Automatic Collection */}
        <div>
          <h3 className="text-xl font-heading font-bold text-gray-900 dark:text-white mb-4">
            Information Collected Automatically
          </h3>
          <div className="space-y-3">
            <div className="flex items-start space-x-3 p-4 border border-gray-200 dark:border-gray-600 rounded-lg hover:border-[#d97757] transition-colors">
              <CheckCircle className="w-5 h-5 text-[#d97757] dark:text-[#d97757] shrink-0 mt-0.5" strokeWidth={2} />
              <div>
                <span className="font-heading font-semibold text-gray-900 dark:text-white">Usage Data:</span>
                <span className="text-gray-700 dark:text-gray-200 font-body ml-2">Pages visited, features used, time spent</span>
              </div>
            </div>
            <div className="flex items-start space-x-3 p-4 border border-gray-200 dark:border-gray-600 rounded-lg hover:border-[#d97757] transition-colors">
              <CheckCircle className="w-5 h-5 text-[#d97757] dark:text-[#d97757] shrink-0 mt-0.5" strokeWidth={2} />
              <div>
                <span className="font-heading font-semibold text-gray-900 dark:text-white">Device Info:</span>
                <span className="text-gray-700 dark:text-gray-200 font-body ml-2">Device type, OS, browser</span>
              </div>
            </div>
            <div className="flex items-start space-x-3 p-4 border border-gray-200 dark:border-gray-600 rounded-lg hover:border-[#d97757] transition-colors">
              <CheckCircle className="w-5 h-5 text-[#d97757] dark:text-[#d97757] shrink-0 mt-0.5" strokeWidth={2} />
              <div>
                <span className="font-heading font-semibold text-gray-900 dark:text-white">Log Data:</span>
                <span className="text-gray-700 dark:text-gray-200 font-body ml-2">IP addresses, access times</span>
              </div>
            </div>
            <div className="flex items-start space-x-3 p-4 border border-gray-200 dark:border-gray-600 rounded-lg hover:border-[#d97757] transition-colors">
              <CheckCircle className="w-5 h-5 text-[#d97757] dark:text-[#d97757] shrink-0 mt-0.5" strokeWidth={2} />
              <div>
                <span className="font-heading font-semibold text-gray-900 dark:text-white">Cookies:</span>
                <span className="text-gray-700 dark:text-gray-200 font-body ml-2">Tracking technologies</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

