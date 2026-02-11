import { Cookie } from 'lucide-react';

export function CookiesSection() {
  const cookieTypes = [
    { type: 'Essential', desc: 'Required for authentication and security', colorClass: 'bg-red-500' },
    { type: 'Functional', desc: 'Remember your preferences', colorClass: 'bg-blue-500' },
    { type: 'Analytics', desc: 'Understand usage patterns', colorClass: 'bg-green-500' }
  ];

  return (
    <section className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm dark:shadow-gray-900/20 p-8 lg:p-10 border border-gray-200 dark:border-gray-700">
      <div className="flex items-center space-x-4 mb-6">
        <div className="w-12 h-12 bg-[#d97757] bg-opacity-20 dark:bg-[#d97757] dark:bg-opacity-20 rounded-xl flex items-center justify-center">
          <Cookie className="w-6 h-6 text-white" strokeWidth={2} />
        </div>
        <h2 className="text-3xl font-heading font-bold text-gray-900 dark:text-white">Cookies & Tracking</h2>
      </div>

      <p className="text-gray-700 dark:text-gray-200 font-body mb-6 leading-relaxed">
        We use cookies to improve your experience. Here's what we track:
      </p>

      <div className="space-y-3">
        {cookieTypes.map((cookie, idx) => (
          <div key={idx} className="flex items-start space-x-3 p-4 bg-[#f5f5f0] dark:bg-gray-700 rounded-lg">
            <div className={`w-3 h-3 ${cookie.colorClass} rounded-full shrink-0 mt-1.5`}></div>
            <div>
              <span className="font-heading font-semibold text-gray-900 dark:text-white">{cookie.type}:</span>
              <span className="text-gray-700 dark:text-gray-200 font-body ml-2">{cookie.desc}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

