import { CheckCircle } from 'lucide-react';

export function AcknowledgmentSection() {
  return (
    <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border border-green-200 dark:border-green-800 rounded-xl p-6">
      <div className="flex items-start space-x-3">
        <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400 shrink-0 mt-1" strokeWidth={2} />
        <p className="text-green-900 dark:text-green-200 font-body">
          <strong className="font-heading">By using StudyVault,</strong> you acknowledge that you have read, understood, and agree to be bound by these Terms of Service. Thank you for being part of our community!
        </p>
      </div>
    </div>
  );
}

