'use client';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface TextGenerateEffectProps {
  words: { text: string }[];
  className?: string;
}

export const TextGenerateEffect = ({
  words,
  className = '',
}: TextGenerateEffectProps) => {
  const [complete, setComplete] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setComplete(true);
    }, 1000);

    return () => clearTimeout(timeout);
  }, []);

  const renderWords = () => {
    return (
      <div className={`flex flex-wrap gap-2 ${className}`}>
        {words.map((word, idx) => {
          return (
            <motion.span
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: idx * 0.2,
                ease: [0.33, 1, 0.68, 1],
              }}
              className="relative"
            >
              {word.text}{' '}
            </motion.span>
          );
        })}
      </div>
    );
  };

  return renderWords();
};
