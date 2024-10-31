"use client";
import Image from "next/image";
import React from "react";
import { Carousel, Card } from "@/components/ui/apple-cards-carousel";
import { Novel } from "@/types/novel";

interface ContentProps {
  novel: Novel;
}

const Content = ({ novel }: ContentProps) => {
  return (
    <div className="bg-[#F5F5F7] dark:bg-neutral-800 p-8 md:p-14 rounded-3xl mb-4">
      <div className="flex flex-col md:flex-row gap-8 items-center">
        {/* Image Section */}
        <div className="relative w-full md:w-1/3 aspect-[1/3] min-h-[50px]">
          <Image
            src={novel.cover_image_url}
            alt={`Cover image for ${novel.title}`}
            fill
            className="object-cover rounded-lg"
            priority
          />
        </div>

        {/* Content Section */}
        <div className="md:w-2/3 space-y-4">
          <h3 className="text-2xl md:text-3xl font-bold text-neutral-800 dark:text-neutral-200">
            {novel.title}
          </h3>
          
          <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-lg">
            {novel.description}
          </p>
          
          <div className="flex items-center gap-4 text-sm text-neutral-500 dark:text-neutral-400">
            <span className="px-2 py-1 bg-neutral-200 dark:bg-neutral-700 rounded">
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
    <div className="w-full h-full py-20">
      <h2 className="max-w-7xl pl-4 mx-auto text-xl md:text-5xl font-bold text-neutral-800 dark:text-neutral-200 font-sans">
        Latest Releases
      </h2>
      <Carousel items={carouselCards} />
    </div>
  );
}
