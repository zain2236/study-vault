import { Hero } from '../components/home-page-components/Hero';
import { Features } from '../components/home-page-components/Features';
import { HowItWorks } from '../components/home-page-components/HowItWorks';
import { Benefits } from '../components/home-page-components/Benefits';
import { CallToAction } from '../components/home-page-components/CallToAction';

import type { MetaFunction } from 'react-router';

export const meta: MetaFunction = () => {
  return [
    { title: 'Study Vault - Upload, Organize & Share Educational Resources' },
    { 
      name: 'description', 
      content: 'Study Vault is the ultimate platform for students to upload, organize, and publish educational resources. Browse thousands of study materials with smart pagination and instant search. Join our community today!' 
    },
    { 
      name: 'keywords', 
      content: 'study vault, educational resources, study materials, upload notes, share resources, student platform, academic resources, online learning, study notes, exam preparation, course materials, pdf sharing, organized learning' 
    },
    
    // Open Graph / Facebook
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: 'https://studyvault.com' },
    { property: 'og:title', content: 'Study Vault - Upload, Organize & Share Educational Resources' },
    { 
      property: 'og:description', 
      content: 'Upload, organize, and publish your study materials. Browse thousands of educational resources with instant search and smart pagination. Join Study Vault today!' 
    },
    { property: 'og:site_name', content: 'Study Vault' },
    { property: 'og:locale', content: 'en_US' },
    
    // Twitter
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: 'Study Vault - Upload, Organize & Share Educational Resources' },
    { 
      name: 'twitter:description', 
      content: 'Upload, organize, and publish your study materials. Browse thousands of educational resources with instant search and smart pagination.' 
    },
    { name: 'twitter:site', content: '@studyvault' },
    { name: 'twitter:creator', content: '@studyvault' },
    
    // Additional SEO
    { name: 'robots', content: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1' },
    { name: 'googlebot', content: 'index, follow' },
    { name: 'author', content: 'Study Vault' },
    { name: 'theme-color', content: '#d97757' },
    { name: 'application-name', content: 'Study Vault' },
    
    // Mobile Optimization
    { name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=5' },
    { name: 'mobile-web-app-capable', content: 'yes' },
    { name: 'apple-mobile-web-app-capable', content: 'yes' },
    { name: 'apple-mobile-web-app-status-bar-style', content: 'default' },
    { name: 'apple-mobile-web-app-title', content: 'Study Vault' },
    
    // Schema.org markup
    {
      'script:ld+json': {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: 'Study Vault',
        description: 'Upload, organize, and share educational resources with students worldwide',
        url: 'https://studyvault.com',
        potentialAction: {
          '@type': 'SearchAction',
          target: 'https://studyvault.com/resources?q={search_term_string}',
          'query-input': 'required name=search_term_string'
        }
      }
    },
  ];
};

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
