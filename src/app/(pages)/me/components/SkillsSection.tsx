'use client';
import { useEffect } from 'react';

interface Skills {
  programming: string[];
  technologies_and_frameworks: string[];
}

export default function SkillsSection({ skills }: { skills: Skills }) {
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

  const skillCategories = [
    { title: 'Programming Languages', items: skills.programming, icon: '💻' },
    { title: 'Technologies & Frameworks', items: skills.technologies_and_frameworks, icon: '🛠️' }
  ];

  return (
    <div className="mt-24 relative">
      {/* Section Title */}
      <div className="sticky top-0 z-10 bg-background/80 backdrop-blur-sm pb-8">
        <h2 className="text-2xl font-semibold text-white relative inline-block reveal-on-scroll
          after:content-[''] after:absolute after:-bottom-2 after:left-0 after:w-full 
          after:h-px after:bg-gradient-to-r after:from-transparent after:via-white/50 after:to-transparent">
          Skills & Technologies
        </h2>
      </div>
      
      {/* Timeline */}
      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-[15px] top-0 bottom-0 w-px bg-gradient-to-b from-white/20 via-white/10 to-transparent" />
        
        <div className="space-y-12">
          {skillCategories.map((category, index) => (
            <div 
              key={index} 
              className="group relative pl-12 reveal-on-scroll"
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              {/* Timeline dot */}
              <div className="absolute left-0 top-3 flex items-center justify-center">
                <div className="w-8 h-8 rounded-full border border-white/20 bg-background flex items-center justify-center
                  group-hover:border-white/40 transition-all duration-300">
                  <div className="text-white/50 group-hover:text-white/80 transition-all duration-300 text-sm">
                    {category.icon}
                  </div>
                </div>
              </div>

              {/* Skills Card */}
              <div className="relative group/card">
                {/* Hover effect border */}
                <div className="absolute -inset-px rounded-2xl bg-gradient-to-r from-white/0 via-white/20 to-white/0 
                  opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 blur-sm" />
                
                {/* Card content */}
                <div className="relative rounded-2xl border border-white/10 bg-white/5 p-6
                  group-hover/card:border-white/20 transition-all duration-300">
                  <div className="space-y-4">
                    {/* Category title */}
                    <h3 className="text-xl font-medium text-white">
                      {category.title}
                    </h3>

                    {/* Skills grid */}
                    <div className="flex flex-wrap gap-2">
                      {category.items.map((skill, idx) => (
                        <span
                          key={idx}
                          className="px-4 py-2 rounded-full text-sm border border-white/10 bg-white/5
                            text-white/60 hover:text-white/90 hover:border-white/20 hover:bg-white/10
                            transition-all duration-300 transform hover:scale-105 hover:shadow-[0_0_15px_rgba(255,255,255,0.1)]"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 