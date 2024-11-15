import { motion } from 'framer-motion';

interface SocialLink {
  url: string;
  problems_solved?: number;
  contest_rating?: number;
  repositories?: number;
  stars?: number;
  rating?: number;
  division?: string;
  title?: string;
}

export default function SocialLinks({ links }: { links: Record<string, SocialLink> }) {
  return (
    <div className="flex flex-wrap gap-6 text-sm">
      {Object.entries(links).map(([platform, data], index) => (
        <motion.div
          key={platform}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 + (index * 0.1) }}
          className="group"
        >
          <a 
            href={data.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/60 hover:text-white transition-colors"
          >
            {platform}
          </a>
          {platform === 'leetcode' && (
            <div className="text-xs text-white/40 mt-1">
              {data.problems_solved} solved • Rating: {data.contest_rating}
            </div>
          )}
          {platform === 'github' && (
            <div className="text-xs text-white/40 mt-1">
              {data.repositories} repos • {data.stars} stars
            </div>
          )}
          {(platform === 'codechef' || platform === 'codeforces') && (
            <div className="text-xs text-white/40 mt-1">
              Rating: {data.rating} • {data.title || data.division}
            </div>
          )}
        </motion.div>
      ))}
    </div>
  );
} 