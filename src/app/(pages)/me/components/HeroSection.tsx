'use client';
import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { TextGenerateEffect } from '@/components/ui/TextGenerateEffect';
import ContactInfo from './ContactInfo';
import SocialLinks from './SocialLinks';

export default function HeroSection({ aboutData }: { aboutData: any }) {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll('.reveal-on-scroll');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const words = [
    { text: "Full" },
    { text: "Stack" },
    { text: "Developer" },
    { text: "&" },
    { text: "Problem" },
    { text: "Solver" },
  ];

  return (
    <div className="relative">
      {/* Animated background gradients */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -inset-[10px] opacity-30">
          <div className="absolute top-1/4 -left-1/4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob" />
          <div className="absolute top-1/3 -right-1/4 w-72 h-72 bg-yellow-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000" />
          <div className="absolute -bottom-1/4 left-1/3 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000" />
        </div>
      </div>

      <div className="relative grid gap-8 md:grid-cols-2 md:items-center p-6 max-w-7xl mx-auto" ref={sectionRef}>
        {/* Image Section */}
        <div className="group relative reveal-on-scroll w-full max-w-[400px] mx-auto">
          <div className="absolute -inset-4 rounded-2xl bg-gradient-to-tr from-purple-500/20 to-pink-500/20 blur-xl opacity-50 
            transition-all duration-500 group-hover:opacity-100 group-hover:blur-2xl animate-pulse-slow" />
          
          {/* LeetCode Profile Card */}
          <div className="absolute -top-12 right-0 bg-black/80 backdrop-blur-sm rounded-xl p-4 border border-white/10
            transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 z-10">
            <div className="flex items-center gap-4">
                Leetcode
              <div className="flex gap-4">
                <div className="text-center">
                  <div className="text-xl font-bold text-green-400">2,300</div>
                  <div className="text-xs text-gray-400">Rating</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-blue-400">Guardian</div>
                  <div className="text-xs text-gray-400">Rank</div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Image container with enhanced effects */}
          <div className="relative w-full pt-[100%] transform perspective-1000">
            <div className="absolute inset-0 rounded-2xl border border-white/20 bg-gradient-to-br from-white/10 to-transparent backdrop-blur-sm
              group-hover:border-white/30 transition-all duration-300 group-hover:rotate-2 transform-gpu" />
            
            <Image
              src="/me.jpeg"
              alt={aboutData.name}
              fill
              sizes="(max-width: 768px) 100vw, 400px"
              priority
              className="absolute inset-0 object-cover rounded-2xl shadow-2xl transition-all duration-700 
                group-hover:scale-[1.02] group-hover:shadow-[0_0_30px_rgba(168,85,247,0.3)] group-hover:-rotate-2"
            />
          </div>
        </div>

        {/* Info Section with enhanced card effects */}
        <div className="relative space-y-6 reveal-on-scroll" style={{ transitionDelay: '200ms' }}>
          <div className="relative group/card perspective-1000">
            <div className="absolute -inset-px rounded-2xl bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-yellow-500/20 
              opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 blur-lg animate-gradient-xy" />
            
            <div className="relative rounded-2xl border border-white/20 bg-black/50 backdrop-blur-xl p-6
              group-hover/card:border-white/30 transition-all duration-300 transform-gpu group-hover/card:translate-y-[-2px]">
              <div className="space-y-4">
                {/* Enhanced name and title section */}
                <div className="space-y-3">
                  <div className="overflow-hidden">
                    <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-purple-400 via-pink-400 to-yellow-400 
                      bg-clip-text text-transparent sm:text-5xl animate-slide-up">
                      {aboutData.name}
                    </h1>
                  </div>
                  
                  <div className="min-h-[2.5rem]">
                    <TextGenerateEffect words={words} className="text-gray-300" />
                  </div>

                  <div className="overflow-hidden">
                    <p className="text-base text-gray-300 rounded-full border border-white/20 bg-black/50 px-4 py-1.5 
                      backdrop-blur-xl hover:border-white/30 hover:bg-white/10 transition-all duration-300
                      animate-slide-up hover:shadow-[0_0_20px_rgba(168,85,247,0.2)]" style={{ animationDelay: '400ms' }}>
                      {aboutData.education[0].program} Student at {aboutData.education[0].school}
                    </p>
                  </div>
                </div>

                <ContactInfo aboutData={aboutData} />
                <SocialLinks links={aboutData.links} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 