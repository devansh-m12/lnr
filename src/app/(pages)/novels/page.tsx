'use client';

import { useState, useEffect } from 'react';
import { ContentStatus, ContentType } from '@prisma/client';
import { XCircle, Plus, Filter, ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';

interface Novel {
  id: string;
  title: string;
  description: string;
  status: ContentStatus;
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
}

interface PaginationData {
  total: number;
  pages: number;
  currentPage: number;
  limit: number;
}

interface Genre {
  id: string;
  name: string;
  description: string;
}

interface Tag {
  id: string;
  name: string;
  description: string;
}

export default function NovelsPage() {
  const [novels, setNovels] = useState<Novel[]>([]);
  const [pagination, setPagination] = useState<PaginationData>();
  const [sortBy, setSortBy] = useState('created_at');
  const [order, setOrder] = useState('desc');
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [status, setStatus] = useState<ContentStatus | null>(null);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [availableGenres, setAvailableGenres] = useState<Genre[]>([]);
  const [availableTags, setAvailableTags] = useState<Tag[]>([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState<Set<string>>(new Set());

  const addFilter = (filterType: string) => {
    setActiveFilters((prev) => new Set([...prev, filterType]));
  };

  const removeFilter = (filterType: string) => {
    setActiveFilters((prev) => {
      const newFilters = new Set(prev);
      newFilters.delete(filterType);
      return newFilters;
    });

    switch (filterType) {
      case 'sort':
        setSortBy('created_at');
        setOrder('desc');
        break;
      case 'genres':
        setSelectedGenres([]);
        break;
      case 'tags':
        setSelectedTags([]);
        break;
      case 'status':
        setStatus(null);
        break;
    }
  };

  const fetchGenres = async () => {
    try {
      const response = await fetch('/api/available-genre');
      if (!response.ok) throw new Error('Failed to fetch genres');
      const data = await response.json();
      setAvailableGenres(data);
    } catch (error) {
      console.error('Error fetching genres:', error);
    }
  };

  const fetchTags = async () => {
    try {
      const response = await fetch('/api/available-tags');
      if (!response.ok) throw new Error('Failed to fetch tags');
      const data = await response.json();
      setAvailableTags(data);
    } catch (error) {
      console.error('Error fetching tags:', error);
    }
  };

  const fetchNovels = async () => {
    try {
      const response = await fetch('/api/novels', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sortBy,
          order,
          genres: selectedGenres,
          tags: selectedTags,
          status,
          type: ContentType.NOVEL,
          search,
          page,
          limit,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch novels');
      }

      const data = await response.json();
      setNovels(data.novels);
      setPagination(data.pagination);
    } catch (error) {
      console.error('Error fetching novels:', error);
    }
  };

  useEffect(() => {
    fetchGenres();
    fetchTags();
  }, []);

  useEffect(() => {
    fetchNovels();
  }, [sortBy, order, selectedGenres, selectedTags, status, search, page]);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <div className="container mx-auto p-4">
        <div className="mb-6 rounded-lg bg-gray-800 p-6 shadow-lg">
          <div className="mb-4 flex items-center justify-between">
            <input
              type="text"
              placeholder="Search novels..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="mr-4 flex-grow rounded border border-gray-600 bg-gray-700 p-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="flex items-center gap-2 rounded bg-blue-600 px-4 py-2 text-white transition duration-300 hover:bg-blue-700"
            >
              <Filter size={20} />
              {isFilterOpen ? 'Close Filters' : 'Open Filters'}
            </button>
          </div>

          {isFilterOpen && (
            <div className="space-y-4">
              {!activeFilters.has('sort') && (
                <button
                  onClick={() => addFilter('sort')}
                  className="flex items-center gap-2 text-blue-400 transition duration-300 hover:text-blue-300"
                >
                  <Plus size={20} /> Add Sort Filter
                </button>
              )}

              {!activeFilters.has('genres') && (
                <button
                  onClick={() => addFilter('genres')}
                  className="flex items-center gap-2 text-blue-400 transition duration-300 hover:text-blue-300"
                >
                  <Plus size={20} /> Add Genres Filter
                </button>
              )}

              {!activeFilters.has('tags') && (
                <button
                  onClick={() => addFilter('tags')}
                  className="flex items-center gap-2 text-blue-400 transition duration-300 hover:text-blue-300"
                >
                  <Plus size={20} /> Add Tags Filter
                </button>
              )}

              {!activeFilters.has('status') && (
                <button
                  onClick={() => addFilter('status')}
                  className="flex items-center gap-2 text-blue-400 transition duration-300 hover:text-blue-300"
                >
                  <Plus size={20} /> Add Status Filter
                </button>
              )}
            </div>
          )}

          <div className="mt-4 space-y-4">
            {activeFilters.has('sort') && (
              <div className="flex items-center gap-4 rounded bg-gray-700 p-3">
                <div className="flex-grow">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="mr-2 rounded bg-gray-600 p-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="created_at">Created Date</option>
                    <option value="updated_at">Updated Date</option>
                    <option value="title">Title</option>
                    <option value="rating">Rating</option>
                    <option value="views">Views</option>
                  </select>
                  <select
                    value={order}
                    onChange={(e) => setOrder(e.target.value)}
                    className="rounded bg-gray-600 p-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="desc">Descending</option>
                    <option value="asc">Ascending</option>
                  </select>
                </div>
                <button
                  onClick={() => removeFilter('sort')}
                  className="text-gray-400 transition duration-300 hover:text-red-500"
                >
                  <XCircle size={20} />
                </button>
              </div>
            )}

            {activeFilters.has('genres') && (
              <div className="flex items-center gap-4 rounded bg-gray-700 p-3">
                <div className="flex-grow">
                  <select
                    multiple
                    value={selectedGenres}
                    onChange={(e) =>
                      setSelectedGenres(
                        Array.from(
                          e.target.selectedOptions,
                          (option) => option.value,
                        ),
                      )
                    }
                    className="w-full rounded bg-gray-600 p-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {availableGenres.map((genre) => (
                      <option key={genre.id} value={genre.id}>
                        {genre.name}
                      </option>
                    ))}
                  </select>
                </div>
                <button
                  onClick={() => removeFilter('genres')}
                  className="text-gray-400 transition duration-300 hover:text-red-500"
                >
                  <XCircle size={20} />
                </button>
              </div>
            )}

            {activeFilters.has('tags') && (
              <div className="flex items-center gap-4 rounded bg-gray-700 p-3">
                <div className="flex-grow">
                  <select
                    multiple
                    value={selectedTags}
                    onChange={(e) =>
                      setSelectedTags(
                        Array.from(
                          e.target.selectedOptions,
                          (option) => option.value,
                        ),
                      )
                    }
                    className="w-full rounded bg-gray-600 p-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {availableTags.map((tag) => (
                      <option key={tag.id} value={tag.id}>
                        {tag.name}
                      </option>
                    ))}
                  </select>
                </div>
                <button
                  onClick={() => removeFilter('tags')}
                  className="text-gray-400 transition duration-300 hover:text-red-500"
                >
                  <XCircle size={20} />
                </button>
              </div>
            )}

            {activeFilters.has('status') && (
              <div className="flex items-center gap-4 rounded bg-gray-700 p-3">
                <div className="flex-grow">
                  <select
                    value={status || ''}
                    onChange={(e) =>
                      setStatus((e.target.value as ContentStatus) || null)
                    }
                    className="w-full rounded bg-gray-600 p-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Any Status</option>
                    <option value={ContentStatus.ONGOING}>Ongoing</option>
                    <option value={ContentStatus.COMPLETED}>Completed</option>
                    <option value={ContentStatus.HIATUS}>Hiatus</option>
                    <option value={ContentStatus.DROPPED}>Dropped</option>
                  </select>
                </div>
                <button
                  onClick={() => removeFilter('status')}
                  className="text-gray-400 transition duration-300 hover:text-red-500"
                >
                  <XCircle size={20} />
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {novels.map((novel) => (
            <Link href={`/novels/${novel.id}`} key={novel.id}>
              <div className="cursor-pointer rounded-lg bg-gray-800 p-6 shadow-lg transition duration-300 hover:shadow-xl">
                <h2 className="mb-2 text-2xl font-bold text-blue-400">
                  {novel.title}
                </h2>
                <p className="mb-4 text-gray-400">{novel.description}</p>
                <p className="mb-2 text-gray-300">
                  By:{' '}
                  <span className="font-semibold">{novel.author.username}</span>
                </p>
                <div className="mb-2">
                  {novel.genres.map(({ genre }) => (
                    <span
                      key={genre.id}
                      className="mb-2 mr-2 inline-block rounded bg-blue-600 px-2 py-1 text-sm text-white"
                    >
                      {genre.name}
                    </span>
                  ))}
                </div>
                <div>
                  {novel.tags.map(({ tag }) => (
                    <span
                      key={tag.id}
                      className="mb-2 mr-2 inline-block rounded bg-green-600 px-2 py-1 text-sm text-white"
                    >
                      {tag.name}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>

        {pagination && (
          <div className="mt-8 flex items-center justify-center">
            <button
              onClick={() => setPage(page - 1)}
              disabled={page === 1}
              className="mr-4 rounded bg-blue-600 px-4 py-2 text-white transition duration-300 hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <ChevronLeft size={20} />
            </button>
            <span className="text-lg font-semibold">
              Page {pagination.currentPage} of {pagination.pages}
            </span>
            <button
              onClick={() => setPage(page + 1)}
              disabled={page === pagination.pages}
              className="ml-4 rounded bg-blue-600 px-4 py-2 text-white transition duration-300 hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
