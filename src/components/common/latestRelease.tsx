'use client';
import Image from 'next/image';
import React from 'react';
import { Carousel, Card } from '@/components/ui/apple-cards-carousel';
import { Novel } from '@/types/novel';

interface ContentProps {
  novel: Novel;
}

const Content = ({ novel }: ContentProps) => {
  return (
    <div className="mb-4 rounded-3xl bg-[#F5F5F7] p-8 dark:bg-neutral-800 md:p-14">
      <div className="flex flex-col items-center gap-8 md:flex-row">
        {/* Image Section */}
        <div className="relative aspect-[1/3] min-h-[50px] w-full md:w-1/3">
          <Image
            src={novel.cover_image_url}
            alt={`Cover image for ${novel.title}`}
            fill
            className="rounded-lg object-cover"
            priority
          />
        </div>

        {/* Content Section */}
        <div className="space-y-4 md:w-2/3">
          <h3 className="text-2xl font-bold text-neutral-800 dark:text-neutral-200 md:text-3xl">
            {novel.title}
          </h3>

          <p className="text-base text-neutral-600 dark:text-neutral-400 md:text-lg">
            {novel.description}
          </p>

          <div className="flex items-center gap-4 text-sm text-neutral-500 dark:text-neutral-400">
            <span className="rounded bg-neutral-200 px-2 py-1 dark:bg-neutral-700">
              {novel.status}
            </span>
            <span>Views: {novel.views}</span>
            <span>Rating: {novel.rating}/5</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export function LatestRelease({ novels }: { novels: Novel[] }) {
  const cards = novels.map((novel) => ({
    category: novel.type,
    title: novel.title,
    src: novel.cover_image_url,
    content: <Content novel={novel} />,
  }));

  const carouselCards = cards.map((card, index) => (
    <Card key={`${card.src}-${index}`} card={card} index={index} />
  ));

  return (
    <div className="h-full w-full py-20">
      <h2 className="mx-auto max-w-7xl pl-4 font-sans text-xl font-bold text-neutral-800 dark:text-neutral-200 md:text-5xl">
        Latest Releases
      </h2>
      <Carousel items={carouselCards} />
    </div>
  );
}
