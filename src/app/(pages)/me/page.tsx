'use client';
import React, { useEffect } from 'react';
import aboutData from './about.json';
import HeroSection from './components/HeroSection';
import SkillsSection from './components/SkillsSection';
import AchievementsSection from './components/AchievementsSection';
import ProjectsSection from './components/ProjectsSection';
import ExperienceSection from './components/ExperienceSection';
import { handleScrollAnimation } from '@/utils/scrollAnimation';

export default function AboutPage() {
  useEffect(() => {
    handleScrollAnimation();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="relative">
        {/* Enhanced Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute -left-4 top-0 h-[500px] w-[500px] animate-subtle-drift rounded-full bg-purple-500/[0.08] blur-[120px]" />
          <div className="absolute bottom-0 right-0 h-[500px] w-[500px] animate-subtle-drift-delayed rounded-full bg-blue-500/[0.08] blur-[120px]" />
          <div className="absolute top-1/2 left-1/2 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 animate-pulse rounded-full bg-white/[0.05] blur-[90px]" />
          {/* Added new floating particles effect */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="particles-container animate-float" />
          </div>
        </div>
        
        {/* Enhanced Grid Background */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,black_70%,transparent_110%)]">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/[0.02] to-transparent"></div>
        </div>

        {/* Main Content with scroll animations */}
        <div className="relative z-10 px-6 py-24 sm:px-8 md:px-12">
          <div className="mx-auto max-w-7xl space-y-32">
            <div className="scroll-fade-in">
              <HeroSection aboutData={aboutData} />
            </div>
            <div className="scroll-fade-in">
              <SkillsSection skills={aboutData.skills} />
            </div>
            <div className="scroll-fade-in">
              <AchievementsSection achievements={aboutData.achievements} />
            </div>
            <div className="scroll-fade-in">
              <ProjectsSection projects={aboutData.projects} />
            </div>
            <div className="scroll-fade-in">
              <ExperienceSection experience={aboutData.experience} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
