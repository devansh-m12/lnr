'use client';
import { motion } from 'framer-motion';

interface Experience {
  company: string;
  title: string;
  start_date: string;
  end_date: string;
  location: string;
  responsibilities: string[];
}

export default function ExperienceSection({
  experience,
}: {
  experience: Experience[];
}) {
  return (
    <div className="space-y-12">
      <motion.h2
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="mb-12 text-4xl font-extralight"
      >
        Experience
      </motion.h2>

      <div className="relative space-y-12">
        {/* Timeline line */}
        <div className="absolute bottom-0 left-0 top-0 w-[1px] bg-white/10" />

        {experience.map((exp, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 + index * 0.1 }}
            className="group relative pl-8"
          >
            {/* Timeline dot */}
            <div className="absolute left-[-4px] top-2 h-2 w-2 rounded-full bg-white/40 transition-colors duration-300 group-hover:bg-white/80" />

            {/* Date */}
            <div className="mb-2 text-sm text-white/40">
              {exp.start_date} — {exp.end_date}
            </div>

            {/* Content */}
            <div className="space-y-2">
              <h3 className="text-xl font-light text-white/90">{exp.title}</h3>
              <div className="text-white/60">
                {exp.company} • {exp.location}
              </div>

              {/* Responsibilities */}
              <ul className="mt-4 space-y-2 text-sm text-white/50">
                {exp.responsibilities.map((responsibility, idx) => (
                  <li
                    key={idx}
                    className="transition-colors duration-300 group-hover:text-white/70"
                  >
                    {responsibility}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
