import { ArrowRight, Upload, BookOpen, Download, Sparkle } from 'lucide-react';
import { Link } from 'react-router';

export function Hero() {
  return (
    <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-20 lg:pt-16 lg:pb-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="inline-block">
                <span className="bg-[#d97757]/10 text-[#d97757] px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-2">
                  <Sparkle className="w-4 h-4" /> No More Hunting for Notes
                </span>
              </div>
              
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 leading-tight">
                Your Academic Resources, 
                <span className="text-[#d97757]"> All in One Place</span>
              </h1>
              
              <p className="text-lg text-gray-600 dark:text-gray-200 leading-relaxed">
                Stop scrolling through endless chats. Upload, organize, and access all your study materials—notes, assignments, quizzes—instantly. Built by students, for students.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/sign-up" className="flex items-center justify-center space-x-2 bg-gradient-to-r from-[#d97757] to-[#c66847] text-white px-8 py-4 cursor-pointer rounded-lg font-heading font-semibold hover:shadow-md hover:shadow-[#d97757]/20 transition-all transform hover:scale-[1.02] text-lg">
                  <span>Start Organizing Now</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link to="/features" className="border border-gray-200 cursor-pointer dark:border-gray-600 bg-linear-to-br from-white to-[#fafafa] dark:from-gray-700 dark:to-gray-700/80 text-gray-600 dark:text-gray-100 px-8 py-4 rounded-lg hover:border-[#d97757] hover:text-[#d97757] transition-all flex items-center justify-center space-x-2 text-lg font-semibold">
                  <span>See How It Works</span>
                </Link>
              </div>

              <div className="flex items-center space-x-8 pt-4">
                <div>
                  <div className="text-3xl font-bold text-gray-900 dark:text-gray-50">100+</div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">Active Students</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-gray-900 dark:text-gray-50">2000+</div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">Resources Shared</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-gray-900 dark:text-gray-50">8</div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">Semesters Covered</div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="bg-linear-to-br from-white to-[#fafafa] dark:from-gray-700 dark:to-gray-700/90 rounded-3xl shadow-2xl shadow-[#d97757]/10 dark:shadow-gray-900/50 p-8 transform transition-all duration-300 border border-gray-100/50 dark:border-gray-600/50 relative overflow-hidden group">
                {/* Animated background gradient */}
                <div className="absolute inset-0 bg-linear-to-br from-[#d97757]/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <div className="space-y-4 relative z-10">
                  <div className="flex items-center space-x-4 p-5 bg-linear-to-r from-[#f5f5f0] to-white dark:from-gray-600 dark:to-gray-600/80 rounded-xl border border-gray-100 dark:border-gray-600/50 hover:shadow-md hover:border-[#d97757]/20 dark:hover:border-[#d97757]/30 transition-all duration-300 group/item">
                    <div className="w-14 h-14 bg-linear-to-br from-[#d97757] to-[#c66847] rounded-xl flex items-center justify-center shrink-0 shadow-lg shadow-[#d97757]/30 group-hover/item:scale-110 transition-transform">
                      <Upload className="w-7 h-7 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-bold text-gray-900 dark:text-gray-50 mb-1">Data Structures Notes</div>
                      <div className="text-xs text-gray-500 dark:text-gray-300 flex items-center gap-2">
                        <span className="inline-block w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                        Semester 3 • Just now
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4 p-5 bg-linear-to-r from-[#f5f5f0] to-white dark:from-gray-600 dark:to-gray-600/80 rounded-xl border border-gray-100 dark:border-gray-600/50 hover:shadow-md hover:border-[#d97757]/20 dark:hover:border-[#d97757]/30 transition-all duration-300 group/item">
                    <div className="w-14 h-14 bg-linear-to-br from-[#d97757]/20 to-[#d97757]/10 dark:from-[#d97757]/30 dark:to-[#d97757]/20 rounded-xl flex items-center justify-center shrink-0 border-2 border-[#d97757]/30 group-hover/item:scale-110 transition-transform">
                      <BookOpen className="w-7 h-7 text-[#d97757]" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-bold text-gray-900 dark:text-gray-50 mb-1">OS Assignment Solutions</div>
                      <div className="text-xs text-gray-500 dark:text-gray-300 flex items-center gap-2">
                        <span className="inline-block w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                        Semester 4 • 2 hours ago
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4 p-5 bg-linear-to-r from-[#f5f5f0] to-white dark:from-gray-600 dark:to-gray-600/80 rounded-xl border border-gray-100 dark:border-gray-600/50 hover:shadow-md hover:border-[#d97757]/20 dark:hover:border-[#d97757]/30 transition-all duration-300 group/item">
                    <div className="w-14 h-14 bg-linear-to-br from-[#d97757]/20 to-[#d97757]/10 dark:from-[#d97757]/30 dark:to-[#d97757]/20 rounded-xl flex items-center justify-center shrink-0 border-2 border-[#d97757]/30 group-hover/item:scale-110 transition-transform">
                      <Download className="w-7 h-7 text-[#d97757]" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-bold text-gray-900 dark:text-gray-50 mb-1">Database Quiz Prep</div>
                      <div className="text-xs text-gray-500 dark:text-gray-300 flex items-center gap-2">
                        <span className="inline-block w-1.5 h-1.5 bg-purple-500 rounded-full"></span>
                        Semester 5 • 1 day ago
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-600 relative z-10">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-200 font-medium">Your contribution impact</span>
                    <span className="text-[#d97757] font-bold bg-[#d97757]/10 dark:bg-[#d97757]/20 px-3 py-1 rounded-full">100+ students helped</span>
                  </div>
                </div>
              </div>

              <div className="absolute -top-4 -right-4 w-24 h-24 bg-[#d97757]/10 rounded-full blur-2xl animate-pulse"></div>
              <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-[#d97757]/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
            </div>
          </div>
        </div>
      </section>
  );
}

