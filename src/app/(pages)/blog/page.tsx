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
import { Plus } from 'lucide-react';

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
  categories: Array<{ category: { name: string } }>;
  _count: {
    comments: number;
    likes: number;
  };
}

export default function BlogPage() {
  const router = useRouter();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('/api/b?limit=6');
        const data = await response.json();
        setPosts(data.posts);
      } catch (error) {
        console.error('Error fetching posts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

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
