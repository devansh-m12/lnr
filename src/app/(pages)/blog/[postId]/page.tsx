'use client';

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Trash2 } from "lucide-react";
import { useSession } from "next-auth/react";
import { auth } from "@/auth";

interface BlogPost {
  id: string;
  title: string;
  content: string;
  cover_image: string;
  created_at: string;
  author: {
    id: string;
    name: string;
    avatar_url: string;
  };
  categories: Array<{ category: { name: string } }>;
  _count: {
    comments: number;
    likes: number;
  };
}

export default function BlogPostPage() {
  const params = useParams();
  const router = useRouter();
  const { data: session } = useSession();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(`/api/b/${params.postId}`);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        setPost(data);
      } catch (error) {
        console.error('Error fetching post:', error);
        setError('Failed to load blog post. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    if (params.postId) {
      fetchPost();
    }
  }, [params.postId]);

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this post?')) {
      return;
    }

    try {
      const response = await fetch(`/api/b/${params.postId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to delete post');
      }

      router.push('/blog');
    } catch (error) {
      console.error('Error deleting post:', error);
      setError('Failed to delete blog post. Please try again later.');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-xl font-light animate-pulse">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center gap-4">
        <div className="text-xl font-light text-red-400">{error}</div>
        <Button
          variant="ghost"
          className="text-white/60 hover:text-white"
          onClick={() => router.push('/blog')}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Return to Blog
        </Button>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center gap-4">
        <div className="text-xl font-light">Post not found</div>
        <Button
          variant="ghost"
          className="text-white/60 hover:text-white"
          onClick={() => router.push('/blog')}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Return to Blog
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white font-light">
      <div className="container max-w-4xl mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          {/* Navigation Buttons */}
          <div className="flex justify-between items-center">
            <Button
              variant="ghost"
              className="text-white/60 hover:text-white"
              onClick={() => router.back()}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Blog
            </Button>

            {/* Show delete button only if user is the post owner */}
            {session?.user?.id === post?.author?.id && (
              <Button
                variant="ghost"
                className="text-red-500 hover:text-red-400 hover:bg-red-500/10"
                onClick={handleDelete}
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Delete Post
              </Button>
            )}
          </div>

          {/* Cover Image */}
          {post.cover_image && (
            <div className="w-full aspect-video rounded-lg overflow-hidden">
              <img
                src={post.cover_image}
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Post Header */}
          <div className="space-y-6">
            <h1 className="text-5xl font-extralight">{post.title}</h1>
            
            <div className="flex items-center gap-4">
              <Avatar className="h-10 w-10">
                <AvatarImage src={post.author.avatar_url} />
                <AvatarFallback>{post.author.name[0]}</AvatarFallback>
              </Avatar>
              <div>
                <div className="text-white/80">{post.author.name}</div>
                <div className="text-sm text-white/60">
                  {new Date(post.created_at).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </div>
              </div>
            </div>

            <div className="flex gap-2 flex-wrap">
              {post.categories.map((cat, idx) => (
                <Badge
                  key={idx}
                  variant="secondary"
                  className="bg-white/10 hover:bg-white/20 text-white"
                >
                  {cat.category.name}
                </Badge>
              ))}
            </div>
          </div>

          {/* Post Content */}
          <div className="prose prose-invert max-w-none">
            <div dangerouslySetInnerHTML={{ __html: post.content }} />
          </div>

          {/* Engagement Stats */}
          <div className="flex gap-4 text-white/60 border-t border-white/10 pt-6 mt-8">
            <span>💬 {post._count.comments} Comments</span>
            <span>❤️ {post._count.likes} Likes</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
} 