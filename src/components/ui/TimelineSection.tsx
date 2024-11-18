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

export default function TimelineSection({
  title,
  items,
  className = '',
}: TimelineSectionProps) {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
          }
        });
      },
      { threshold: 0.1 },
    );

    const elements = document.querySelectorAll('.reveal-on-scroll');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div className={`relative mt-24 ${className}`}>
      {/* Section Title */}
      <div className="sticky top-0 z-10 bg-background/80 pb-8 backdrop-blur-sm">
        <h2 className="reveal-on-scroll relative inline-block text-2xl font-semibold text-white after:absolute after:-bottom-2 after:left-0 after:h-px after:w-full after:bg-gradient-to-r after:from-transparent after:via-white/50 after:to-transparent after:content-['']">
          {title}
        </h2>
      </div>

      {/* Timeline */}
      <div className="relative">
        {/* Timeline line */}
        <div className="absolute bottom-0 left-[15px] top-0 w-px bg-gradient-to-b from-white/20 via-white/10 to-transparent" />

        <div className="space-y-8">
          {items.map((item, index) => (
            <div
              key={index}
              className="reveal-on-scroll group relative pl-12"
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              {/* Timeline dot */}
              <div className="absolute left-0 top-3 flex items-center justify-center">
                <div className="flex h-8 w-8 items-center justify-center rounded-full border border-white/20 bg-background transition-all duration-300 group-hover:border-white/40">
                  <div className="text-sm text-white/50 transition-all duration-300 group-hover:text-white/80">
                    {item.icon}
                  </div>
                </div>
              </div>

              {/* Content Card */}
              <div className="group/card relative">
                {/* Hover effect border */}
                <div className="absolute -inset-px rounded-2xl bg-gradient-to-r from-white/0 via-white/20 to-white/0 opacity-0 blur-sm transition-opacity duration-500 group-hover/card:opacity-100" />

                {/* Card content */}
                <div className="relative rounded-2xl border border-white/10 bg-white/5 p-6 transition-all duration-300 group-hover/card:border-white/20">
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
