import type { Route } from "./+types/home";

import { Hero } from '../components/home-page-components/Hero';
import { Features } from '../components/home-page-components/Features';
import { HowItWorks } from '../components/home-page-components/HowItWorks';
import { Benefits } from '../components/home-page-components/Benefits';
import { CallToAction } from '../components/home-page-components/CallToAction';
import MainLayout from "~/layout/main-layout";


export function meta({}: Route.MetaArgs) {
  return [
    { title: "Home page" },
    { name: "description", content: "Welcome to Home page!" },
  ];
}

export default function LandingPage() {
  return (
    <MainLayout>
      {/* SECTION 2: HERO */}
      <Hero />

      {/* SECTION 3: FEATURES */}
      <Features />

      {/* SECTION 4: HOW IT WORKS */}
      <HowItWorks />

      {/* SECTION 5: BENEFITS / PROBLEM-SOLUTION */}
      <Benefits />

      {/* SECTION 6: CTA (Call to Action) */}
      <CallToAction />

    </MainLayout>
    // <div className="min-h-screen bg-[#f5f5f0]">
    //   {/* SECTION 1: NAVIGATION */}
    //   <Navbar />


    //   {/* SECTION 7: FOOTER */}
    //   <Footer />
    // </div>
  );
}
