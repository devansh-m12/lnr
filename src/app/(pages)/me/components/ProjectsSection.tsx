'use client';
import { motion } from 'framer-motion';

interface Project {
  name: string;
  technologies: string[];
  description: string;
}

export default function ProjectsSection({ projects }: { projects: Project[] }) {
  return (
    <div className="space-y-12">
      <motion.h2
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-4xl font-extralight"
      >
        Featured Projects
      </motion.h2>

      <div className="space-y-16">
        {projects.map((project, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + index * 0.1 }}
            className="border-t border-white/10 pt-8"
          >
            <h3 className="mb-4 text-2xl font-extralight">{project.name}</h3>
            <p className="mb-6 text-white/60">{project.description}</p>
            <div className="flex flex-wrap gap-4">
              {project.technologies.map((tech, idx) => (
                <span key={idx} className="text-sm text-white/40">
                  {tech}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
