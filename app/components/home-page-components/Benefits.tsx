import { CheckCircle } from 'lucide-react';

export function Benefits() {
  return (
    <section id="benefits" className="py-20 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-gray-50 mb-8">
                Stop Wasting Time <span className="text-[#d97757]">Hunting for Notes</span>
              </h2>
              
              <div className="space-y-6">
                {[
                  {
                    problem: "Scrolling through 100+ chat messages",
                    solution: "Find resources in 5 seconds with smart search"
                  },
                  {
                    problem: "Asking friends 'Do you have the notes?'",
                    solution: "Access everything instantly, anytime"
                  },
                  {
                    problem: "Lost files buried in phone storage",
                    solution: "Everything organized by semester and subject"
                  },
                  {
                    problem: "Outdated or incomplete materials",
                    solution: "Community uploads keep resources fresh and complete"
                  }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start space-x-4">
                    <div className="shrink-0">
                      <CheckCircle className="w-6 h-6 text-[#d97757]" />
                    </div>
                    <div>
                      <div className="text-gray-500 dark:text-gray-400 line-through text-sm mb-1">{item.problem}</div>
                      <div className="text-gray-900 dark:text-gray-50 font-semibold">{item.solution}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-linear-to-br from-[#d97757] to-[#c66847] p-12 rounded-2xl text-white shadow-2xl">
              <h3 className="text-3xl font-bold mb-6">The Old Way vs. The Smart Way</h3>
              
              <div className="space-y-8">
                <div>
                  <div className="text-sm uppercase tracking-wide opacity-80 mb-2">Before StudyVault</div>
                  <div className="text-lg opacity-90">
                    "Spent 15 minutes searching WhatsApp, asked 3 friends, still couldn't find the OS notes for tomorrow's exam..."
                  </div>
                </div>

                <div className="border-t border-white/20 pt-8">
                  <div className="text-sm uppercase tracking-wide opacity-80 mb-2">With StudyVault</div>
                  <div className="text-lg font-semibold">
                    "Searched 'Operating Systems', filtered Semester 4, downloaded notes. Studied, aced exam. 30 seconds total."
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-8 border-t border-white/20">
                <div className="text-4xl font-bold mb-2">10x Faster</div>
                <div className="text-lg opacity-90">Average time saved per resource search</div>
              </div>
            </div>
          </div>
        </div>
      </section>
  );
}

