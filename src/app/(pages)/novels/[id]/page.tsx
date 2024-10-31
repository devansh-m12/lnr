'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ContentStatus, ContentType } from '@prisma/client';
import { ChevronLeft, BookOpen } from 'lucide-react';

interface Chapter {
  id: string;
  title: string;
  chapter_number: number;
  created_at: string;
}

interface NovelDetail {
  id: string;
  title: string;
  description: string;
  cover_image_url: string | null;
  status: ContentStatus;
  rating: number;
  views: number;
  author: {
    id: string;
    username: string;
    avatar_url: string;
  };
  genres: {
    genre: {
      id: string;
      name: string;
    };
  }[];
  tags: {
    tag: {
      id: string;
      name: string;
    };
  }[];
  chapters: Chapter[];
}

export default function NovelDetailPage() {
  const { id } = useParams();
  const [novel, setNovel] = useState<NovelDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNovelDetail = async () => {
      try {
        const response = await fetch(`/api/novels/${id}`);
        if (!response.ok) throw new Error('Failed to fetch novel details');
        const data = await response.json();
        setNovel(data);
      } catch (error) {
        console.error('Error fetching novel details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchNovelDetail();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 text-gray-100 flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  if (!novel) {
    return (
      <div className="min-h-screen bg-gray-900 text-gray-100 flex items-center justify-center">
        <div className="text-xl">Novel not found</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <div className="container mx-auto p-4">
        <Link 
          href="/novels" 
          className="inline-flex items-center text-blue-400 hover:text-blue-300 mb-6"
        >
          <ChevronLeft size={20} />
          Back to Novels
        </Link>

        <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Cover Image */}
            <div className="aspect-[3/4] bg-gray-700 rounded-lg overflow-hidden">
              {novel.cover_image_url ? (
                <img 
                  src={novel.cover_image_url} 
                  alt={novel.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <BookOpen size={64} className="text-gray-500" />
                </div>
              )}
            </div>

            {/* Novel Info */}
            <div className="md:col-span-2">
              <h1 className="text-3xl font-bold mb-4">{novel.title}</h1>
              <div className="mb-4">
                <span className="text-gray-400">By: </span>
                <span className="text-blue-400">{novel.author.username}</span>
              </div>
              
              <div className="mb-4 flex gap-4">
                <div className="bg-gray-700 px-3 py-1 rounded">
                  <span className="text-gray-400">Status: </span>
                  <span className="text-blue-400">{novel.status}</span>
                </div>
                <div className="bg-gray-700 px-3 py-1 rounded">
                  <span className="text-gray-400">Rating: </span>
                  <span className="text-yellow-400">{novel.rating.toFixed(1)}</span>
                </div>
                <div className="bg-gray-700 px-3 py-1 rounded">
                  <span className="text-gray-400">Views: </span>
                  <span className="text-green-400">{novel.views}</span>
                </div>
              </div>

              <p className="text-gray-300 mb-6">{novel.description}</p>

              <div className="mb-4">
                <h3 className="text-lg font-semibold mb-2">Genres:</h3>
                <div className="flex flex-wrap gap-2">
                  {novel.genres.map(({ genre }) => (
                    <span key={genre.id} className="bg-blue-600 px-3 py-1 rounded-full text-sm">
                      {genre.name}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">Tags:</h3>
                <div className="flex flex-wrap gap-2">
                  {novel.tags.map(({ tag }) => (
                    <span key={tag.id} className="bg-green-600 px-3 py-1 rounded-full text-sm">
                      {tag.name}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Chapters List */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Chapters</h2>
          <div className="bg-gray-800 rounded-lg shadow-lg">
            {novel.chapters.map((chapter) => (
              <Link 
                href={`/novels/${novel.id}/chapters/${chapter.id}`} 
                key={chapter.id}
              >
                <div className="border-b border-gray-700 p-4 hover:bg-gray-700 transition duration-200">
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="text-gray-400">Chapter {chapter.chapter_number}: </span>
                      <span className="text-blue-400">{chapter.title}</span>
                    </div>
                    <div className="text-sm text-gray-500">
                      {new Date(chapter.created_at).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 