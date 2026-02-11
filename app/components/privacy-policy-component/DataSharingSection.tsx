import { Users, CheckCircle } from 'lucide-react';

export function DataSharingSection() {
  const sharingItems = [
    { title: 'Public Content', desc: 'Shared resources visible to other users' },
    { title: 'Service Providers', desc: 'Hosting, storage, and analytics partners' },
    { title: 'Legal Requirements', desc: 'Court orders and compliance' },
    { title: 'Business Transfers', desc: 'Mergers or acquisitions' },
    { title: 'With Your Consent', desc: 'When you explicitly approve' }
  ];

  return (
    <section id="sharing" className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm dark:shadow-gray-900/20 p-8 lg:p-10 border border-gray-200 dark:border-gray-700">
      <div className="flex items-center space-x-4 mb-6">
        <div className="w-12 h-12 bg-[#d97757] bg-opacity-20 dark:bg-[#d97757] dark:bg-opacity-20 rounded-xl flex items-center justify-center">
          <Users className="w-6 h-6 text-white" strokeWidth={2} />
        </div>
        <h2 className="text-3xl font-heading font-bold text-gray-900 dark:text-white">Data Sharing</h2>
      </div>

      {/* Important Notice */}
      <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-6 mb-6">
        <div className="flex items-start space-x-3">
          <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400 shrink-0 mt-0.5" strokeWidth={2} />
          <div>
            <h4 className="font-heading font-bold text-green-900 dark:text-green-200 mb-1">We Do Not Sell Your Data</h4>
            <p className="text-green-800 dark:text-green-300 font-body text-sm">
              Your personal information is never sold to third parties. We only share data in limited circumstances outlined below.
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {sharingItems.map((item, idx) => (
          <div key={idx} className="p-4 border-l-4 border-[#d97757] bg-[#f5f5f0] dark:bg-gray-700 rounded-r-lg">
            <h4 className="font-heading font-bold text-gray-900 dark:text-white mb-1">{item.title}</h4>
            <p className="text-gray-700 dark:text-gray-200 font-body text-sm">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

