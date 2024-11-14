'use client';
import { useEffect } from 'react';

export default function ContactInfo({ aboutData }: { aboutData: any }) {
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
    <div className="space-y-3">
      {[
        { icon: '📧', value: aboutData.email },
        { icon: '📱', value: aboutData.phone },
        { icon: '📍', value: aboutData.education[0].location }
      ].map((item, index) => (
        <div 
          key={index}
          className="group flex items-center space-x-3 rounded-full border border-white/10 bg-white/5 px-4 py-2 
            text-sm text-gray-300 backdrop-blur-sm hover:border-white/20 hover:bg-white/10 
            transition-all duration-300 cursor-pointer hover:shadow-[0_0_15px_rgba(255,255,255,0.1)] 
            transform hover:-translate-y-0.5 reveal-on-scroll relative"
          style={{ transitionDelay: `${index * 100}ms` }}
        >
          {/* Box decorations */}
          <div className="absolute -top-1 -left-1 w-2 h-2 border-l border-t border-white/20 opacity-0 
            transition-opacity duration-300 group-hover:opacity-100" />
          <div className="absolute -bottom-1 -right-1 w-2 h-2 border-r border-b border-white/20 opacity-0 
            transition-opacity duration-300 group-hover:opacity-100" />
          
          <span className="transform group-hover:scale-110 transition-transform duration-300">
            {item.icon}
          </span>
          <span className="group-hover:text-white transition-colors duration-300">
            {item.value}
          </span>
        </div>
      ))}
    </div>
  );
} 