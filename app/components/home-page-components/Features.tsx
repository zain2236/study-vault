import { Upload, Search, Download, Users, BookOpen, Zap } from 'lucide-react';

export function Features() {
  return (
    <section id="features" className="py-20 bg-white dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-gray-50 mb-4">
            Everything You Need to <span className="text-[#d97757]">Study Smarter</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-200 max-w-2xl mx-auto">
            Powerful features designed to make finding and sharing resources effortless
          </p>
        </div>

        {/* Bento Grid - Perfect Alignment */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Row 1: Wide card (2 cols) + Normal card (1 col) */}
          <div className="md:col-span-2 bg-[#f5f5f0] dark:bg-gray-700 p-8 rounded-2xl hover:shadow-md hover:shadow-[#d97757]/10 dark:hover:shadow-gray-900/50 transition-all transform hover:-translate-y-1 group relative overflow-hidden border border-transparent dark:border-gray-600/50">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#d97757] opacity-5 dark:opacity-10 rounded-full blur-3xl group-hover:opacity-10 dark:group-hover:opacity-15 transition-opacity"></div>
            <div className="w-12 h-12 bg-[#d97757] rounded-xl flex items-center justify-center mb-6 shadow-md shadow-[#d97757]/20 relative z-10">
              <Upload className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-50 mb-3 relative z-10">Easy Upload</h3>
            <p className="text-gray-600 dark:text-gray-200 leading-relaxed relative z-10">Upload notes, assignments, and study materials in seconds. Support for PDFs, images, and documents.</p>
          </div>

          <div className="md:col-span-1 bg-[#f5f5f0] dark:bg-gray-700 p-8 rounded-2xl hover:shadow-md hover:shadow-[#d97757]/10 dark:hover:shadow-gray-900/50 transition-all transform hover:-translate-y-1 group relative overflow-hidden border border-transparent dark:border-gray-600/50">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#d97757] opacity-5 dark:opacity-10 rounded-full blur-3xl group-hover:opacity-10 dark:group-hover:opacity-15 transition-opacity"></div>
            <div className="w-12 h-12 bg-[#d97757] rounded-xl flex items-center justify-center mb-6 shadow-md shadow-[#d97757]/20 relative z-10">
              <Search className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-50 mb-3 relative z-10">Smart Search</h3>
            <p className="text-gray-600 dark:text-gray-200 leading-relaxed relative z-10">Find exactly what you need with powerful filters by semester, subject, and resource type.</p>
          </div>

          {/* Row 2: Three equal cards */}
          <div className="md:col-span-1 bg-[#f5f5f0] dark:bg-gray-700 p-8 rounded-2xl hover:shadow-md hover:shadow-[#d97757]/10 dark:hover:shadow-gray-900/50 transition-all transform hover:-translate-y-1 group relative overflow-hidden border border-transparent dark:border-gray-600/50">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#d97757] opacity-5 dark:opacity-10 rounded-full blur-3xl group-hover:opacity-10 dark:group-hover:opacity-15 transition-opacity"></div>
            <div className="w-12 h-12 bg-[#d97757] rounded-xl flex items-center justify-center mb-6 shadow-md shadow-[#d97757]/20 relative z-10">
              <Download className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-50 mb-3 relative z-10">Instant Access</h3>
            <p className="text-gray-600 dark:text-gray-200 leading-relaxed relative z-10">Download resources anytime, anywhere. Your study materials are always just a click away.</p>
          </div>

          <div className="md:col-span-1 bg-[#f5f5f0] dark:bg-gray-700 p-8 rounded-2xl hover:shadow-md hover:shadow-[#d97757]/10 dark:hover:shadow-gray-900/50 transition-all transform hover:-translate-y-1 group relative overflow-hidden border border-transparent dark:border-gray-600/50">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#d97757] opacity-5 dark:opacity-10 rounded-full blur-3xl group-hover:opacity-10 dark:group-hover:opacity-15 transition-opacity"></div>
            <div className="w-12 h-12 bg-[#d97757] rounded-xl flex items-center justify-center mb-6 shadow-md shadow-[#d97757]/20 relative z-10">
              <Users className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-50 mb-3 relative z-10">Community Driven</h3>
            <p className="text-gray-600 dark:text-gray-200 leading-relaxed relative z-10">Help your classmates and benefit from their contributions. Everyone learns better together.</p>
          </div>

          <div className="md:col-span-1 bg-[#f5f5f0] dark:bg-gray-700 p-8 rounded-2xl hover:shadow-md hover:shadow-[#d97757]/10 dark:hover:shadow-gray-900/50 transition-all transform hover:-translate-y-1 group relative overflow-hidden border border-transparent dark:border-gray-600/50">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#d97757] opacity-5 dark:opacity-10 rounded-full blur-3xl group-hover:opacity-10 dark:group-hover:opacity-15 transition-opacity"></div>
            <div className="w-12 h-12 bg-[#d97757] rounded-xl flex items-center justify-center mb-6 shadow-md shadow-[#d97757]/20 relative z-10">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-50 mb-3 relative z-10">Organized Library</h3>
            <p className="text-gray-600 dark:text-gray-200 leading-relaxed relative z-10">All resources automatically categorized by semester and subject. No more messy folders.</p>
          </div>

          {/* Row 3: Wide card spanning 2 columns */}
          <div className="md:col-span-2 bg-[#f5f5f0] dark:bg-gray-700 p-8 rounded-2xl hover:shadow-md hover:shadow-[#d97757]/10 dark:hover:shadow-gray-900/50 transition-all transform hover:-translate-y-1 group relative overflow-hidden border border-transparent dark:border-gray-600/50">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#d97757] opacity-5 dark:opacity-10 rounded-full blur-3xl group-hover:opacity-10 dark:group-hover:opacity-15 transition-opacity"></div>
            <div className="w-12 h-12 bg-[#d97757] rounded-xl flex items-center justify-center mb-6 shadow-md shadow-[#d97757]/20 relative z-10">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-50 mb-3 relative z-10">Lightning Fast</h3>
            <p className="text-gray-600 dark:text-gray-200 leading-relaxed relative z-10">Find your notes in seconds, not minutes. No more scrolling through endless chat messages.</p>
          </div>
        </div>
      </div>
    </section>
  );
}