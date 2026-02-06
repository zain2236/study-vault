import type { Route } from "./+types/home";

import { Hero } from '../components/home-page-components/Hero';
import { Features } from '../components/home-page-components/Features';
import { HowItWorks } from '../components/home-page-components/HowItWorks';
import { Benefits } from '../components/home-page-components/Benefits';
import { CallToAction } from '../components/home-page-components/CallToAction';



export function meta({}: Route.MetaArgs) {
  return [
    { title: "Home page" },
    { name: "description", content: "Welcome to Home page of Student valut!" },
  ];
}

export default function LandingPage() {
  return (
    <>
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

      </>
        
  );
}
