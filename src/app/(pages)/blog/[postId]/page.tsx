'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import MDXPreview from '@/components/MDXPreview';

interface BlogPost {
  id: string;
  title: string;
  content: string;
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

export default function BlogPostPage({ params }: any) {
  const router = useRouter();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [postId, setPostId] = useState<string | null>(null);

  useEffect(() => {
    if (!postId) {
      return;
    }
    const fetchPost = async () => {
      try {
        const response = await fetch(`/api/b/${postId}`);
        const data = await response.json();
        setPost(data);
      } catch (error) {
        console.error('Error fetching post:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [postId]);
  useEffect(() => {
    const getPostId = async () => {
      const { postId } = await params;
      setPostId(postId);
    };
    getPostId();
  }, [params]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black">
        <div className="flex flex-col items-center gap-4">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-white/20 border-t-white"></div>
          <div className="text-white/60">Loading post...</div>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black">
        <div className="text-white">Post not found</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-zinc-900 font-light text-white">
      <div className="container mx-auto max-w-4xl px-4 py-8 md:py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          {/* Back Button */}
          <Button
            variant="ghost"
            className="group text-white/60 transition-colors hover:bg-white/5 hover:text-white"
            onClick={() => router.back()}
          >
            <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Back
          </Button>

          {/* Cover Image */}
          {post.cover_image && (
            <div className="aspect-video w-full overflow-hidden rounded-xl border border-white/10 shadow-2xl">
              <img
                src={post.cover_image}
                alt={post.title}
                className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>
          )}

          {/* Post Header */}
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <Avatar className="h-12 w-12 border-2 border-white/10">
                <AvatarImage src={post.author.avatar_url} />
                <AvatarFallback className="bg-white/5">
                  {post.author.name[0]}
                </AvatarFallback>
              </Avatar>
              <div className="space-y-1">
                <div className="text-xl font-medium">{post.author.name}</div>
                <div className="text-sm text-white/60">
                  {new Date(post.created_at).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </div>
              </div>
            </div>

            <h1 className="text-4xl font-light tracking-tight md:text-5xl">
              {post.title}
            </h1>

            <div className="flex flex-wrap gap-2">
              {post.categories.map((cat, idx) => (
                <Badge
                  key={idx}
                  variant="secondary"
                  className="bg-white/5 text-white hover:bg-white/10"
                >
                  {cat.category.name}
                </Badge>
              ))}
            </div>
          </div>

          {/* Post Content */}
          <div className="prose-lg prose-invert mt-12 max-w-none">
            <div className="rounded-xl bg-white/5 p-6 shadow-xl">
              <MDXPreview content={post.content} />
            </div>
          </div>

          {/* Post Footer */}
          <div className="mt-12 flex items-center justify-between border-t border-white/10 pt-6">
            <div className="flex gap-6 text-white/60">
              <span className="flex items-center gap-2 transition-colors hover:text-white">
                <span className="text-lg">💬</span> {post._count.comments}{' '}
                comments
              </span>
              <span className="flex items-center gap-2 transition-colors hover:text-white">
                <span className="text-lg">❤️</span> {post._count.likes} likes
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
