import { Lock, Shield, AlertCircle, Users, Database, Globe } from 'lucide-react';

export function SecuritySection() {
  return (
    <section id="security" className="bg-gradient-to-br from-gray-900 to-gray-800 dark:from-gray-800 dark:to-gray-900 rounded-2xl shadow-sm p-8 lg:p-10 text-white">
      <div className="flex items-center space-x-4 mb-6">
        <div className="w-12 h-12 bg-[#d97757] rounded-xl flex items-center justify-center">
          <Lock className="w-6 h-6 text-white" strokeWidth={2} />
        </div>
        <h2 className="text-3xl font-heading font-bold">Data Security</h2>
      </div>

      <p className="text-gray-300 dark:text-gray-200 font-body mb-6 leading-relaxed">
        We implement industry-standard security measures to protect your information:
      </p>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="flex items-center space-x-3 p-4 bg-white bg-opacity-10 dark:bg-white/10 rounded-lg backdrop-blur-sm">
          <Lock className="w-5 h-5 dark:text-white text-gray-800" strokeWidth={2} />
          <span className="font-body text-gray-800 dark:text-gray-200">End-to-end encryption</span>
        </div>
        <div className="flex items-center space-x-3 p-4 bg-white bg-opacity-10 dark:bg-white/10 rounded-lg backdrop-blur-sm">
          <Shield className="w-5 h-5 dark:text-white text-gray-800" strokeWidth={2} />
          <span className="font-body text-gray-800 dark:text-gray-200">Secure authentication</span>
        </div>
        <div className="flex items-center space-x-3 p-4 bg-white bg-opacity-10 dark:bg-white/10 rounded-lg backdrop-blur-sm">
          <AlertCircle className="w-5 h-5 dark:text-white text-gray-800" strokeWidth={2} />
          <span className="font-body text-gray-800 dark:text-gray-200">Regular security audits</span>
        </div>
        <div className="flex items-center space-x-3 p-4 bg-white bg-opacity-10 dark:bg-white/10 rounded-lg backdrop-blur-sm">
          <Users className="w-5 h-5 dark:text-white text-gray-800" strokeWidth={2} />
          <span className="font-body text-gray-800 dark:text-gray-200">Limited access controls</span>
        </div>
        <div className="flex items-center space-x-3 p-4 bg-white bg-opacity-10 dark:bg-white/10 rounded-lg backdrop-blur-sm">
          <Database className="w-5 h-5 dark:text-white text-gray-800" strokeWidth={2} />
          <span className="font-body text-gray-800 dark:text-gray-200">Secure backup systems</span>
        </div>
        <div className="flex items-center space-x-3 p-4 bg-white bg-opacity-10 dark:bg-white/10 rounded-lg backdrop-blur-sm">
          <Globe className="w-5 h-5 dark:text-white text-gray-800" strokeWidth={2} />
          <span className="font-body text-gray-800 dark:text-gray-200">SSL/TLS protection</span>
        </div>
      </div>

      <div className="mt-6 p-4 bg-yellow-500 bg-opacity-20 dark:bg-yellow-600/30 border border-yellow-500 dark:border-yellow-600 border-opacity-30 rounded-lg">
        <p className="text-sm text-yellow-800 dark:text-yellow-300 font-body">
          <strong className="text-yellow-100 dark:text-yellow-200">Note:</strong> While we use industry-standard security measures, no method of transmission over the Internet is 100% secure.
        </p>
      </div>
    </section>
  );
}

