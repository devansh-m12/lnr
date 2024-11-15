'use client';
import { useEffect } from 'react';

interface TimelineItem {
  icon?: string;
  content: React.ReactNode;
}

interface TimelineSectionProps {
  title: string;
  items: TimelineItem[];
  className?: string;
}

export default function TimelineSection({ title, items, className = '' }: TimelineSectionProps) {
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
    <div className={`mt-24 relative ${className}`}>
      {/* Section Title */}
      <div className="sticky top-0 z-10 bg-background/80 backdrop-blur-sm pb-8">
        <h2 className="text-2xl font-semibold text-white relative inline-block reveal-on-scroll
          after:content-[''] after:absolute after:-bottom-2 after:left-0 after:w-full 
          after:h-px after:bg-gradient-to-r after:from-transparent after:via-white/50 after:to-transparent">
          {title}
        </h2>
      </div>
      
      {/* Timeline */}
      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-[15px] top-0 bottom-0 w-px bg-gradient-to-b from-white/20 via-white/10 to-transparent" />
        
        <div className="space-y-8">
          {items.map((item, index) => (
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
                    {item.icon}
                  </div>
                </div>
              </div>

              {/* Content Card */}
              <div className="relative group/card">
                {/* Hover effect border */}
                <div className="absolute -inset-px rounded-2xl bg-gradient-to-r from-white/0 via-white/20 to-white/0 
                  opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 blur-sm" />
                
                {/* Card content */}
                <div className="relative rounded-2xl border border-white/10 bg-white/5 p-6
                  group-hover/card:border-white/20 transition-all duration-300">
                  {item.content}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 