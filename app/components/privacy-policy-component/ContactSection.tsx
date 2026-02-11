import { Mail, Shield } from 'lucide-react';

export function ContactSection() {
  return (
    <section id="contact" className="bg-linear-to-br from-[#d97757] to-[#c66847] dark:from-[#c66847] dark:to-[#b55937] rounded-2xl shadow-lg p-8 lg:p-10 text-white">
      <div className="flex items-center space-x-4 mb-6">
        <div className="w-12 h-12 bg-white bg-opacity-20 rounded-xl flex items-center justify-center">
          <Mail className="w-6 h-6 text-[#d97757]" strokeWidth={2} />
        </div>
        <h2 className="text-3xl font-heading font-bold">Contact Us</h2>
      </div>

      <p className="text-white dark:text-gray-200 font-body mb-6">
        Have questions about our privacy practices? We're here to help.
      </p>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="bg-white bg-opacity-10 dark:bg-white/5 rounded-lg p-6 backdrop-blur-sm">
          <Mail className="w-6 h-6 mb-3 text-[#d97757] dark:text-white" strokeWidth={2} />
          <h4 className="font-heading font-semibold mb-1 text-[#d97757] dark:text-white">General Inquiries</h4>
          <a href="mailto:privacy@studyvault.com" className="text-sm text-[#cc9785] dark:text-gray-200 hover:text-white dark:hover:text-white font-body transition-colors">
            privacy@studyvault.com
          </a>
        </div>
        
        <div className="bg-white bg-opacity-10 dark:bg-white/5 rounded-lg p-6 backdrop-blur-sm">
          <Shield className="w-6 h-6 mb-3 text-[#d97757] dark:text-white" strokeWidth={2} />
          <h4 className="font-heading font-semibold mb-1 text-[#d97757] dark:text-white">Data Protection Officer</h4>
          <a href="mailto:dpo@studyvault.com" className="text-sm text-[#d97757] dark:text-gray-200 hover:text-white dark:hover:text-white font-body transition-colors">
            dpo@studyvault.com
          </a>
        </div>
      </div>
    </section>
  );
}

