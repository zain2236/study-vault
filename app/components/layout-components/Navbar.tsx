import { useState } from 'react';
import { Menu, X, BookOpen, Sparkles, User } from 'lucide-react';
import { Link, NavLink } from 'react-router';



export function Navbar({ isLoggedIn } : any) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm shadow-xs dark:shadow-gray-800/20 sticky top-0 z-50 border-b border-gray-100/60 dark:border-gray-700/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo - Enhanced */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="relative">
              {/* Glow effect behind logo */}
              <div className="absolute inset-0 bg-[#d97757] rounded-xl blur-lg opacity-20 group-hover:opacity-35 transition-opacity"></div>
              {/* Logo icon */}
              <div className="relative w-9 h-9 rounded-xl flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
                <img src="/assests/fav-icon.png" alt="StudyVault logo" className="w-full h-full object-contain" />
              </div>
            </div>
            <span className="text-xl font-heading font-bold dark:text-white text-[#d97757] group-hover:text-[#c66847] transition-all duration-300">
              StudyVault
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-2">
          <Link
              to="/resources"
              className="px-4 py-2 rounded-lg font-heading font-medium text-gray-700 dark:text-gray-100 hover:text-[#d97757] dark:hover:text-[#d97757] hover:bg-[#f5f5f0] dark:hover:bg-gray-700/50 transition-all relative group"
            >
              Browse Resources
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#d97757] group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link
              to="/features"
              className="px-4 py-2 rounded-lg font-heading font-medium text-gray-700 dark:text-gray-100 hover:text-[#d97757] dark:hover:text-[#d97757] hover:bg-[#f5f5f0] dark:hover:bg-gray-700/50 transition-all relative group"
            >
              Features
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#d97757] group-hover:w-full transition-all duration-300"></span>
            </Link>

            <div className="h-6 w-px bg-gray-300 dark:bg-gray-700 mx-2"></div>

            {/* // If user is logged in then show dashboard button  */}

            {isLoggedIn ? (<NavLink
              to="/user/dashboard"
              className="flex items-center space-x-2 bg-gradient-to-r from-[#d97757] to-[#c66847] text-white px-6 py-2.5 rounded-lg font-heading font-semibold hover:shadow-md hover:shadow-[#d97757]/20 transition-all transform hover:scale-[1.02]"
            >
              <User className="w-4 h-4" />
              <span>Dashboard</span>
            </NavLink>) : (<div className="hidden md:flex items-center space-x-2">
              <NavLink
                to="/login"
                className="px-5 py-2 rounded-lg font-heading font-semibold text-gray-700 dark:text-gray-100 hover:text-[#d97757] dark:hover:text-[#d97757] hover:bg-[#f5f5f0] dark:hover:bg-gray-700/50 transition-all"
              >
                Login
              </NavLink>

              <NavLink
                to="/sign-up"
                className="flex items-center space-x-2 bg-gradient-to-r from-[#d97757] to-[#c66847] text-white px-6 py-2.5 rounded-lg font-heading font-semibold hover:shadow-md hover:shadow-[#d97757]/20 transition-all transform hover:scale-[1.02]"
              >
                <span>Get Started</span>
                <Sparkles className="w-4 h-4" />
              </NavLink>
            </div>)}

          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-700 dark:text-gray-100 hover:text-[#d97757] dark:hover:text-[#d97757] transition-colors p-2 hover:bg-[#f5f5f0] dark:hover:bg-gray-700/50 rounded-lg"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu - Enhanced */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 space-y-2 border-t border-gray-100 dark:border-gray-700 animate-fadeIn">
            <Link
              to="#features"
              className="block px-4 py-3 rounded-lg text-gray-700 dark:text-gray-100 hover:text-[#d97757] dark:hover:text-[#d97757] hover:bg-[#f5f5f0] dark:hover:bg-gray-700/50 transition-all font-heading font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              Features
            </Link>
            <Link
              to="#how-it-works"
              className="block px-4 py-3 rounded-lg text-gray-700 dark:text-gray-100 hover:text-[#d97757] dark:hover:text-[#d97757] hover:bg-[#f5f5f0] dark:hover:bg-gray-700/50 transition-all font-heading font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              How It Works
            </Link>
            <Link
              to="#benefits"
              className="block px-4 py-3 rounded-lg text-gray-700 dark:text-gray-100 hover:text-[#d97757] dark:hover:text-[#d97757] hover:bg-[#f5f5f0] dark:hover:bg-gray-700/50 transition-all font-heading font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              Benefits
            </Link>

            <div className="h-px bg-gray-200 dark:bg-gray-700 my-2"></div>

              {isLoggedIn ? ( <Link
              to="/user/dashboard"
              className="flex items-center justify-center space-x-2 bg-gradient-to-r from-[#d97757] to-[#c66847] text-white px-6 py-3 rounded-lg font-heading font-semibold hover:shadow-md hover:shadow-[#d97757]/20 transition-all mx-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              <User className="w-4 h-4" />
              <span>Dashboard</span>
            </Link>) : (<div>
            <Link
              to="/login"
              className="block px-4 py-3 rounded-lg text-gray-700 dark:text-gray-100 hover:text-[#d97757] dark:hover:text-[#d97757] hover:bg-[#f5f5f0] dark:hover:bg-gray-700/50 transition-all font-heading font-semibold"
              onClick={() => setMobileMenuOpen(false)}
            >
              Login
            </Link>
            <Link
              to="/sign-up"
              className="flex items-center justify-center space-x-2 bg-gradient-to-r from-[#d97757] to-[#c66847] text-white px-6 py-3 rounded-lg font-heading font-semibold hover:shadow-md hover:shadow-[#d97757]/20 transition-all mx-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span>Get Started</span>
              <Sparkles className="w-4 h-4" />
            </Link>
            </div>)}
            
          </div>
        )}
      </div>
    </nav>
  );
}