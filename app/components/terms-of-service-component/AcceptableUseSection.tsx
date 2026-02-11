import { CheckCircle } from 'lucide-react';

export function AcceptableUseSection() {
  const acceptableItems = [
    'Share your own study materials',
    'Download resources for personal use',
    'Collaborate with classmates',
    'Organize your academic files',
    'Help others learn and succeed',
    'Report inappropriate content'
  ];

  return (
    <section id="acceptable-use" className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm dark:shadow-gray-900/20 p-8 lg:p-10 border border-gray-200 dark:border-gray-700">
      <div className="flex items-center space-x-4 mb-6">
        <div className="w-12 h-12 bg-green-500 bg-opacity-20 dark:bg-green-500 dark:bg-opacity-20 rounded-xl flex items-center justify-center">
          <CheckCircle className="w-6 h-6 text-white" strokeWidth={2} />
        </div>
        <h2 className="text-3xl font-heading font-bold text-gray-900 dark:text-white">Acceptable Use</h2>
      </div>

      <p className="text-gray-700 dark:text-gray-200 font-body mb-6 leading-relaxed">
        You agree to use StudyVault responsibly. Here's what you <strong className="text-gray-900 dark:text-white">CAN</strong> do:
      </p>

      <div className="grid md:grid-cols-2 gap-3 mb-8">
        {acceptableItems.map((item, idx) => (
          <div key={idx} className="flex items-start space-x-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
            <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 shrink-0 mt-0.5" strokeWidth={2} />
            <span className="text-gray-700 dark:text-gray-200 font-body">{item}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

