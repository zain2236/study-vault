import { Upload, Search, Download, Users, BookOpen, Zap } from 'lucide-react';

export  function Features() {
  const features = [
    {
      icon: Upload,
      title: "Easy Upload",
      description: "Upload notes, assignments, and study materials in seconds. Support for PDFs, images, and documents.",
      span: "md:col-span-2"
    },
    {
      icon: Search,
      title: "Smart Search",
      description: "Find exactly what you need with powerful filters by semester, subject, and resource type.",
      span: "md:col-span-1"
    },
    {
      icon: Download,
      title: "Instant Access",
      description: "Download resources anytime, anywhere. Your study materials are always just a click away.",
      span: "md:col-span-1"
    },
    {
      icon: Users,
      title: "Community Driven",
      description: "Help your classmates and benefit from their contributions. Everyone learns better together.",
      span: "md:col-span-1"
    },
    {
      icon: BookOpen,
      title: "Organized Library",
      description: "All resources automatically categorized by semester and subject. No more messy folders.",
      span: "md:col-span-1"
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Find your notes in seconds, not minutes. No more scrolling through endless chat messages.",
      span: "md:col-span-1"
    }
  ];

  return (
    <section id="features" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Everything You Need to <span className="text-[#d97757]">Study Smarter</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Powerful features designed to make finding and sharing resources effortless
          </p>
        </div>

        {/* Bento Grid - Perfect Alignment */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Row 1: Wide card (2 cols) + Normal card (1 col) */}
            {(() => {
              const Icon0 = features[0].icon;
              return (
                <div className={`${features[0].span} bg-[#f5f5f0] p-8 rounded-2xl hover:shadow-2xl transition-all transform hover:-translate-y-1 group relative overflow-hidden`}>
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[#d97757] opacity-5 rounded-full blur-3xl group-hover:opacity-10 transition-opacity"></div>
                  <div className="w-16 h-16 bg-[#d97757] rounded-xl flex items-center justify-center mb-6 shadow-lg relative z-10">
                    <Icon0 className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3 relative z-10">{features[0].title}</h3>
                  <p className="text-gray-600 leading-relaxed relative z-10">{features[0].description}</p>
                </div>
              );
            })()}

            {(() => {
              const Icon1 = features[1].icon;
              return (
                <div className={`${features[1].span} bg-[#f5f5f0] p-8 rounded-2xl hover:shadow-2xl transition-all transform hover:-translate-y-1 group relative overflow-hidden`}>
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[#d97757] opacity-5 rounded-full blur-3xl group-hover:opacity-10 transition-opacity"></div>
                  <div className="w-16 h-16 bg-[#d97757] rounded-xl flex items-center justify-center mb-6 shadow-lg relative z-10">
                    <Icon1 className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3 relative z-10">{features[1].title}</h3>
                  <p className="text-gray-600 leading-relaxed relative z-10">{features[1].description}</p>
                </div>
              );
            })()}

            {/* Row 2: Three equal cards */}
            {(() => {
              const Icon2 = features[2].icon;
              return (
                <div className={`${features[2].span} bg-[#f5f5f0] p-8 rounded-2xl hover:shadow-2xl transition-all transform hover:-translate-y-1 group relative overflow-hidden`}>
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[#d97757] opacity-5 rounded-full blur-3xl group-hover:opacity-10 transition-opacity"></div>
                  <div className="w-16 h-16 bg-[#d97757] rounded-xl flex items-center justify-center mb-6 shadow-lg relative z-10">
                    <Icon2 className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3 relative z-10">{features[2].title}</h3>
                  <p className="text-gray-600 leading-relaxed relative z-10">{features[2].description}</p>
                </div>
              );
            })()}

            {(() => {
              const Icon3 = features[3].icon;
              return (
                <div className={`${features[3].span} bg-[#f5f5f0] p-8 rounded-2xl hover:shadow-2xl transition-all transform hover:-translate-y-1 group relative overflow-hidden`}>
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[#d97757] opacity-5 rounded-full blur-3xl group-hover:opacity-10 transition-opacity"></div>
                  <div className="w-16 h-16 bg-[#d97757] rounded-xl flex items-center justify-center mb-6 shadow-lg relative z-10">
                    <Icon3 className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3 relative z-10">{features[3].title}</h3>
                  <p className="text-gray-600 leading-relaxed relative z-10">{features[3].description}</p>
                </div>
              );
            })()}

            {(() => {
              const Icon4 = features[4].icon;
              return (
                <div className={`${features[4].span} bg-[#f5f5f0] p-8 rounded-2xl hover:shadow-2xl transition-all transform hover:-translate-y-1 group relative overflow-hidden`}>
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[#d97757] opacity-5 rounded-full blur-3xl group-hover:opacity-10 transition-opacity"></div>
                  <div className="w-16 h-16 bg-[#d97757] rounded-xl flex items-center justify-center mb-6 shadow-lg relative z-10">
                    <Icon4 className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3 relative z-10">{features[4].title}</h3>
                  <p className="text-gray-600 leading-relaxed relative z-10">{features[4].description}</p>
                </div>
              );
            })()}

            {/* Row 3: Wide card spanning 2 columns + last card */}
            {(() => {
              const Icon5 = features[5].icon;
              return (
                <div className={`md:col-span-2 bg-[#f5f5f0] p-8 rounded-2xl hover:shadow-2xl transition-all transform hover:-translate-y-1 group relative overflow-hidden`}>
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[#d97757] opacity-5 rounded-full blur-3xl group-hover:opacity-10 transition-opacity"></div>
                  <div className="w-16 h-16 bg-[#d97757] rounded-xl flex items-center justify-center mb-6 shadow-lg relative z-10">
                    <Icon5 className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3 relative z-10">{features[5].title}</h3>
                  <p className="text-gray-600 leading-relaxed relative z-10">{features[5].description}</p>
                </div>
              );
            })()}
          </div>
      </div>
    </section>
  );
}