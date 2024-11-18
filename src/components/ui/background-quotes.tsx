'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const quotes = [
  { text: 'I feel like Pablo', author: 'Kanye West', category: 'Hip-Hop' },
  {
    text: "I'm not a businessman, I'm a business, man",
    author: 'Jay-Z',
    category: 'Hip-Hop',
  },
  { text: 'I see dead people', author: 'The Sixth Sense', category: 'Cinema' },
  {
    text: "I'm gonna make him an offer he can't refuse",
    author: 'The Godfather',
    category: 'Cinema',
  },
  {
    text: "Here's looking at you, kid",
    author: 'Casablanca',
    category: 'Cinema',
  },
  {
    text: 'Everything I am not made me everything I am',
    author: 'Kanye West',
    category: 'Hip-Hop',
  },
];

export function BackgroundQuotes() {
  const [visibleQuotes, setVisibleQuotes] = useState<
    Array<{
      text: string;
      author: string;
      category: string;
      position: { x: number; y: number };
      rotation: number;
    }>
  >();

  useEffect(() => {
    const generatePositions = () => {
      return quotes.map((quote) => ({
        ...quote,
        position: {
          x: Math.random() * 80 + 10,
          y: Math.random() * 80 + 10,
        },
        rotation: Math.random() * 10 - 5,
      }));
    };

    setVisibleQuotes(generatePositions());
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0">
      {visibleQuotes?.map((quote, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{
            opacity: 0.15,
            scale: 1,
            rotate: quote.rotation,
          }}
          transition={{
            duration: 1,
            delay: index * 0.2,
            repeat: Infinity,
            repeatType: 'reverse',
            repeatDelay: 5,
          }}
          className="absolute text-sm text-white"
          style={{
            left: `${quote.position.x}%`,
            top: `${quote.position.y}%`,
            transform: 'translate(-50%, -50%)',
          }}
        >
          <div className="rounded-lg border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
            <p className="font-serif italic">{quote.text}</p>
            <div className="mt-2 flex justify-between text-xs">
              <p>- {quote.author}</p>
              <span className="text-gray-400">{quote.category}</span>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
