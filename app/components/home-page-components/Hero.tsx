import { ArrowRight, Upload, BookOpen, Download } from 'lucide-react';

export function Hero() {
  return (
    <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="inline-block">
                <span className="bg-[#d97757]/10 text-[#d97757] px-4 py-2 rounded-full text-sm font-semibold">  
                  No More Hunting for Notes
                </span>
              </div>
              
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Your Academic Resources, 
                <span className="text-[#d97757]"> All in One Place</span>
              </h1>
              
              <p className="text-lg text-gray-600 leading-relaxed">
                Stop scrolling through endless chats. Upload, organize, and access all your study materials—notes, assignments, quizzes—instantly. Built by students, for students.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-[#d97757] text-white px-8 py-4 rounded-lg hover:bg-[#c66847] transition-all transform hover:scale-105 flex items-center justify-center space-x-2 text-lg font-semibold shadow-lg">
                  <span>Start Organizing Now</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
                <button className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-lg hover:border-[#d97757] hover:text-[#d97757] transition-all flex items-center justify-center space-x-2 text-lg font-semibold">
                  <span>See How It Works</span>
                </button>
              </div>

              <div className="flex items-center space-x-8 pt-4">
                <div>
                  <div className="text-3xl font-bold text-gray-900">500+</div>
                  <div className="text-sm text-gray-600">Active Students</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-gray-900">2,000+</div>
                  <div className="text-sm text-gray-600">Resources Shared</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-gray-900">8</div>
                  <div className="text-sm text-gray-600">Semesters Covered</div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="bg-white rounded-2xl shadow-2xl p-8 transform hover:scale-105 transition-all">
                <div className="space-y-6">
                  <div className="flex items-center space-x-4 p-4 bg-[#f5f5f0] rounded-lg">
                    <div className="w-12 h-12 bg-[#d97757] rounded-lg flex items-center justify-center shrink-0">
                      <Upload className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-semibold text-gray-900">Data Structures Notes</div>
                      <div className="text-xs text-gray-500">Semester 3 • Just now</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4 p-4 bg-[#f5f5f0] rounded-lg">
                    <div className="w-12 h-12 bg-[#d97757]/20 rounded-lg flex items-center justify-center shrink-0">
                      <BookOpen className="w-6 h-6 text-[#d97757]" />
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-semibold text-gray-900">OS Assignment Solutions</div>
                      <div className="text-xs text-gray-500">Semester 4 • 2 hours ago</div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4 p-4 bg-[#f5f5f0] rounded-lg">
                    <div className="w-12 h-12 bg-[#d97757]/20 rounded-lg flex items-center justify-center shrink-0">
                      <Download className="w-6 h-6 text-[#d97757]" />
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-semibold text-gray-900">Database Quiz Prep</div>
                      <div className="text-xs text-gray-500">Semester 5 • 1 day ago</div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-gray-200">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Your contribution impact</span>
                    <span className="text-[#d97757] font-semibold">47 students helped</span>
                  </div>
                </div>
              </div>

              <div className="absolute -top-4 -right-4 w-24 h-24 bg-[#d97757]/10 rounded-full blur-2xl"></div>
              <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-[#d97757]/10 rounded-full blur-3xl"></div>
            </div>
          </div>
        </div>
      </section>
  );
}

