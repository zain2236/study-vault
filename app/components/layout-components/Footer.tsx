import { BookOpen } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-[#d97757] rounded-lg flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-white" />
                </div>
                <span className="text-xl font-bold">StudyVault</span>
              </div>
              <p className="text-gray-400 text-sm">
                Your academic resources, organized and accessible. Built by students, for students.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-[#d97757] transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-[#d97757] transition-colors">How It Works</a></li>
                <li><a href="#" className="hover:text-[#d97757] transition-colors">Pricing</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-[#d97757] transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-[#d97757] transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-[#d97757] transition-colors">Privacy Policy</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Connect</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-[#d97757] transition-colors">Twitter</a></li>
                <li><a href="#" className="hover:text-[#d97757] transition-colors">Discord</a></li>
                <li><a href="#" className="hover:text-[#d97757] transition-colors">GitHub</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400 text-sm">
            <p>&copy; 2026 StudyVault. All rights reserved. Made with ❤️ for students.</p>
          </div>
        </div>
      </footer>
  );
}

