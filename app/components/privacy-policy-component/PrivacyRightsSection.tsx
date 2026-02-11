import { FileText, Eye, AlertCircle, Database, Mail, Shield } from 'lucide-react';

export function PrivacyRightsSection() {
  return (
    <section id="rights" className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm dark:shadow-gray-900/20 p-8 lg:p-10 border border-gray-200 dark:border-gray-700">
      <div className="flex items-center space-x-4 mb-6">
        <div className="w-12 h-12 bg-[#d97757] bg-opacity-20 dark:bg-[#d97757] dark:bg-opacity-20 rounded-xl flex items-center justify-center">
          <FileText className="w-6 h-6 text-white" strokeWidth={2} />
        </div>
        <h2 className="text-3xl font-heading font-bold text-gray-900 dark:text-white">Your Privacy Rights</h2>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        <div className="p-6 border-2 border-gray-200 dark:border-gray-600 rounded-xl hover:border-[#d97757] hover:shadow-md transition-all group">
          <div className="w-10 h-10 bg-[#d97757] bg-opacity-10 dark:bg-[#d97757] dark:bg-opacity-20 rounded-lg flex items-center justify-center mb-4 group-hover:bg-[#d97757] transition-colors">
            <Eye className="w-5 h-5 text-white " strokeWidth={2} />
          </div>
          <h4 className="font-heading font-bold text-gray-900 dark:text-white mb-2">Access</h4>
          <p className="text-sm text-gray-600 dark:text-gray-200 font-body">Request your data</p>
        </div>
        <div className="p-6 border-2 border-gray-200 dark:border-gray-600 rounded-xl hover:border-[#d97757] hover:shadow-md transition-all group">
          <div className="w-10 h-10 bg-[#d97757] bg-opacity-10 dark:bg-[#d97757] dark:bg-opacity-20 rounded-lg flex items-center justify-center mb-4 group-hover:bg-[#d97757] transition-colors">
            <FileText className="w-5 h-5 text-white " strokeWidth={2} />
          </div>
          <h4 className="font-heading font-bold text-gray-900 dark:text-white mb-2">Correction</h4>
          <p className="text-sm text-gray-600 dark:text-gray-200 font-body">Update information</p>
        </div>
        <div className="p-6 border-2 border-gray-200 dark:border-gray-600 rounded-xl hover:border-[#d97757] hover:shadow-md transition-all group">
          <div className="w-10 h-10 bg-[#d97757] bg-opacity-10 dark:bg-[#d97757] dark:bg-opacity-20 rounded-lg flex items-center justify-center mb-4 group-hover:bg-[#d97757] transition-colors">
            <AlertCircle className="w-5 h-5 text-white " strokeWidth={2} />
          </div>
          <h4 className="font-heading font-bold text-gray-900 dark:text-white mb-2">Deletion</h4>
          <p className="text-sm text-gray-600 dark:text-gray-200 font-body">Remove your data</p>
        </div>
        <div className="p-6 border-2 border-gray-200 dark:border-gray-600 rounded-xl hover:border-[#d97757] hover:shadow-md transition-all group">
          <div className="w-10 h-10 bg-[#d97757] bg-opacity-10 dark:bg-[#d97757] dark:bg-opacity-20 rounded-lg flex items-center justify-center mb-4 group-hover:bg-[#d97757] transition-colors">
            <Database className="w-5 h-5 text-white " strokeWidth={2} />
          </div>
          <h4 className="font-heading font-bold text-gray-900 dark:text-white mb-2">Portability</h4>
          <p className="text-sm text-gray-600 dark:text-gray-200 font-body">Export your data</p>
        </div>
        <div className="p-6 border-2 border-gray-200 dark:border-gray-600 rounded-xl hover:border-[#d97757] hover:shadow-md transition-all group">
          <div className="w-10 h-10 bg-[#d97757] bg-opacity-10 dark:bg-[#d97757] dark:bg-opacity-20 rounded-lg flex items-center justify-center mb-4 group-hover:bg-[#d97757] transition-colors">
            <Mail className="w-5 h-5 text-white " strokeWidth={2} />
          </div>
          <h4 className="font-heading font-bold text-gray-900 dark:text-white mb-2">Opt-Out</h4>
          <p className="text-sm text-gray-600 dark:text-gray-200 font-body">Unsubscribe</p>
        </div>
        <div className="p-6 border-2 border-gray-200 dark:border-gray-600 rounded-xl hover:border-[#d97757] hover:shadow-md transition-all group">
          <div className="w-10 h-10 bg-[#d97757] bg-opacity-10 dark:bg-[#d97757] dark:bg-opacity-20 rounded-lg flex items-center justify-center mb-4 group-hover:bg-[#d97757] transition-colors">
            <Shield className="w-5 h-5 text-white " strokeWidth={2} />
          </div>
          <h4 className="font-heading font-bold text-gray-900 dark:text-white mb-2">Objection</h4>
          <p className="text-sm text-gray-600 dark:text-gray-200 font-body">Object to processing</p>
        </div>
      </div>
    </section>
  );
}

