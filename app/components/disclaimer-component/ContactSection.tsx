import { Mail } from 'lucide-react';

export function ContactSection() {
  return (
    <section id="contact" className="space-y-4">
      <h2 className="text-2xl font-heading font-bold text-gray-900 dark:text-white">
        Contact Us
      </h2>
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm dark:shadow-gray-900/20 border border-gray-200 dark:border-gray-700">
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed font-body mb-6">
          If you have any questions about this Disclaimer, please contact us:
        </p>
        
        <div className="flex items-center space-x-3 text-gray-700 dark:text-gray-300">
          <div className="w-10 h-10 bg-[#f5f5f0] dark:bg-gray-700 rounded-lg flex items-center justify-center">
            <Mail className="w-5 h-5 text-[#d97757]" strokeWidth={2} />
          </div>
          <div>
            <div className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider">Email</div>
            <a href="mailto:support@studyvault.com" className="text-[#d97757] hover:underline">
              support@studyvault.com
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
