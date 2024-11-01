import { NextResponse } from 'next/server';
import prisma from '@/db';
import { sendEmail } from '@/utils/email';
import { getVerificationEmailTemplate } from '@/utils/emailTemplates';

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    //check if user exists
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Generate OTP
    const otp = Math.floor(Math.random() * 0xffffff)
      .toString(16)
      .padStart(6, '0');

    // Create or update verification token
    await prisma.verificationToken.upsert({
      where: {
        identifier_token: {
          identifier: email,
          token: otp,
        },
      },
      update: {
        token: otp,
        expires: new Date(Date.now() + 15 * 60 * 1000), // 15 minutes
      },
      create: {
        identifier: email,
        token: otp,
        expires: new Date(Date.now() + 15 * 60 * 1000), // 15 minutes
      },
    });

    // Send verification email
    await sendEmail(
      email,
      'Verify Your Email',
      getVerificationEmailTemplate(otp),
    );

    return NextResponse.json({
      message: 'Verification code sent successfully',
    });
  } catch (error) {
    console.error('Error sending verification code:', error);
    return NextResponse.json(
      { error: 'Failed to send verification code' },
      { status: 500 },
    );
  }
}
