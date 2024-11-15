'use client';
import TimelineSection from '@/components/ui/TimelineSection';

interface Skills {
  programming: string[];
  technologies_and_frameworks: string[];
}

export default function SkillsSection({ skills }: { skills: Skills }) {
  const skillCategories = [
    { title: 'Programming Languages', items: skills.programming, icon: '💻' },
    { title: 'Technologies & Frameworks', items: skills.technologies_and_frameworks, icon: '🛠️' }
  ];

  const timelineItems = skillCategories.map(category => ({
    icon: category.icon,
    content: (
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
    )
  }));

  return (
    <TimelineSection
      title="Skills & Technologies"
      items={timelineItems}
    />
  );
} 