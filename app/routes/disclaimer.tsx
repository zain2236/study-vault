import type { MetaFunction } from 'react-router';
import {
  HeroSection,
  NavigationSidebar,
  IntroductionSection,
  EducationalDisclaimerSection,
  ExternalLinksSection,
  ErrorsAndOmissionsSection,
  FairUseSection,
  ContactSection
} from '~/components/disclaimer-component';

export const meta: MetaFunction = () => {
  return [
    { title: 'Disclaimer - StudyVault' },
    { 
      name: 'description', 
      content: 'Read our disclaimer to understand the limitations of liability and nature of content on StudyVault.' 
    },
  ];
};

export default function DisclaimerPage() {
  return (
    <div className="min-h-screen bg-[#f5f5f0] dark:bg-gray-900">
      <HeroSection />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-4 gap-8">
          <NavigationSidebar />

          {/* Content */}
          <div className="lg:col-span-3 space-y-8">
            <IntroductionSection />
            <EducationalDisclaimerSection />
            <ExternalLinksSection />
            <ErrorsAndOmissionsSection />
            <FairUseSection />
            <ContactSection />
          </div>
        </div>
      </div>
    </div>
  );
}
