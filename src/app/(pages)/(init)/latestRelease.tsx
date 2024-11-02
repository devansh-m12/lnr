'use client';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { Carousel, Card } from '@/components/ui/apple-cards-carousel';
import { Novel } from '@/types/novel';
import { ContentType } from '@prisma/client';

interface ContentProps {
  content: Novel;
}

const Content = ({ content }: ContentProps) => {
  return (
    <div className="mb-4 rounded-3xl bg-[#F5F5F7] p-8 dark:bg-neutral-800 md:p-14">
      <div className="flex flex-col items-center gap-8 md:flex-row">
        {/* Image Section */}
        <div className="relative aspect-[1/3] min-h-[50px] w-full md:w-1/3">
          <Image
            src={content.cover_image_url}
            alt={`Cover image for ${content.title}`}
            fill
            className="rounded-lg object-cover"
            priority
          />
        </div>

        {/* Content Section */}
        <div className="space-y-4 md:w-2/3">
          <h3 className="text-2xl font-bold text-neutral-800 dark:text-neutral-200 md:text-3xl">
            {content.title}
          </h3>

          <p className="text-base text-neutral-600 dark:text-neutral-400 md:text-lg">
            {content.description}
          </p>

          <div className="flex items-center gap-4 text-sm text-neutral-500 dark:text-neutral-400">
            <span className="rounded bg-neutral-200 px-2 py-1 dark:bg-neutral-700">
              {content.status}
            </span>
            <span>Views: {content.views}</span>
            <span>Rating: {content.rating}/5</span>
          </div>
        </div>
      </div>
    </div>
  );
};

interface LatestReleaseProps {
  type?: ContentType;
}

export function LatestRelease({ type }: LatestReleaseProps) {
  const [content, setContent] = useState<Novel[]>([]);

  useEffect(() => {
    const fetchContent = async () => {
      const response = await fetch('/api/content', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sortBy: 'created_at',
          order: 'desc',
          type: type,
          limit: 10
        })
      });
      const data = await response.json();
      setContent(data.content);
    };
    fetchContent();
  }, [type]);

  const cards = content?.map((item) => ({
    category: item.type,
    title: item.title,
    src: item.cover_image_url,
    content: <Content content={item} />,
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
