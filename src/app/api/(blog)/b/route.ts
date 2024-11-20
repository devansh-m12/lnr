import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/db';
import { auth } from '@/auth';
import { Prisma } from '@prisma/client';
import { z } from 'zod';

// Query params validation schema
const QuerySchema = z.object({
  page: z.coerce.number().min(1).default(1),
  limit: z.coerce.number().min(1).max(100).default(10),
  search: z.string().optional(),
  category: z.string().optional(),
  tag: z.string().optional(),
  featured: z.enum(['true', 'false']).optional(),
  sort: z.enum(['latest', 'oldest', 'popular']).optional().default('latest'),
});

// GET - Fetch blog posts with filtering, pagination and search
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    // Add logging to debug query parameters
    console.log('Search Params:', Object.fromEntries(searchParams));

    // Validate query parameters
    const query = QuerySchema.safeParse(Object.fromEntries(searchParams));
    if (!query.success) {
      return NextResponse.json(
        { error: 'Invalid query parameters', details: query.error.flatten() },
        { status: 400 },
      );
    }

    const { page, limit, search, category, tag, featured, sort } = query.data;
    const skip = (page - 1) * limit;

    // Build where clause
    const where: Prisma.BlogPostWhereInput = {
      published: true,
      ...(search && {
        OR: [
          { title: { contains: search, mode: 'insensitive' } },
          { content: { contains: search, mode: 'insensitive' } },
          { excerpt: { contains: search, mode: 'insensitive' } },
        ],
      }),
      ...(featured === 'true' && { featured: true }),
      ...(category && {
        categories: {
          some: {
            category: {
              slug: category,
            },
          },
        },
      }),
      ...(tag && {
        tags: {
          some: {
            tag: {
              slug: tag,
            },
          },
        },
      }),
    };

    // Log the where clause to debug filtering
    console.log('Where clause:', where);

    // First, let's check total count without any filtering
    const totalPosts = await prisma.blogPost.count();
    console.log('Total posts in database:', totalPosts);

    const [posts, total] = await Promise.all([
      prisma.blogPost.findMany({
        where,
        select: {
          id: true,
          title: true,
          slug: true,
          excerpt: true,
          cover_image: true,
          created_at: true,
          updated_at: true,
          featured: true,
          published: true, // Add this to check publication status
          author: {
            select: {
              id: true,
              name: true,
              username: true,
              avatar_url: true,
            },
          },
          categories: {
            select: {
              category: {
                select: {
                  id: true,
                  name: true,
                  slug: true,
                },
              },
            },
          },
          tags: {
            select: {
              tag: {
                select: {
                  id: true,
                  name: true,
                  slug: true,
                },
              },
            },
          },
          _count: {
            select: {
              comments: true,
              likes: true,
            },
          },
        },
        orderBy: {
          created_at: 'desc',
        },
        skip,
        take: limit,
      }),
      prisma.blogPost.count({ where }),
    ]);

    // Log the results for debugging
    console.log('Found posts count:', posts.length);
    console.log('Total matching posts:', total);

    // Transform the response to flatten the structure
    const transformedPosts = posts.map((post) => ({
      ...post,
      categories: post.categories.map((c) => c.category),
      tags: post.tags.map((t) => t.tag),
    }));

    return NextResponse.json({
      posts: transformedPosts,
      pagination: {
        total,
        pages: Math.ceil(total / limit),
        page,
        limit,
      },
      debug: {
        totalPosts,
        appliedFilters: where,
        queryParams: query.data,
      },
    });
  } catch (error) {
    console.error('Blog GET Error:', error);
    return NextResponse.json(
      {
        error: 'Failed to fetch blog posts',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 },
    );
  }
}

// POST - Create a new blog post
export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const data = await request.json();
    const {
      title,
      content,
      excerpt,
      cover_image,
      published,
      featured,
      categories = [],
    } = data;

    // Generate slug from title
    const slug = title
      .toLowerCase()
      .replace(/[^a-zA-Z0-9\s]/g, '')
      .replace(/\s+/g, '-');

    const post = await prisma.blogPost.create({
      data: {
        title,
        slug,
        content,
        excerpt,
        cover_image,
        published: published || false,
        featured: featured || false,
        author_id: session.user.id,
        // Create categories and link them to the post
        categories: {
          create: categories.map((categoryName: string) => ({
            category: {
              connectOrCreate: {
                where: {
                  name: categoryName,
                },
                create: {
                  name: categoryName,
                  slug: categoryName
                    .toLowerCase()
                    .replace(/[^a-zA-Z0-9\s]/g, '')
                    .replace(/\s+/g, '-'),
                },
              },
            },
          })),
        },
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            username: true,
            avatar_url: true,
          },
        },
        categories: {
          select: {
            category: {
              select: {
                id: true,
                name: true,
                slug: true,
              },
            },
          },
        },
        _count: {
          select: {
            comments: true,
            likes: true,
          },
        },
      },
    });

    return NextResponse.json(post, { status: 201 });
  } catch (error) {
    console.error('Error creating post:', error);
    if (error instanceof Error) {
      return NextResponse.json(
        { error: 'Failed to create post', details: error.message },
        { status: 500 },
      );
    }
    return NextResponse.json(
      { error: 'Failed to create post' },
      { status: 500 },
    );
  }
}
