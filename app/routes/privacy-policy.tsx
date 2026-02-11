import {
  HeroSection,
  NavigationSidebar,
  IntroductionSection,
  InformationCollectionSection,
  HowWeUseSection,
  DataSharingSection,
  SecuritySection,
  PrivacyRightsSection,
  CookiesSection,
  ContactSection,
  FooterNote
} from '../components/privacy-policy-component';

export default function PrivacyPolicyPage() {
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
            <InformationCollectionSection />
            <HowWeUseSection />
            <DataSharingSection />
            <SecuritySection />
            <PrivacyRightsSection />
            <CookiesSection />
            <ContactSection />
            <FooterNote />
          </div>
        </div>
      </div>
    </div>
  );
}