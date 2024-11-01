import db from '@/db';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    const user = await db.user.findUnique({
      where: { email },
      select: {
        email: true,
        emailVerified: true,
      },
    });

    if (!user) {
      return NextResponse.json(
        { error: 'Email not registered' },
        { status: 404 },
      );
    }

    if (!user.emailVerified) {
      return NextResponse.json(
        { error: 'Email not verified' },
        { status: 403 },
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    );
  }
}
