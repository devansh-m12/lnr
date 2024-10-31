import { NextResponse } from 'next/server';
import prisma from '@/db';

export async function GET() {
  try {
    const novels = await prisma.content.findMany();
    return NextResponse.json(novels);
  } catch (error) {
    console.error(error);   
    return NextResponse.json(
      { error: 'Failed to fetch novels' },
      { status: 500 }
    );
  }
}
