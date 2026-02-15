import { Ban, XCircle } from 'lucide-react';

export function ProhibitedContentSection() {
  const prohibitedItems = [
    'Copyrighted material without permission',
    'Completed assignments or exam answers',
    'Malicious software or viruses',
    'Personal info of others without consent',
    'Spam or commercial advertisements',
    'False or misleading information',
    'Harassing or abusive content',
    'Content designed to harm minors'
  ];

  return (
    <section id="prohibited" className="bg-linear-to-br from-red-900 to-red-800 dark:from-red-800 dark:to-red-900 rounded-2xl shadow-lg p-8 lg:p-10 text-white">
      <div className="flex items-center space-x-4 mb-6">
        <div className="w-12 h-12 bg-white bg-opacity-20 rounded-xl flex items-center justify-center">
          <Ban className="w-6 h-6 text-red-500" strokeWidth={2} />
        </div>
        <h2 className="text-3xl font-heading font-bold">Prohibited Content</h2>
      </div>

      <p className="text-white dark:text-gray-200 font-body mb-6">
        You <strong className="text-white dark:text-white">CANNOT</strong> upload or share:
      </p>

      <div className="grid md:grid-cols-2 gap-3">
        {prohibitedItems.map((item, idx) => (
          <div key={idx} className="flex items-start space-x-3 p-4 bg-white bg-opacity-10 dark:bg-white/5 rounded-lg backdrop-blur-sm">
            <XCircle className="w-5 h-5 text-red-400 dark:text-red-400 shrink-0 mt-0.5" strokeWidth={2} />
            <span className="text-gray-600 dark:text-gray-200 font-body text-sm">{item}</span>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-yellow-500 bg-opacity-20 dark:bg-yellow-600/30 border border-yellow-400 dark:border-yellow-600 border-opacity-30 rounded-lg">
        <p className="text-sm text-yellow-100 dark:text-yellow-200 font-body">
          <strong className="text-yellow-50 dark:text-yellow-100">Violation Warning:</strong> Uploading prohibited content may result in immediate account termination.
        </p>
      </div>
    </section>
  );
}

