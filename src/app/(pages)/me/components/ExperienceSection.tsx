'use client';
import { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface Experience {
  company: string;
  title: string;
  start_date: string;
  end_date: string;
  location: string;
  responsibilities: string[];
}

export default function ExperienceSection({ experience }: { experience: Experience[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 10%", "end 50%"],
  });

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

  return (
    <div ref={containerRef} className="mt-24 relative max-w-7xl mx-auto">
      {/* Section Title */}
      <div className="sticky top-0 z-10 bg-background/80 backdrop-blur-sm pb-12">
        <h2 className="text-4xl font-bold text-white relative inline-block reveal-on-scroll">
          Work Experience
        </h2>
        <p className="text-white/60 mt-2 max-w-2xl">
          My professional journey and roles
        </p>
      </div>
      
      {/* Timeline */}
      <div className="relative" ref={timelineRef}>
        {/* Timeline line with gradient animation */}
        <motion.div 
          className="absolute left-8 top-0 bottom-0 w-[2px] bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] 
            from-transparent from-[0%] via-white/20 to-transparent to-[99%]
            [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)]"
        >
          <motion.div
            style={{
              scaleY: scrollYProgress,
              transformOrigin: 'top',
            }}
            className="absolute inset-x-0 top-0 h-full w-full bg-gradient-to-b from-purple-500 via-blue-500 to-transparent"
          />
        </motion.div>
        
        <div className="space-y-20">
          {experience.map((exp, index) => (
            <div 
              key={index} 
              className="group relative pl-32 reveal-on-scroll"
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              {/* Timeline dot with date */}
              <div className="absolute left-0 top-3 flex items-center w-28">
                {/* Date pill */}
                <div className="absolute right-14 -top-1 px-3 py-1 rounded-full bg-white/5 border border-white/10
                  text-xs font-medium text-white/70 whitespace-nowrap transform hover:scale-105 
                  transition-all duration-300 hover:border-white/20 hover:bg-white/10">
                  {exp.start_date}
                  <span className="mx-1 text-white/40">→</span>
                  {exp.end_date}
                </div>
                
                {/* Timeline dot */}
                <div className="absolute right-0 h-10 w-10 rounded-full bg-background border border-white/20 
                  flex items-center justify-center">
                  <div className="w-4 h-4 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 
                    group-hover:scale-125 transition-all duration-300" />
                </div>
              </div>

              {/* Experience Card */}
              <div className="relative group/card">
                {/* Hover effect border */}
                <div className="absolute -inset-px rounded-2xl bg-gradient-to-r from-purple-500/20 via-blue-500/20 to-transparent 
                  opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 blur-sm" />
                
                {/* Card content */}
                <div className="relative rounded-2xl border border-white/10 bg-white/5 p-8
                  group-hover/card:border-white/20 transition-all duration-300">
                  <div className="space-y-6">
                    {/* Company and Position */}
                    <div>
                      <h3 className="text-2xl font-semibold text-white">
                        {exp.title}
                      </h3>
                      <div className="flex items-center gap-2 mt-1">
                        <p className="text-white/80 text-lg">
                          {exp.company}
                        </p>
                        <span className="text-white/40">•</span>
                        <p className="text-white/60 text-sm">
                          {exp.location}
                        </p>
                      </div>
                    </div>

                    {/* Responsibilities */}
                    <ul className="space-y-3 list-disc list-inside text-white/60 group-hover/card:text-white/80 
                      transition-colors duration-300 text-lg">
                      {exp.responsibilities.map((responsibility, idx) => (
                        <li key={idx} className="pl-2">
                          {responsibility}
                        </li>
                      ))}
                    </ul>
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