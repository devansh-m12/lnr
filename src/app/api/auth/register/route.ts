import { NextResponse } from 'next/server';
import { hash } from 'bcrypt';
import db from '@/db';

export async function POST(req: Request) {
  try {
    const { email, password, name } = await req.json();

    // Check if user already exists
    const existingUser = await db.user.findUnique({
      where: {
        email,
      },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: 'User already exists' },
        { status: 400 },
      );
    }

    // Hash password
    const hashedPassword = await hash(password, 12);

    // Create new user
    const user = await db.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        username:
          email.split('@')[0] + Math.random().toString(36).substring(2, 8),
        avatar_url: `https://api.dicebear.com/7.x/fun-emoji/svg?seed=${email.split('@')[0]}`,
      },
    });

    // Remove password from response
    const { password: _, ...userWithoutPassword } = user;

    return NextResponse.json({ user: userWithoutPassword }, { status: 201 });
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json({ error: 'Error creating user' }, { status: 500 });
  }
}
