import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/db';

export async function GET(request: NextRequest) {
  try {
    const categories = await prisma.blogCategory.findMany({
      orderBy: {
        name: 'asc',
      },
      select: {
        id: true,
        name: true,
        slug: true,
      },
    });

    return NextResponse.json({ categories });
  } catch (error) {
    console.error('Error fetching categories:', error);
    return NextResponse.json(
      { error: 'Failed to fetch categories' },
      { status: 500 },
    );
  }
} 