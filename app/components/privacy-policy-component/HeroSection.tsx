import { Shield, Calendar, MapPin } from 'lucide-react';
import { useEffect, useState } from 'react';

export function HeroSection() {
  const [lastUpdated, setLastUpdated] = useState<string>('');

  useEffect(() => {
    setLastUpdated(new Date().toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    }));
  }, []);

  return (
    <div className="bg-linear-to-br from-white to-[#f5f5f0] dark:from-gray-800 dark:to-gray-900 py-16 border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center mb-6">
          <div className="w-16 h-16 bg-[#d97757] rounded-2xl flex items-center justify-center shadow-lg">
            <Shield className="w-8 h-8 text-white" strokeWidth={2} />
          </div>
        </div>
        
        <h1 className="text-5xl lg:text-6xl font-heading font-bold text-gray-900 dark:text-white text-center mb-4">
          Privacy Policy
        </h1>
        
        <p className="text-xl text-gray-600 dark:text-gray-300 text-center max-w-3xl mx-auto mb-8 font-body">
          Your privacy matters to us. Learn how we protect and handle your data.
        </p>

        <div className="flex items-center justify-center space-x-6 text-sm text-gray-600 dark:text-gray-300">
          <div className="flex items-center space-x-2">
            <Calendar className="w-4 h-4 text-[#d97757] dark:text-[#d97757]" strokeWidth={2} />
            <span className="text-gray-600 dark:text-gray-300">Last updated: {lastUpdated || 'Loading...'}</span>
          </div>
          <div className="flex items-center space-x-2">
            <MapPin className="w-4 h-4 text-[#d97757] dark:text-[#d97757]" strokeWidth={2} />
            <span className="text-gray-600 dark:text-gray-300">Global Policy</span>
          </div>
        </div>
      </div>
    </div>
  );
}

