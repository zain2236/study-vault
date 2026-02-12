import type { loader } from '~/root';
import { Link, useRouteLoaderData } from 'react-router';
import {
  BookOpen,
  Mail,
  Github,
  Heart,
  ArrowRight,
  Sparkles,
  Facebook,
  Instagram
} from 'lucide-react';
import { useState, useEffect } from 'react';

export function Footer() {
  const [currentYear, setCurrentYear] = useState('');

  // Get data from root loader
  const data = useRouteLoaderData<typeof loader>('root')!
  const { totalUser, totalResource } = data

  // Fix hydration mismatch - useEffect mein date set karo
  useEffect(() => {
    setCurrentYear(new Date().getFullYear().toString());
  }, []);

  return (
    <footer className="relative bg-linear-to-b from-gray-900 to-black text-white overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#d97757] rounded-full blur-3xl opacity-5 animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#d97757] rounded-full blur-3xl opacity-5 animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Main Footer */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Brand Section - Enhanced */}
          <div className="lg:col-span-4">
            <Link to="/" className="inline-flex items-center space-x-3 mb-6 group">
              <div className="relative">
                {/* Glow effect */}
                <div className="absolute inset-0 bg-[#d97757] rounded-xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity"></div>
                {/* Logo */}
                <div className="relative w-12 h-12 bg-linear-to-br from-[#d97757] to-[#c66647] rounded-xl flex items-center justify-center shadow-lg transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                  <BookOpen className="w-7 h-7 text-white" />
                </div>
              </div>
              <div>
                <span className="block text-2xl font-heading font-bold bg-linear-to-r from-white to-gray-300 bg-clip-text text-transparent group-hover:from-[#d97757] group-hover:to-[#c66847] transition-all duration-300">
                  StudyVault
                </span>
                <span className="block text-xs text-gray-500 font-body">Organize. Share. Succeed.</span>
              </div>
            </Link>

            <p className="text-gray-400 font-body text-sm leading-relaxed mb-6">
              Your academic resources, organized and accessible. Built by students, for students. Making education easier, one upload at a time.
            </p>

            {/* Stats */}
            <div className="flex items-center space-x-6 mb-6">
              {[
                { value: totalUser, label: 'Students' },
                { value: totalResource, label: 'Resources' }
              ].map((stat, idx) => (
                <div key={idx} className="text-center">
                  <div className="text-2xl font-heading font-bold text-[#d97757] mb-1">{stat.value}</div>
                  <div className="text-xs text-gray-500 font-body">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Social Links - Modern Design */}
            <div>
              <p className="text-xs text-gray-500 font-heading uppercase tracking-wider mb-3">Connect With Us</p>
              <div className="flex items-center space-x-3">
                {[
                  { icon: Facebook, href: 'https://facebook.com', label: 'Facebook', color: 'hover:bg-[#d97757]/90' },
                  { icon: Github, href: 'https://github.com', label: 'GitHub', color: 'hover:bg-[#d97757]/90' },
                  { icon: Instagram, href: 'https://instagram.com', label: 'Instagram', color: 'hover:bg-[#d97757]/90' }
                ].map((social, idx) => (
                  <a
                    key={idx}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-10 h-10 bg-white bg-opacity-5 backdrop-blur-sm ${social.color} border border-gray-800 hover:border-transparent rounded-xl flex items-center justify-center transition-all duration-300 transform hover:scale-110 hover:-translate-y-1 group`}
                    aria-label={social.label}
                  >
                    <social.icon className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Links Grid - Modern Cards */}
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-8">
            {/* Quick Links */}
            <div className="group">
              <div className="flex items-center space-x-2 mb-6">
                <div className="w-1 h-6 bg-linear-to-b from-[#d97757] to-transparent rounded-full"></div>
                <h4 className="font-heading font-bold text-white">Quick Links</h4>
              </div>
              <ul className="space-y-3">
                {[
                  { label: 'Home', href: '/' },
                  { label: 'About', href: '/about' },
                  { label: 'Resources', href: '/browse' },
                  { label: 'Features', href: '/features' }
                ].map((link, idx) => (
                  <li key={idx}>
                    <Link
                      to={link.href}
                      className="text-gray-400 hover:text-[#d97757] transition-all font-body text-sm flex items-center space-x-2 group/link"
                    >
                      <ArrowRight className="w-3 h-3 opacity-0 group-hover/link:opacity-100 -translate-x-2 group-hover/link:translate-x-0 transition-all" />
                      <span>{link.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal */}
            <div className="group">
              <div className="flex items-center space-x-2 mb-6">
                <div className="w-1 h-6 bg-linear-to-b from-[#d97757] to-transparent rounded-full"></div>
                <h4 className="font-heading font-bold text-white">Legal</h4>
              </div>
              <ul className="space-y-3">
                {[
                  { label: 'Privacy Policy', href: '/privacy-policy' },
                  { label: 'Terms of Service', href: '/terms-of-service' },
                  { label: 'Disclaimer', href: '/disclaimer' }
                ].map((link, idx) => (
                  <li key={idx}>
                    <Link
                      to={link.href}
                      className="text-gray-400 hover:text-[#d97757] transition-all font-body text-sm flex items-center space-x-2 group/link"
                    >
                      <ArrowRight className="w-3 h-3 opacity-0 group-hover/link:opacity-100 -translate-x-2 group-hover/link:translate-x-0 transition-all" />
                      <span>{link.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support */}
            <div className="group">
              <div className="flex items-center space-x-2 mb-6">
                <div className="w-1 h-6 bg-linear-to-b from-[#d97757] to-transparent rounded-full"></div>
                <h4 className="font-heading font-bold text-white">Support</h4>
              </div>
              <ul className="space-y-3">
                {[
                  { label: 'Support', email: 'support@studyvault.com' },
                  { label: 'General Inquiry', email: 'hello@studyvault.com' },
                  { label: 'Legal', email: 'legal@studyvault.com' }
                ].map((link, idx) => (
                  <li key={idx}>
                    <a
                      href={`mailto:${link.email}`}
                      className="text-gray-400 hover:text-[#d97757] transition-all font-body text-sm flex items-center space-x-2 group/link"
                    >
                      <Mail className="w-3 h-3 text-[#d97757] group-hover/link:scale-110 transition-transform" />
                      <span>{link.label}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar - Stylish Gradient */}
      <div className="relative border-t border-white border-opacity-5 bg-linear-to-r from-transparent via-white/5 to-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Copyright */}
            <p className="text-gray-500 text-sm font-body text-center md:text-left flex items-center space-x-2">
              <span >© {currentYear || '2026'} StudyVault. All rights reserved.</span>
              <span className="hidden md:inline">•</span>
              <span className="flex items-center space-x-1">
                <span >Made with</span>
                <Heart className="w-4 h-4 text-[#d97757] fill-[#d97757] " />
                <span>for students</span>
              </span>
            </p>

            {/* Badge */}
            <div className="flex items-center space-x-2 px-4 py-2 bg-white/90 bg-opacity-5 backdrop-blur-sm border border-white border-opacity-10 rounded-full">
              <Sparkles className="w-4 h-4 text-[#d97757]" />
              <span className="text-xs font-heading font-semibold text-gray-400">Built with React Router v7</span>
            </div>
          </div>
        </div>
      </div>

      {/* CSS for animations */}
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.05; }
          50% { opacity: 0.1; }
        }
      `}</style>
    </footer>
  );
}