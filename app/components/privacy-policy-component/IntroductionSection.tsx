import { Shield } from 'lucide-react';

export function IntroductionSection() {
  return (
    <section id="introduction" className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm dark:shadow-gray-900/20 p-8 lg:p-10 border border-gray-200 dark:border-gray-700">
      <div className="flex items-center space-x-4 mb-6">
        <div className="w-12 h-12 bg-[#d97757] bg-opacity-20 dark:bg-[#d97757] dark:bg-opacity-20 rounded-xl flex items-center justify-center">
          <Shield className="w-6 h-6 text-white" strokeWidth={2} />
        </div>
        <h2 className="text-3xl font-heading font-bold text-gray-900 dark:text-white">Introduction</h2>
      </div>
      
      <div className="space-y-4">
        <p className="text-gray-700 dark:text-gray-200 font-body leading-relaxed">
          At StudyVault ("we," "our," or "us"), we are committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our platform.
        </p>
        <p className="text-gray-700 dark:text-gray-200 font-body leading-relaxed">
          Please read this Privacy Policy carefully. By using StudyVault, you consent to the data practices described in this policy.
        </p>
      </div>
    </section>
  );
}

