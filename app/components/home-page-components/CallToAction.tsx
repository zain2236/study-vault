import { Link } from 'react-router';
import { ArrowRight } from 'lucide-react';

export function CallToAction() {
  return (
    <section className="py-20 bg-[#f5f5f0] dark:bg-gray-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-gray-50 mb-6">
            Ready to <span className="text-[#d97757]">Never Lose</span> Your Notes Again?
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-200 mb-10 max-w-2xl mx-auto">
            Join hundreds of students who are studying smarter, not harder. Get started in less than a minute.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/sign-up" className="bg-gradient-to-r from-[#d97757] to-[#c66847] text-white px-10 py-5 rounded-lg hover:shadow-md hover:shadow-[#d97757]/20 transition-all transform hover:scale-105 flex items-center justify-center space-x-2 text-lg font-semibold shadow-lg dark:shadow-[#d97757]/20">
              
              <span>Create Free Account</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
            <button className="border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-100 px-10 py-5 rounded-lg hover:border-[#d97757] hover:text-[#d97757] transition-all text-lg font-semibold">
              Watch Demo
            </button>
          </div>

          <p className="text-sm text-gray-500 dark:text-gray-300 mt-6">No credit card required • Free forever • 2 minute setup</p>
        </div>
      </section>
  );
}

