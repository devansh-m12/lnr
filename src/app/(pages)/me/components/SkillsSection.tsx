'use client';
import { motion } from 'framer-motion';

interface Skill {
  name: string;
  proficiency: string;
  years?: number;
  projects?: number;
}

interface Skills {
  programming: Skill[];
  technologies_and_frameworks: Skill[];
  additional_skills: string[];
}

export default function SkillsSection({ skills }: { skills: Skills }) {
  return (
    <div className="space-y-12">
      <motion.h2 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-4xl font-extralight"
      >
        Skills & Technologies
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h3 className="text-white/40 mb-6">Programming Languages</h3>
          <div className="space-y-4">
            {skills.programming.map((skill, index) => (
              <div key={index} className="group">
                <div className="flex justify-between text-white/80">
                  <span>{skill.name}</span>
                  <span className="text-white/40">{skill.proficiency}</span>
                </div>
                <div className="text-sm text-white/40">
                  {skill.years} years experience
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h3 className="text-white/40 mb-6">Technologies & Frameworks</h3>
          <div className="space-y-4">
            {skills.technologies_and_frameworks.map((tech, index) => (
              <div key={index} className="group">
                <div className="flex justify-between text-white/80">
                  <span>{tech.name}</span>
                  <span className="text-white/40">{tech.proficiency}</span>
                </div>
                <div className="text-sm text-white/40">
                  {tech.projects} projects completed
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="md:col-span-2"
        >
          <h3 className="text-white/40 mb-6">Additional Skills</h3>
          <div className="flex flex-wrap gap-4">
            {skills.additional_skills.map((skill, index) => (
              <span key={index} className="px-3 py-1 rounded-full bg-white/5 text-white/60 text-sm">
                {skill}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
} 