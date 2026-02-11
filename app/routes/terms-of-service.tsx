import {
  HeroSection,
  NavigationSidebar,
  QuickSummarySection,
  IntroductionSection,
  UserAccountsSection,
  AcceptableUseSection,
  ProhibitedContentSection,
  UserContentSection,
  IntellectualPropertySection,
  TerminationSection,
  DisclaimersSection,
  ContactSection,
  AcknowledgmentSection
} from '../components/terms-of-service-component';

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-[#f5f5f0] dark:bg-gray-900">
      <HeroSection />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-4 gap-8">
          <NavigationSidebar />

          {/* Content */}
          <div className="lg:col-span-3 space-y-8">
            <QuickSummarySection />
            <IntroductionSection />
            <UserAccountsSection />
            <AcceptableUseSection />
            <ProhibitedContentSection />
            <UserContentSection />
            <IntellectualPropertySection />
            <TerminationSection />
            <DisclaimersSection />
            <ContactSection />
            <AcknowledgmentSection />
          </div>
        </div>
      </div>
    </div>
  );
}
