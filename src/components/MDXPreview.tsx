'use client';

import { FC } from 'react';
import { serialize } from 'next-mdx-remote/serialize';
import { MDXRemote } from 'next-mdx-remote';
import remarkGfm from 'remark-gfm';
import { useState, useEffect } from 'react';

interface MDXPreviewProps {
  content: string;
}

const MDXPreview: FC<MDXPreviewProps> = ({ content }) => {
  const [mdxSource, setMdxSource] = useState<any>(null);

  useEffect(() => {
    const compileMDX = async () => {
      try {
        const mdxSource = await serialize(content, {
          mdxOptions: {
            remarkPlugins: [remarkGfm],
            development: process.env.NODE_ENV === 'development',
          },
        });
        setMdxSource(mdxSource);
      } catch (error) {
        console.error('Error compiling MDX:', error);
      }
    };

    compileMDX();
  }, [content]);

  if (!mdxSource) {
    return <div className="text-sm text-white/60">Loading preview...</div>;
  }

  return (
    <div className="prose prose-invert max-w-none">
      <MDXRemote {...mdxSource} />
    </div>
  );
};

export default MDXPreview; 