import { AlertTriangle } from 'lucide-react';

export function DisclaimersSection() {
  return (
    <section className="bg-gray-900 dark:bg-gray-800 text-white rounded-2xl shadow-lg p-8 lg:p-10">
      <div className="flex items-center space-x-4 mb-6">
        <div className="w-12 h-12 bg-yellow-500 rounded-xl flex items-center justify-center">
          <AlertTriangle className="w-6 h-6 text-gray-900" strokeWidth={2} />
        </div>
        <h2 className="text-3xl font-heading font-bold">Important Disclaimers</h2>
      </div>

      <div className="space-y-4">
        <div className="p-4 bg-white bg-opacity-10 dark:bg-white/5 rounded-lg backdrop-blur-sm">
          <h3 className="font-heading font-bold mb-2 text-gray-700 dark:text-gray-200">Service "As Is"</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 font-body">
            The service is provided without warranties. We don't guarantee it will be error-free or always available.
          </p>
        </div>

        <div className="p-4 bg-white bg-opacity-10 dark:bg-white/5 rounded-lg backdrop-blur-sm">
          <h3 className="font-heading font-bold mb-2 text-gray-700 dark:text-gray-200">Limitation of Liability</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 font-body">
            We're not liable for any indirect damages or losses from using the service. Our total liability is limited to $100 or what you paid us in the last 12 months.
          </p>
        </div>
      </div>
    </section>
  );
}

