import type { Route } from "./+types/index";

import { Hero } from '../components/home-page-components/Hero';
import { Features } from '../components/home-page-components/Features';
import { HowItWorks } from '../components/home-page-components/HowItWorks';
import { Benefits } from '../components/home-page-components/Benefits';
import { CallToAction } from '../components/home-page-components/CallToAction';
import { getTotalResourceCount, getTotalUserCount } from '~/utils/prisma/resource-prisma.server';




export function meta({}: Route.MetaArgs) {
  return [
    { title: "Home page" },
    { name: "description", content: "Welcome to Home page of Student valut!" },
  ];
}

export async function loader() {
  try {
    const [userCount, resourceCount] = await Promise.all([
      getTotalUserCount(),
      getTotalResourceCount()
    ]);
    return {
      userCount,
      resourceCount
    }
  } catch (error) {
    return {
      userCount: 0,
      resourceCount: 0
    }
  }
  
}

export default function LandingPage({loaderData} : any) {
  return (
    <>
      {/* SECTION 2: HERO */}
      <Hero userCount={loaderData.userCount} resourceCount={loaderData.resourceCount} />

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
