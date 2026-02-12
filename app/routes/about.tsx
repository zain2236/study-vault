import { Link } from 'react-router';

import { BookOpen, Users, Target, Zap, Award, Heart, TrendingUp, Sparkles, Globe, Shield, Clock, CheckCircle } from 'lucide-react';
import { getTotalResourceCount, getTotalUserCount } from '~/utils/prisma/resource-prisma.server';

export async function loader() {
  const totalUser = await getTotalUserCount() || 0
  const totalResource = await getTotalResourceCount() || 0

  return {totalResource , totalUser}
}

const AboutPage = ({loaderData} : any) => {
  const stats = [
    { label: 'Active Users', value: `${loaderData.totalUser + 100}+`, icon: Users },
    { label: 'Resources Shared', value: `${loaderData.totalResource + 150}+`, icon: BookOpen },
    { label: 'Universities', value: '10+', icon: Globe },
    { label: 'Success Rate', value: '98%', icon: TrendingUp }
  ];

  const features = [
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Access thousands of study materials instantly with our optimized platform.'
    },
    {
      icon: Shield,
      title: 'Secure & Safe',
      description: 'Your data is protected with industry-standard encryption and security measures.'
    },
    {
      icon: Heart,
      title: 'Community Driven',
      description: 'Built by students, for students. Share knowledge and help each other succeed.'
    },
    {
      icon: Award,
      title: 'Quality Content',
      description: 'All resources are verified and curated to ensure the highest quality standards.'
    }
  ];

  const values = [
    {
      title: 'Accessibility',
      description: 'Education should be accessible to everyone, everywhere.',
      icon: Globe
    },
    {
      title: 'Collaboration',
      description: 'Together we achieve more. Knowledge grows when shared.',
      icon: Users
    },
    {
      title: 'Excellence',
      description: 'We strive for excellence in everything we deliver to students.',
      icon: Target
    }
  ];

  const timeline = [
    { year: '2024', event: 'Platform Launch', description: 'Started with a simple idea to help students' },
    { year: '2025', event: 'Reached 100 Users', description: 'Community began to grow rapidly' },
    { year: '2025', event: '200+ Resources', description: 'Became the largest student resource platform' },
    { year: '2026', event: 'Global Expansion', description: 'Now serving students in 2+ University' }
  ];

  return (
    <div className="min-h-screen bg-[#f5f5f0]">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-[#f5f5f0]">
        {/* Animated Background Elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#d97757]/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#c66847]/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center space-y-6">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#d97757]/10 backdrop-blur-md rounded-full border border-[#d97757]/20">
              <Sparkles className="w-4 h-4 text-[#d97757]" />
              <span className="text-sm font-semibold text-[#d97757]">About Us</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-heading font-bold text-gray-900 leading-tight">
              Empowering Students
              <span className="block mt-2 bg-linear-to-r from-[#d97757] to-[#c66847] bg-clip-text text-transparent">
                Through Knowledge
              </span>
            </h1>

            {/* Description */}
            <p className="max-w-3xl mx-auto text-lg sm:text-xl font-body text-gray-700 leading-relaxed">
              We're building the world's largest student-driven platform for sharing educational resources, 
              helping millions of students achieve their academic goals.
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
            {stats.map((stat, index) => (
              <div 
                key={index}
                className="group relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-200/50 overflow-hidden"
              >
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-linear-to-br from-[#d97757]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative z-10 space-y-3">
                  <div className="w-12 h-12 rounded-xl bg-linear-to-br from-[#d97757] to-[#c66847] flex items-center justify-center shadow-lg">
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="text-3xl font-heading font-bold text-gray-900">
                      {stat.value}
                    </div>
                    <div className="text-sm font-body text-gray-600 font-medium">
                      {stat.label}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="relative py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#d97757]/10 rounded-full">
                <Target className="w-4 h-4 text-[#d97757]" />
                <span className="text-sm font-semibold text-[#d97757]">Our Mission</span>
              </div>
              
              <h2 className="text-4xl lg:text-5xl font-heading font-bold text-gray-900 leading-tight">
                Making Education Accessible for Everyone
              </h2>
              
              <p className="text-lg font-body text-gray-700 leading-relaxed">
                We believe that quality educational resources should be free and accessible to all students, 
                regardless of their location or financial situation. Our platform connects students worldwide, 
                enabling them to share knowledge, collaborate, and succeed together.
              </p>
              
              <p className="text-lg font-body text-gray-700 leading-relaxed">
                By fostering a community of learners and contributors, we're breaking down barriers and 
                creating opportunities for millions of students to reach their full potential.
              </p>

              <div className="flex flex-wrap gap-4 pt-4">
                <div className="flex items-center gap-2 text-gray-800">
                  <CheckCircle className="w-5 h-5 text-[#d97757]" />
                  <span className="font-body font-medium">100% Free Access</span>
                </div>
                <div className="flex items-center gap-2 text-gray-800">
                  <CheckCircle className="w-5 h-5 text-[#d97757]" />
                  <span className="font-body font-medium">Community Verified</span>
                </div>
                <div className="flex items-center gap-2 text-gray-800">
                  <CheckCircle className="w-5 h-5 text-[#d97757]" />
                  <span className="font-body font-medium">Always Updated</span>
                </div>
              </div>
            </div>

            {/* Feature Cards */}
            <div className="grid grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <div 
                  key={index}
                  className="group bg-linear-to-br from-[#f9f9f5] to-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-200/50"
                >
                  <div className="w-12 h-12 rounded-xl bg-linear-to-br from-[#d97757] to-[#c66847] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg">
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-heading font-bold text-gray-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm font-body text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats Banner Section - Matching Features Page */}
      <section className="py-20 bg-linear-to-br from-[#d97757] to-[#c66847] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl lg:text-5xl font-heading font-bold mb-4">
              Join Thousands of Students
            </h2>
            <p className="text-xl font-body opacity-90">
              Making a difference in academic communities worldwide
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { number: `${loaderData.totalUser + 100}+`, label: "Active Students" },
              { number: `${loaderData.totalResource + 150}+`, label: "Resources Shared" },
              { number: "100K+", label: "Downloads" },
              { number: "99%", label: "Satisfaction Rate" }
            ].map((stat, idx) => (
              <div key={idx} className="text-center">
                <div className="text-5xl font-heading font-bold mb-2">{stat.number}</div>
                <div className="text-lg font-body opacity-90">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 bg-[#f5f5f0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#d97757]/10 rounded-full">
              <Heart className="w-4 h-4 text-[#d97757]" />
              <span className="text-sm font-semibold text-[#d97757]">Our Values</span>
            </div>
            
            <h2 className="text-4xl lg:text-5xl font-heading font-bold text-gray-900">
              What We Stand For
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <div 
                key={index}
                className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-200/50 overflow-hidden"
              >
                {/* Gradient Background */}
                <div className="absolute inset-0 bg-linear-to-br from-[#d97757]/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative z-10 space-y-4">
                  <div className="w-16 h-16 rounded-2xl bg-linear-to-br from-[#d97757] to-[#c66847] flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
                    <value.icon className="w-8 h-8 text-white" />
                  </div>
                  
                  <h3 className="text-2xl font-heading font-bold text-gray-900">
                    {value.title}
                  </h3>
                  
                  <p className="font-body text-gray-700 leading-relaxed">
                    {value.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#d97757]/10 rounded-full">
              <Clock className="w-4 h-4 text-[#d97757]" />
              <span className="text-sm font-semibold text-[#d97757]">Our Journey</span>
            </div>
            
            <h2 className="text-4xl lg:text-5xl font-heading font-bold text-gray-900">
              Growing Together
            </h2>
          </div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-linear-to-b from-[#d97757] to-[#c66847] rounded-full hidden lg:block" />

            <div className="space-y-12">
              {timeline.map((item, index) => (
                <div 
                  key={index}
                  className={`flex items-center gap-8 ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}
                >
                  <div className={`flex-1 ${index % 2 === 0 ? 'lg:text-right' : 'lg:text-left'}`}>
                    <div className="inline-block bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-200/50 group">
                      <div className="space-y-3">
                        <div className="text-3xl font-heading font-bold text-[#d97757]">{item.year}</div>
                        <h3 className="text-xl font-heading font-bold text-gray-900">{item.event}</h3>
                        <p className="font-body text-gray-600">{item.description}</p>
                      </div>
                    </div>
                  </div>

                  {/* Center Dot */}
                  <div className="hidden lg:block w-6 h-6 rounded-full bg-linear-to-br from-[#d97757] to-[#c66847] shadow-lg ring-4 ring-white shrink-0" />

                  <div className="flex-1" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-linear-to-br from-[#d97757] via-[#c66847] to-[#b55937]" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          <h2 className="text-4xl lg:text-5xl font-heading font-bold text-white">
            Join Our Growing Community
          </h2>
          
          <p className="text-xl font-body text-white/90 leading-relaxed max-w-2xl mx-auto">
            Be part of something bigger. Start sharing resources, helping fellow students, 
            and making education accessible to everyone.
          </p>

          <div className="flex flex-wrap gap-4 justify-center pt-4">
            <Link to='/sign-up' className="px-8 py-4 bg-white text-[#d97757] rounded-xl font-semibold text-lg shadow-2xl hover:shadow-xl transition-all duration-300 hover:scale-105 active:scale-95 flex items-center gap-2 group">
              Get Started
              <Sparkles className="w-5 h-5 group-hover:rotate-12 transition-transform" />
            </Link>
            
            <Link to='/about' className="px-8 py-4 bg-white/10 backdrop-blur-md text-white rounded-xl font-semibold text-lg border-2 border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105 active:scale-95">
              Learn More
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;