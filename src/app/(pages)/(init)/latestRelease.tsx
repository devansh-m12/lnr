'use client';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { Novel } from '@/types/novel';
import { ContentType } from '@prisma/client';

interface ContentItemProps {
  content: Novel;
}

const ContentItem = ({ content }: ContentItemProps) => {
  return (
    <Link href={`/content/${content.id}`}>
      <div className="group h-full cursor-pointer rounded-3xl bg-[#F5F5F7] p-6 transition-all hover:bg-[#E8E8EA] dark:bg-neutral-800 dark:hover:bg-neutral-700">
        <div className="flex flex-col gap-6 md:flex-row">
          {/* Image Section */}
          <div className="relative aspect-[2/3] w-full md:w-1/4">
            <Image
              src={content.cover_image_url}
              alt={`Cover image for ${content.title}`}
              fill
              className="rounded-lg object-cover"
              priority
            />
          </div>

          {/* Content Section */}
          <div className="flex flex-col justify-between space-y-4 md:w-3/4">
            <div>
              <h3 className="text-xl font-bold text-neutral-800 dark:text-neutral-200 md:text-2xl">
                {content.title}
              </h3>

              <p className="mt-2 line-clamp-3 text-sm text-neutral-600 dark:text-neutral-400 md:text-base">
                {content.description}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4 text-sm text-neutral-500 dark:text-neutral-400">
              <span className="rounded bg-neutral-200 px-2 py-1 dark:bg-neutral-700">
                {content.status}
              </span>
              <span>Views: {content.views}</span>
              <span>Rating: {content.rating}/5</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

interface LatestReleaseProps {
  type?: ContentType;
}

export function LatestRelease({ type }: LatestReleaseProps) {
  const [content, setContent] = useState<Novel[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
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

        if (!response.ok) {
          throw new Error(`Failed to fetch content: ${response.statusText}`);
        }

        const data = await response.json();
        setContent(data.content);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch content');
      } finally {
        setIsLoading(false);
      }
    };

    fetchContent();
  }, [type]);

  return (
    <div className="w-full py-20">
      <div className="mx-auto max-w-7xl px-4">
        <h2 className="mb-8 font-sans text-xl font-bold text-neutral-800 dark:text-neutral-200 md:text-5xl">
          Latest Releases
        </h2>
        
        {isLoading && (
          <div className="flex justify-center py-8">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-neutral-300 border-t-neutral-800"></div>
          </div>
        )}

        {error && (
          <div className="rounded-lg bg-red-50 p-4 text-red-800 dark:bg-red-900/50 dark:text-red-200">
            <p>{error}</p>
            <button 
              onClick={() => window.location.reload()}
              className="mt-2 text-sm underline hover:no-underline"
            >
              Try again
            </button>
          </div>
        )}

        {!isLoading && !error && (
          <div className="grid gap-6">
            {content.map((item) => (
              <ContentItem key={item.id} content={item} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
