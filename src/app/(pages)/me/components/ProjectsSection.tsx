'use client';
import { useEffect } from 'react';

interface Project {
  name: string;
  technologies: string[];
  description: string;
}

export default function ProjectsSection({ projects }: { projects: Project[] }) {
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
    <div className="mt-24 relative">
      {/* Section Title */}
      <div className="sticky top-0 z-10 bg-background/80 backdrop-blur-sm pb-8">
        <h2 className="text-2xl font-semibold text-white relative inline-block reveal-on-scroll
          after:content-[''] after:absolute after:-bottom-2 after:left-0 after:w-full 
          after:h-px after:bg-gradient-to-r after:from-transparent after:via-white/50 after:to-transparent">
          Featured Projects
        </h2>
      </div>
      
      {/* Timeline */}
      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-[15px] top-0 bottom-0 w-px bg-gradient-to-b from-white/20 via-white/10 to-transparent" />
        
        <div className="space-y-12">
          {projects.map((project, index) => (
            <div 
              key={index} 
              className="group relative pl-12 reveal-on-scroll"
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              {/* Timeline dot */}
              <div className="absolute left-0 top-3 flex items-center justify-center">
                <div className="w-8 h-8 rounded-full border border-white/20 bg-background flex items-center justify-center">
                  <div className="w-3 h-3 rounded-full bg-white/50 group-hover:bg-white/80 transition-all duration-300" />
                </div>
              </div>

              {/* Project number instead of date */}
              <div className="absolute left-12 top-0 text-sm text-white/40 transform -translate-y-6
                group-hover:text-white/60 transition-colors duration-300">
                Project {index + 1}
              </div>

              {/* Project Card */}
              <div className="relative group/card">
                {/* Hover effect border */}
                <div className="absolute -inset-px rounded-2xl bg-gradient-to-r from-white/0 via-white/20 to-white/0 
                  opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 blur-sm" />
                
                {/* Card content */}
                <div className="relative rounded-2xl border border-white/10 bg-white/5 p-6
                  group-hover/card:border-white/20 transition-all duration-300">
                  <div className="space-y-4">
                    {/* Project title */}
                    <h3 className="text-xl font-medium text-white flex items-center space-x-3">
                      <span>{project.name}</span>
                    </h3>

                    {/* Technologies */}
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 rounded-full text-xs border border-white/10 bg-white/5
                            text-white/60 hover:text-white/90 hover:border-white/20 hover:bg-white/10
                            transition-all duration-300 transform hover:scale-105"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Description */}
                    <p className="text-white/60 group-hover/card:text-white/80 transition-colors duration-300">
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