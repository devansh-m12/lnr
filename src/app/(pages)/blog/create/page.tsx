'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { ArrowLeft, Loader2, Plus, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import MDXPreview from '@/components/MDXPreview';

interface FormData {
  title: string;
  excerpt: string;
  content: string;
  cover_image: string;
  published: boolean;
  featured: boolean;
  categories: string[];
}

export default function CreateBlogPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [newCategory, setNewCategory] = useState('');
  const [formData, setFormData] = useState<FormData>({
    title: '',
    excerpt: '',
    content: '',
    cover_image: '',
    published: false,
    featured: false,
    categories: [],
  });

  const handleAddCategory = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && newCategory.trim()) {
      e.preventDefault();
      if (!formData.categories.includes(newCategory.trim())) {
        setFormData({
          ...formData,
          categories: [...formData.categories, newCategory.trim()],
        });
      }
      setNewCategory('');
    }
  };

  const removeCategory = (categoryToRemove: string) => {
    setFormData({
      ...formData,
      categories: formData.categories.filter(
        (category) => category !== categoryToRemove,
      ),
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/b', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create post');
      }

      toast({
        title: 'Success!',
        description: 'Your blog post has been created.',
      });
      router.push(`/blog/${data.id}`);
    } catch (error) {
      console.error('Error creating post:', error);
      toast({
        title: 'Error',
        description:
          error instanceof Error
            ? error.message
            : 'Failed to create blog post. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black font-light text-white">
      <div className="container mx-auto max-w-4xl px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              className="text-white/60 hover:text-white"
              onClick={() => router.back()}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
            <h1 className="text-3xl font-extralight">Create New Post</h1>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
              <div className="space-y-4 lg:col-span-2">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Title</Label>
                    <Input
                      id="title"
                      placeholder="Enter post title"
                      value={formData.title}
                      onChange={(e) =>
                        setFormData({ ...formData, title: e.target.value })
                      }
                      className="border-white/10 bg-white/5 text-white"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="excerpt">Excerpt</Label>
                    <Textarea
                      id="excerpt"
                      placeholder="Brief description of your post"
                      value={formData.excerpt}
                      onChange={(e) =>
                        setFormData({ ...formData, excerpt: e.target.value })
                      }
                      className="h-20 border-white/10 bg-white/5 text-white"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="content">Content</Label>
                    <Tabs defaultValue="write" className="w-full">
                      <TabsList className="grid w-full grid-cols-2 bg-white/5">
                        <TabsTrigger value="write">Write</TabsTrigger>
                        <TabsTrigger value="preview">Preview</TabsTrigger>
                      </TabsList>
                      <TabsContent value="write">
                        <Textarea
                          id="content"
                          placeholder="Write your blog post content here... (Supports MDX format)"
                          value={formData.content}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              content: e.target.value,
                            })
                          }
                          className="min-h-[400px] border-white/10 bg-white/5 text-white"
                          required
                        />
                      </TabsContent>
                      <TabsContent
                        value="preview"
                        className="min-h-[400px] rounded-md border border-white/10 bg-white/5 p-4"
                      >
                        <MDXPreview content={formData.content} />
                      </TabsContent>
                    </Tabs>
                  </div>
                </div>
              </div>

              <div className="space-y-6 lg:col-span-1">
                <div className="rounded-lg border border-white/10 bg-white/5 p-6">
                  <h3 className="mb-4 text-lg font-light">Post Settings</h3>

                  <div className="space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <Label htmlFor="published">Publication Status</Label>
                          <p className="text-sm text-white/60">
                            Make this post visible to readers
                          </p>
                        </div>
                        <Switch
                          id="published"
                          checked={formData.published}
                          onCheckedChange={(checked) =>
                            setFormData({ ...formData, published: checked })
                          }
                          className="data-[state=checked]:bg-white data-[state=unchecked]:bg-white/20"
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <Label htmlFor="featured">Featured Post</Label>
                          <p className="text-sm text-white/60">
                            Display this post prominently
                          </p>
                        </div>
                        <Switch
                          id="featured"
                          checked={formData.featured}
                          onCheckedChange={(checked) =>
                            setFormData({ ...formData, featured: checked })
                          }
                          className="data-[state=checked]:bg-white data-[state=unchecked]:bg-white/20"
                        />
                      </div>
                    </div>

                    <div className="space-y-4 pt-4">
                      <div className="space-y-2">
                        <Label htmlFor="cover_image">Cover Image</Label>
                        <Input
                          id="cover_image"
                          placeholder="Enter image URL"
                          value={formData.cover_image}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              cover_image: e.target.value,
                            })
                          }
                          className="border-white/10 bg-white/5 text-white"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="categories">Categories</Label>
                        <div className="mb-2 flex flex-wrap gap-2">
                          {formData.categories.map((category, index) => (
                            <Badge
                              key={index}
                              className="bg-white/10 text-white hover:bg-white/20"
                            >
                              {category}
                              <button
                                type="button"
                                onClick={() => removeCategory(category)}
                                className="ml-2 hover:text-red-400"
                              >
                                <X className="h-3 w-3" />
                              </button>
                            </Badge>
                          ))}
                        </div>
                        <Input
                          id="categories"
                          value={newCategory}
                          onChange={(e) => setNewCategory(e.target.value)}
                          onKeyDown={handleAddCategory}
                          placeholder="Type a category and press Enter"
                          className="border-white/10 bg-white/5 text-white"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-white text-black hover:bg-white/90"
                >
                  {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  {loading ? 'Creating...' : 'Create Post'}
                </Button>
              </div>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
