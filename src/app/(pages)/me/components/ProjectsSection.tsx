'use client';
import { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface Project {
  name: string;
  technologies: string[];
  description: string;
  start_date?: string;
  end_date?: string;
}

export default function ProjectsSection({ projects }: { projects: Project[] }) {
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
          Featured Projects
        </h2>
        <p className="text-white/60 mt-2 max-w-2xl">
          A showcase of my recent work and side projects
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
          {projects.map((project, index) => (
            <div 
              key={index} 
              className="group relative pl-32 reveal-on-scroll"
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              {/* Timeline dot with project number */}
              <div className="absolute left-0 top-3 flex items-center w-28">
                {/* Project number pill */}
                <div className="absolute right-14 -top-1 px-3 py-1 rounded-full bg-white/5 border border-white/10
                  text-xs font-medium text-white/70 whitespace-nowrap transform hover:scale-105 
                  transition-all duration-300 hover:border-white/20 hover:bg-white/10">
                  Project {String(index + 1).padStart(2, '0')}
                </div>
                
                {/* Timeline dot */}
                <div className="absolute right-0 h-10 w-10 rounded-full bg-background border border-white/20 
                  flex items-center justify-center">
                  <div className="w-4 h-4 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 
                    group-hover:scale-125 transition-all duration-300" />
                </div>
              </div>

              {/* Project Card */}
              <div className="relative group/card">
                {/* Hover effect border */}
                <div className="absolute -inset-px rounded-2xl bg-gradient-to-r from-purple-500/20 via-blue-500/20 to-transparent 
                  opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 blur-sm" />
                
                {/* Card content */}
                <div className="relative rounded-2xl border border-white/10 bg-white/5 p-8
                  group-hover/card:border-white/20 transition-all duration-300">
                  <div className="space-y-6">
                    {/* Project title */}
                    <h3 className="text-2xl font-semibold text-white">
                      {project.name}
                    </h3>

                    {/* Technologies */}
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech, idx) => (
                        <span
                          key={idx}
                          className="px-4 py-1.5 rounded-full text-sm border border-white/10 bg-white/5
                            text-white/70 hover:text-white hover:border-white/30 hover:bg-white/10
                            transition-all duration-300 transform hover:scale-105"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Description */}
                    <p className="text-white/60 group-hover/card:text-white/80 transition-colors duration-300 text-lg">
                      {project.description}
                    </p>
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