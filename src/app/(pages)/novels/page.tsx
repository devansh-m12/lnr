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
    setActiveFilters(prev => new Set([...prev, filterType]));
  };

  const removeFilter = (filterType: string) => {
    setActiveFilters(prev => {
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
        <div className="bg-gray-800 rounded-lg p-6 mb-6 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <input
              type="text"
              placeholder="Search novels..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="p-2 border rounded bg-gray-700 text-white border-gray-600 flex-grow mr-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-300"
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
                  className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition duration-300"
                >
                  <Plus size={20} /> Add Sort Filter
                </button>
              )}

              {!activeFilters.has('genres') && (
                <button
                  onClick={() => addFilter('genres')}
                  className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition duration-300"
                >
                  <Plus size={20} /> Add Genres Filter
                </button>
              )}

              {!activeFilters.has('tags') && (
                <button
                  onClick={() => addFilter('tags')}
                  className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition duration-300"
                >
                  <Plus size={20} /> Add Tags Filter
                </button>
              )}

              {!activeFilters.has('status') && (
                <button
                  onClick={() => addFilter('status')}
                  className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition duration-300"
                >
                  <Plus size={20} /> Add Status Filter
                </button>
              )}
            </div>
          )}

          <div className="space-y-4 mt-4">
            {activeFilters.has('sort') && (
              <div className="flex items-center gap-4 bg-gray-700 p-3 rounded">
                <div className="flex-grow">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="bg-gray-600 text-white p-2 rounded mr-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                    className="bg-gray-600 text-white p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="desc">Descending</option>
                    <option value="asc">Ascending</option>
                  </select>
                </div>
                <button
                  onClick={() => removeFilter('sort')}
                  className="text-gray-400 hover:text-red-500 transition duration-300"
                >
                  <XCircle size={20} />
                </button>
              </div>
            )}

            {activeFilters.has('genres') && (
              <div className="flex items-center gap-4 bg-gray-700 p-3 rounded">
                <div className="flex-grow">
                  <select
                    multiple
                    value={selectedGenres}
                    onChange={(e) => setSelectedGenres(Array.from(e.target.selectedOptions, option => option.value))}
                    className="bg-gray-600 text-white p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {availableGenres.map(genre => (
                      <option key={genre.id} value={genre.id}>{genre.name}</option>
                    ))}
                  </select>
                </div>
                <button
                  onClick={() => removeFilter('genres')}
                  className="text-gray-400 hover:text-red-500 transition duration-300"
                >
                  <XCircle size={20} />
                </button>
              </div>
            )}

            {activeFilters.has('tags') && (
              <div className="flex items-center gap-4 bg-gray-700 p-3 rounded">
                <div className="flex-grow">
                  <select
                    multiple
                    value={selectedTags}
                    onChange={(e) => setSelectedTags(Array.from(e.target.selectedOptions, option => option.value))}
                    className="bg-gray-600 text-white p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {availableTags.map(tag => (
                      <option key={tag.id} value={tag.id}>{tag.name}</option>
                    ))}
                  </select>
                </div>
                <button
                  onClick={() => removeFilter('tags')}
                  className="text-gray-400 hover:text-red-500 transition duration-300"
                >
                  <XCircle size={20} />
                </button>
              </div>
            )}

            {activeFilters.has('status') && (
              <div className="flex items-center gap-4 bg-gray-700 p-3 rounded">
                <div className="flex-grow">
                  <select
                    value={status || ''}
                    onChange={(e) => setStatus(e.target.value as ContentStatus || null)}
                    className="bg-gray-600 text-white p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                  className="text-gray-400 hover:text-red-500 transition duration-300"
                >
                  <XCircle size={20} />
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {novels.map((novel) => (
            <Link href={`/novels/${novel.id}`} key={novel.id}>
              <div className="bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300 cursor-pointer">
                <h2 className="text-2xl font-bold mb-2 text-blue-400">{novel.title}</h2>
                <p className="text-gray-400 mb-4">{novel.description}</p>
                <p className="text-gray-300 mb-2">
                  By: <span className="font-semibold">{novel.author.username}</span>
                </p>
                <div className="mb-2">
                  {novel.genres.map(({ genre }) => (
                    <span key={genre.id} className="inline-block mr-2 mb-2 bg-blue-600 text-white px-2 py-1 rounded text-sm">
                      {genre.name}
                    </span>
                  ))}
                </div>
                <div>
                  {novel.tags.map(({ tag }) => (
                    <span key={tag.id} className="inline-block mr-2 mb-2 bg-green-600 text-white px-2 py-1 rounded text-sm">
                      {tag.name}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>

        {pagination && (
          <div className="mt-8 flex justify-center items-center">
            <button
              onClick={() => setPage(page - 1)}
              disabled={page === 1}
              className="px-4 py-2 bg-blue-600 text-white rounded mr-4 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-700 transition duration-300"
            >
              <ChevronLeft size={20} />
            </button>
            <span className="text-lg font-semibold">
              Page {pagination.currentPage} of {pagination.pages}
            </span>
            <button
              onClick={() => setPage(page + 1)}
              disabled={page === pagination.pages}
              className="px-4 py-2 bg-blue-600 text-white rounded ml-4 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-700 transition duration-300"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}