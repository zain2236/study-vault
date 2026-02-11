import { Upload, CheckCircle, Globe, Shield } from 'lucide-react';

export function UserContentSection() {
  return (
    <section id="content" className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm dark:shadow-gray-900/20 p-8 lg:p-10 border border-gray-200 dark:border-gray-700">
      <div className="flex items-center space-x-4 mb-6">
        <div className="w-12 h-12 bg-[#d97757] bg-opacity-20 dark:bg-[#d97757] dark:bg-opacity-20 rounded-xl flex items-center justify-center">
          <Upload className="w-6 h-6 text-white" strokeWidth={2} />
        </div>
        <h2 className="text-3xl font-heading font-bold text-gray-900 dark:text-white">User Content Rights</h2>
      </div>

      <div className="space-y-6">
        <div className="flex items-start space-x-4 p-6 bg-[#f5f5f0] dark:bg-gray-700 rounded-xl">
          <div className="w-10 h-10 bg-[#d97757] rounded-lg flex items-center justify-center shrink-0">
            <CheckCircle className="w-5 h-5 text-white" strokeWidth={2} />
          </div>
          <div>
            <h3 className="font-heading font-bold text-gray-900 dark:text-white mb-2">You Own Your Content</h3>
            <p className="text-gray-700 dark:text-gray-200 font-body text-sm">
              You retain full ownership of everything you upload. We don't claim ownership of your materials.
            </p>
          </div>
        </div>

        <div className="flex items-start space-x-4 p-6 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl">
          <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center shrink-0">
            <Globe className="w-5 h-5 text-white" strokeWidth={2} />
          </div>
          <div>
            <h3 className="font-heading font-bold text-blue-900 dark:text-blue-200 mb-2">We Can Use It To Operate</h3>
            <p className="text-blue-800 dark:text-blue-300 font-body text-sm">
              By uploading, you grant us a license to display, store, and distribute your content to other users as part of the service.
            </p>
          </div>
        </div>

        <div className="flex items-start space-x-4 p-6 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl">
          <div className="w-10 h-10 bg-red-500 rounded-lg flex items-center justify-center shrink-0">
            <Shield className="w-5 h-5 text-white" strokeWidth={2} />
          </div>
          <div>
            <h3 className="font-heading font-bold text-red-900 dark:text-red-200 mb-2">You're Responsible</h3>
            <p className="text-red-800 dark:text-red-300 font-body text-sm">
              You must have the right to upload and share your content. We can remove content that violates these terms.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

