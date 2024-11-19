'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Plus, Search, SlidersHorizontal } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  cover_image: string;
  created_at: string;
  author: {
    name: string;
    avatar_url: string;
  };
  categories: Array<{ 
    category: { 
      id: string;
      name: string;
      slug: string;
    } 
  }>;
  _count: {
    comments: number;
    likes: number;
  };
  featured?: boolean;
}

interface FilterState {
  search: string;
  category: 'all' | string;
  sort: 'latest' | 'oldest' | 'popular';
  featured: 'all' | 'true';
  timeframe: 'all' | 'today' | 'week' | 'month' | 'year';
}

export default function BlogPage() {
  const router = useRouter();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState<Array<{ id: string; name: string; slug: string }>>([]);
  const [filters, setFilters] = useState<FilterState>({
    search: '',
    category: 'all',
    sort: 'latest',
    featured: 'all',
    timeframe: 'all',
  });
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('/api/b/categories');
        const data = await response.json();
        setCategories(data.categories);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const queryParams = new URLSearchParams();
        if (filters.search) queryParams.append('search', filters.search);
        if (filters.category !== 'all') queryParams.append('category', filters.category);
        if (filters.sort) queryParams.append('sort', filters.sort);
        if (filters.featured === 'true') queryParams.append('featured', 'true');
        if (filters.timeframe !== 'all') queryParams.append('timeframe', filters.timeframe);
        queryParams.append('limit', '6');

        const response = await fetch(`/api/b?${queryParams.toString()}`);
        const data = await response.json();
        setPosts(data.posts);
      } catch (error) {
        console.error('Error fetching posts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [filters]);

  const handlePostClick = (postId: string) => {
    router.push(`/blog/${postId}`);
  };

  return (
    <div className="min-h-screen bg-black font-light text-white">
      <div className="container mx-auto max-w-7xl px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-12"
        >
          {/* Header Section */}
          <div className="relative mb-16 text-center">
            <div className="absolute right-0 top-0">
              <Button
                onClick={() => router.push('/blog/create')}
                className="bg-white text-black hover:bg-white/90"
              >
                <Plus className="mr-2 h-4 w-4" />
                Create Post
              </Button>
            </div>
            <h1 className="mb-6 text-5xl font-extralight">Blog</h1>
            <p className="text-xl font-extralight text-white/60">
              Thoughts, stories and ideas.
            </p>
          </div>

          {/* Filter Section */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div className="relative flex w-full max-w-md items-center">
                <Search className="absolute left-3 h-4 w-4 text-white/40" />
                <Input
                  placeholder="Search posts..."
                  className="pl-10"
                  value={filters.search}
                  onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                />
              </div>
              <Button
                variant="ghost"
                onClick={() => setShowFilters(!showFilters)}
                className="text-white/60 hover:text-white"
              >
                <SlidersHorizontal className="mr-2 h-4 w-4" />
                Filters
              </Button>
            </div>

            {showFilters && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="grid grid-cols-1 gap-4 rounded-lg border border-white/10 bg-white/5 p-4 md:grid-cols-2 lg:grid-cols-4"
              >
                <Select
                  value={filters.sort}
                  onValueChange={(value) => setFilters({ ...filters, sort: value as 'latest' | 'oldest' | 'popular' })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="latest">Latest</SelectItem>
                    <SelectItem value="oldest">Oldest</SelectItem>
                    <SelectItem value="popular">Most Popular</SelectItem>
                  </SelectContent>
                </Select>

                <Select
                  value={filters.category}
                  onValueChange={(value) => setFilters({ ...filters, category: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    {categories.map((category) => (
                      <SelectItem key={category.id} value={category.slug}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select
                  value={filters.timeframe}
                  onValueChange={(value) => setFilters({ ...filters, timeframe: value as FilterState['timeframe'] })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Time Period" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Time</SelectItem>
                    <SelectItem value="today">Today</SelectItem>
                    <SelectItem value="week">This Week</SelectItem>
                    <SelectItem value="month">This Month</SelectItem>
                    <SelectItem value="year">This Year</SelectItem>
                  </SelectContent>
                </Select>

                <Select
                  value={filters.featured}
                  onValueChange={(value: 'all' | 'true') => setFilters({ ...filters, featured: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Featured Posts" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Posts</SelectItem>
                    <SelectItem value="true">Featured Only</SelectItem>
                  </SelectContent>
                </Select>

                <div className="col-span-full flex justify-end">
                  <Button
                    variant="secondary"
                    onClick={() => setFilters({
                      search: '',
                      category: 'all',
                      sort: 'latest',
                      featured: 'all',
                      timeframe: 'all',
                    })}
                    className="bg-white/10 text-white hover:bg-white/20"
                  >
                    Clear Filters
                  </Button>
                </div>
              </motion.div>
            )}
          </div>

          {/* Loading State */}
          {loading && (
            <div className="flex h-64 items-center justify-center">
              <div className="h-8 w-8 animate-spin rounded-full border-2 border-white border-t-transparent" />
            </div>
          )}

          {/* No Results State */}
          {!loading && posts.length === 0 && (
            <div className="flex h-64 flex-col items-center justify-center text-white/60">
              <p className="text-xl">No posts found</p>
              <p className="mt-2">Try adjusting your filters</p>
            </div>
          )}

          {/* Blog Posts Grid */}
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                onClick={() => handlePostClick(post.id)}
                className="cursor-pointer"
              >
                <Card className="transform border-white/10 bg-white/5 transition-all duration-200 hover:-translate-y-1 hover:border-white/20 hover:bg-white/10">
                  {post.cover_image && (
                    <div className="aspect-video w-full overflow-hidden rounded-t-lg">
                      <img
                        src={post.cover_image}
                        alt={post.title}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  )}
                  <CardHeader>
                    <div className="mb-4 flex items-center gap-4">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={post.author.avatar_url} />
                        <AvatarFallback>{post.author.name[0]}</AvatarFallback>
                      </Avatar>
                      <div className="text-sm text-white/60">
                        {post.author.name}
                      </div>
                    </div>
                    <CardTitle className="text-xl font-light">
                      {post.title}
                    </CardTitle>
                    <CardDescription className="text-white/60">
                      {post.excerpt}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {post.categories.map((cat, idx) => (
                        <Badge
                          key={idx}
                          variant="secondary"
                          className="bg-white/10 text-white hover:bg-white/20"
                        >
                          {cat.category.name}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter className="text-sm text-white/40">
                    <div className="flex w-full justify-between">
                      <span>
                        {new Date(post.created_at).toLocaleDateString()}
                      </span>
                      <div className="flex gap-4">
                        <span>💬 {post._count.comments}</span>
                        <span>❤️ {post._count.likes}</span>
                      </div>
                    </div>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
