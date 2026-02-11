import { Eye, CheckCircle } from 'lucide-react';

export function HowWeUseSection() {
  const usageItems = [
    'Provide and improve our Service',
    'Process registration and accounts',
    'Enable content upload and sharing',
    'Send updates and alerts',
    'Detect fraud and threats',
    'Analyze usage patterns',
    'Personalize experience',
    'Comply with legal obligations'
  ];

  return (
    <section id="usage" className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm dark:shadow-gray-900/20 p-8 lg:p-10 border border-gray-200 dark:border-gray-700">
      <div className="flex items-center space-x-4 mb-6">
        <div className="w-12 h-12 bg-[#d97757] bg-opacity-20 dark:bg-[#d97757] dark:bg-opacity-20 rounded-xl flex items-center justify-center">
          <Eye className="w-6 h-6 text-white" strokeWidth={2} />
        </div>
        <h2 className="text-3xl font-heading font-bold text-gray-900 dark:text-white">How We Use Your Data</h2>
      </div>

      <div className="grid md:grid-cols-2 gap-3">
        {usageItems.map((item, idx) => (
          <div key={idx} className="flex items-start space-x-3 p-3 hover:bg-[#f5f5f0] dark:hover:bg-gray-700 rounded-lg transition-colors">
            <div className="w-6 h-6 bg-[#d97757] bg-opacity-10 dark:bg-[#d97757] dark:bg-opacity-20 rounded-full flex items-center justify-center shrink-0 mt-0.5">
              <CheckCircle className="w-4 h-4 text-white" strokeWidth={2} />
            </div>
            <span className="text-gray-700 dark:text-gray-200 font-body">{item}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

