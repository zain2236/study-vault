import { ArrowRight } from 'lucide-react';

const cards = [
  {
    step: "01",
    title: "Sign Up & Login",
    description: "Create your free account in 30 seconds. Join hundreds of students already organizing their resources."
  },
  {
    step: "02",
    title: "Upload Resources",
    description: "Select semester, subject, and type. Drop your files. That's it. Your materials are now organized and searchable."
  },
  {
    step: "03",
    title: "Browse & Download",
    description: "Find what you need instantly with smart filters. Download and ace your exams. Help others do the same."
  }
]

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 bg-[#f5f5f0] dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-gray-50 mb-4">
              Get Started in <span className="text-[#d97757]">3 Simple Steps</span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-200 max-w-2xl mx-auto">
              From chaos to organized in minutes
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {cards.map((item, idx) => (
              <div key={idx} className="relative">
                <div className="bg-white dark:bg-gray-700 p-8 rounded-xl shadow-sm dark:shadow-gray-900/50 hover:shadow-lg dark:hover:shadow-gray-900/70 transition-all border border-transparent dark:border-gray-600/50">
                  <div className="text-6xl font-bold text-[#d97757] opacity-20 dark:opacity-30 mb-4">{item.step}</div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-50 mb-4">{item.title}</h3>
                  <p className="text-gray-600 dark:text-gray-200 leading-relaxed">{item.description}</p>
                </div>
                {idx < 2 && (
                  <div className="hidden lg:block absolute top-1/2 -right-8 transform -translate-y-1/2">
                    <ArrowRight className="w-8 h-8 text-[#d97757] opacity-30 dark:opacity-40" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
  );
}

