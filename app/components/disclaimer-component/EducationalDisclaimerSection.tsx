export function EducationalDisclaimerSection() {
  return (
    <section id="educational-disclaimer" className="space-y-4">
      <h2 className="text-2xl font-heading font-bold text-gray-900 dark:text-white">
        Educational Disclaimer
      </h2>
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm dark:shadow-gray-900/20 border border-gray-200 dark:border-gray-700">
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed font-body">
          The Service is an educational platform designed to facilitate the sharing of notes, study materials, and other educational resources among students. The materials available on StudyVault are user-generated and are not intended to be a substitute for professional educational advice, official course materials, or instruction from qualified educators.
        </p>
        <ul className="mt-4 space-y-2 list-disc list-inside text-gray-700 dark:text-gray-300 font-body">
          <li>We do not verify the accuracy or completeness of user-uploaded content.</li>
          <li>We are not affiliated with any educational institution unless explicitly stated.</li>
          <li>Reliance on any information provided by other users is solely at your own risk.</li>
        </ul>
      </div>
    </section>
  );
}
