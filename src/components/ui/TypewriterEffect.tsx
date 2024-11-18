'use client';

import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';

interface TypewriterEffectProps {
  words: {
    text: string;
  }[];
  className?: string;
}

export const TypewriterEffect: React.FC<TypewriterEffectProps> = ({
  words,
  className,
}) => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const typeSpeed = isDeleting ? 50 : 100;
    const word = words[currentWordIndex].text;

    const timer = setTimeout(() => {
      if (!isDeleting) {
        setCurrentText(word.slice(0, currentText.length + 1));
      } else {
        setCurrentText(word.slice(0, currentText.length - 1));
      }
    }, typeSpeed);

    if (!isDeleting && currentText === word) {
      setTimeout(() => setIsDeleting(true), 1500);
    } else if (isDeleting && currentText === '') {
      setIsDeleting(false);
      setCurrentWordIndex((current) => (current + 1) % words.length);
    }

    return () => clearTimeout(timer);
  }, [currentText, currentWordIndex, isDeleting, words]);

  return (
    <span className={cn('inline-block', className)}>
      {currentText}
      <span className="animate-caret-blink">|</span>
    </span>
  );
};
