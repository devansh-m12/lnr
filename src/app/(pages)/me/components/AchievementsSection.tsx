'use client';
import TimelineSection from '@/components/ui/TimelineSection';

export default function AchievementsSection({
  achievements,
}: {
  achievements: string[];
}) {
  const timelineItems = achievements.map((achievement) => ({
    icon: '🏆',
    content: (
      <p className="text-white/60 transition-colors duration-300 group-hover/card:text-white/90">
        {achievement}
      </p>
    ),
  }));

  return <TimelineSection title="Achievements" items={timelineItems} />;
}
