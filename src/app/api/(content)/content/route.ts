import { NextResponse } from 'next/server';
import prisma from '@/db';
import { ContentStatus, ContentType } from '@prisma/client';

export async function POST(request: Request) {
  try {
    const {
      sortBy = 'created_at',
      order = 'desc',
      genres = [],
      tags = [],
      status,
      type,
      search,
      page = 1,
      limit = 10,
    } = await request.json();

    // Validate sort field
    const validSortFields = [
      'created_at',
      'updated_at',
      'title',
      'rating',
      'views',
    ];
    if (!validSortFields.includes(sortBy)) {
      return NextResponse.json(
        { error: 'Invalid sort field' },
        { status: 400 },
      );
    }

    // Build where clause
    const where = {
      ...(type && { type }),
      ...(status && { status }),
      ...(search && {
        OR: [
          { title: { contains: search, mode: 'insensitive' } },
          { description: { contains: search, mode: 'insensitive' } },
        ],
      }),
      ...(genres.length > 0 && {
        genres: {
          some: {
            genre_id: {
              in: genres,
            },
          },
        },
      }),
      ...(tags.length > 0 && {
        tags: {
          some: {
            tag_id: {
              in: tags,
            },
          },
        },
      }),
    };

    // Get total count for pagination
    const total = await prisma.content.count({ where });

    // Get paginated and sorted content with relations
    const content = await prisma.content.findMany({
      where,
      include: {
        genres: {
          include: {
            genre: true,
          },
        },
        tags: {
          include: {
            tag: true,
          },
        },
        author: {
          select: {
            id: true,
            username: true,
            avatar_url: true,
          },
        },
      },
      orderBy: {
        [sortBy]: order,
      },
      skip: (page - 1) * limit,
      take: limit,
    });

    return NextResponse.json({
      content,
      pagination: {
        total,
        pages: Math.ceil(total / limit),
        currentPage: page,
        limit,
      },
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Failed to fetch content' },
      { status: 500 },
    );
  }
}
