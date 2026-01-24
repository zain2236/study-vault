import { useState } from 'react';
import { Menu, X, BookOpen } from 'lucide-react';
import { Link } from 'react-router';

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo - Space reserved for image */}
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-[#d97757] rounded-lg flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-gray-900">StudyVault</span>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              <Link to="#features" className="text-gray-700 hover:text-[#d97757] transition-colors">Features</Link>
              <Link to="#how-it-works" className="text-gray-700 hover:text-[#d97757] transition-colors">How It Works</Link>
              <Link to="#benefits" className="text-gray-700 hover:text-[#d97757] transition-colors">Benefits</Link>
              <Link to="/login" className="text-gray-700 hover:text-[#d97757] transition-colors">Login</Link>
              <Link to="/sign-up" className="bg-[#d97757] text-white px-6 py-2 rounded-lg hover:bg-[#c66847] transition-all transform hover:scale-105">
                Get Started
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden text-gray-700"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden py-4 space-y-3 border-t">
              <Link to="#features" className="block text-gray-700 hover:text-[#d97757] transition-colors">Features</Link>
              <Link to="#how-it-works" className="block text-gray-700 hover:text-[#d97757] transition-colors">How It Works</Link>
              <Link to="#benefits" className="block text-gray-700 hover:text-[#d97757] transition-colors">Benefits</Link>
              <Link to="/login" className="block w-full text-left text-gray-700 hover:text-[#d97757] transition-colors">Login</Link>
              <Link to="/sign-up" className="w-full bg-[#d97757] text-white px-6 py-2 rounded-lg hover:bg-[#c66847] transition-all">
                Get Started
              </Link>
            </div>
          )}
        </div>
      </nav>
  );
}

