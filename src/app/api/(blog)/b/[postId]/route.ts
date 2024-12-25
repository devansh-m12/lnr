import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/db';
import { auth } from '@/auth';

// GET - Fetch a single blog post
export async function GET(
  request: NextRequest,
  { params }: { params: any }
) {
  try {
    const { postId } = await params;
    const post = await prisma.blogPost.findUnique({
      where: { id: postId },
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
          include: {
            category: true,
          },
        },
        tags: {
          include: {
            tag: true,
          },
        },
        seo: true,
        _count: {
          select: {
            comments: true,
            likes: true,
          },
        },
      },
    });

    if (!post) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    return NextResponse.json(post);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 },
    );
  }
}

// PUT - Update a blog post
export async function PUT(
  request: NextRequest,
  { params }: { params: any }
) {
  try {
    const { postId } = await params;
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
      categories,
      tags,
      seo,
    } = data;

    // Check if post exists and user is the author
    const existingPost = await prisma.blogPost.findUnique({
      where: { id: postId },
      select: { author_id: true },
    });

    if (!existingPost) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    if (existingPost.author_id !== session.user.id) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    // Generate new slug if title is updated
    const slug = title
      ? title
          .toLowerCase()
          .replace(/[^a-zA-Z0-9\s]/g, '')
          .replace(/\s+/g, '-')
      : undefined;

    const updatedPost = await prisma.blogPost.update({
      where: { id: postId },
      data: {
        ...(title && { title }),
        ...(slug && { slug }),
        ...(content && { content }),
        ...(excerpt && { excerpt }),
        ...(cover_image && { cover_image }),
        ...(published !== undefined && { published }),
        ...(featured !== undefined && { featured }),
        ...(categories && {
          categories: {
            deleteMany: {},
            create: categories.map((categoryId: string) => ({
              category: {
                connect: { id: categoryId },
              },
            })),
          },
        }),
        ...(tags && {
          tags: {
            deleteMany: {},
            create: tags.map((tagId: string) => ({
              tag: {
                connect: { id: tagId },
              },
            })),
          },
        }),
        ...(seo && {
          seo: {
            upsert: {
              create: seo,
              update: seo,
            },
          },
        }),
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
          include: {
            category: true,
          },
        },
        tags: {
          include: {
            tag: true,
          },
        },
        seo: true,
      },
    });

    return NextResponse.json(updatedPost);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 },
    );
  }
}

// DELETE - Delete a blog post
export async function DELETE(
  request: NextRequest,
  { params }: { params: any }
) {
  try {
    const { postId } = await params;
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Check if post exists and user is the author
    const existingPost = await prisma.blogPost.findUnique({
      where: { id: postId },
      select: { author_id: true },
    });

    if (!existingPost) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    if (existingPost.author_id !== session.user.id) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    await prisma.blogPost.delete({
      where: { id: postId },
    });

    return NextResponse.json(
      { message: 'Post deleted successfully' },
      { status: 200 },
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 },
    );
  }
}
