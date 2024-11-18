'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';
import ContactInfo from './ContactInfo';
import SocialLinks from './SocialLinks';

interface AboutData {
  name: string;
  tagline: string;
  summary: string;
  education: Array<{
    school: string;
    program: string;
  }>;
  links: Record<string, any>;
}

export default function HeroSection({ aboutData }: { aboutData: AboutData }) {
  return (
    <div className="flex min-h-[90vh] items-center">
      <div className="grid w-full gap-12 md:grid-cols-2 md:items-center">
        {/* Image Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="relative mx-auto aspect-square w-full max-w-[400px]"
        >
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm" />
          <div className="absolute inset-0 rounded-2xl border border-white/10" />
          <Image
            src="/me.jpeg"
            alt={aboutData.name}
            fill
            sizes="(max-width: 768px) 100vw, 400px"
            priority
            className="rounded-2xl object-cover transition-transform duration-300 hover:scale-[1.02]"
          />
        </motion.div>

        {/* Info Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-8"
        >
          <div className="space-y-4">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-gradient-to-r from-white to-white/60 bg-clip-text text-6xl font-bold text-transparent"
            >
              {aboutData.name}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-2xl font-light text-white/80"
            >
              {aboutData.tagline}
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-lg leading-relaxed text-white/60"
            >
              {aboutData.summary}
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="text-sm font-medium text-white/60"
            >
              🎓 {aboutData.education[0].program} @{' '}
              {aboutData.education[0].school}
            </motion.p>
          </div>

          <ContactInfo aboutData={aboutData} />
          <SocialLinks links={aboutData.links} />
        </motion.div>
      </div>
    </div>
  );
}
