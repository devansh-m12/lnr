'use client';

import { motion } from 'framer-motion';

const stickers = [
  '🎬', '🎵', '🎤', '🎸', '🎹', '🎼', '🎭', '🎪', '📽️', '🎧',
  '🔊', '🎙️', '🎥', '🎞️', '💿', '📀', '🎵', '🎶', '🎺', '🥁'
];

export function BackgroundStickers() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {stickers.map((sticker, index) => (
        <motion.div
          key={index}
          className="absolute text-4xl opacity-20 blur-[1px]"
          initial={{ 
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            rotate: Math.random() * 360,
            scale: 0
          }}
          animate={{
            rotate: [0, 360],
            scale: [0.8, 1.2],
            x: [
              Math.random() * window.innerWidth,
              Math.random() * window.innerWidth
            ],
            y: [
              Math.random() * window.innerHeight,
              Math.random() * window.innerHeight
            ]
          }}
          transition={{
            duration: Math.random() * 20 + 20,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "linear"
          }}
        >
          {sticker}
        </motion.div>
      ))}
    </div>
  );
} 