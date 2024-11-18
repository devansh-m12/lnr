'use client';

import React, { useState, Suspense, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from '@/components/ui/input-otp';

function VerifyEmailContent() {
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get('email');
  const [firstTime, setFirstTime] = useState(true);

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/auth/verify-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, otp }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Verification failed');
      }

      // Redirect to login page on success
      router.push('/auth/login');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const handleResendCode = async () => {
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/auth/send-verification', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to resend code');
      }
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Failed to resend verification code',
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (email && firstTime) {
      setFirstTime(false);
      handleResendCode();
    }
  }, [email]);

  if (!email) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-black">
        <div className="rounded-xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm">
          <p className="text-gray-300">Invalid verification link</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen w-full items-center justify-center bg-black">
      <div className="relative h-full w-full max-w-md bg-black px-8 py-12 md:h-auto md:rounded-2xl md:shadow-[0_0_40px_rgba(255,255,255,0.1)]">
        <div className="absolute left-0 top-0 h-16 w-16 rounded-tl-2xl border-l-2 border-t-2 border-white/10" />
        <div className="absolute bottom-0 right-0 h-16 w-16 rounded-br-2xl border-b-2 border-r-2 border-white/10" />

        <div className="relative space-y-8">
          <div className="space-y-2">
            <h2 className="text-center text-3xl font-bold tracking-tight text-white">
              Verify your email
            </h2>
            <p className="text-center text-sm text-gray-400">
              We sent a verification code to{' '}
              <span className="font-medium text-gray-300">{email}</span>
            </p>
          </div>

          <form className="space-y-6" onSubmit={handleVerify}>
            <div className="flex justify-center">
              <InputOTP
                maxLength={6}
                value={otp}
                onChange={setOtp}
                disabled={loading}
                className="gap-2"
              >
                <InputOTPGroup>
                  <InputOTPSlot
                    index={0}
                    className="border-white/10 bg-white/5 text-white"
                  />
                  <InputOTPSlot
                    index={1}
                    className="border-white/10 bg-white/5 text-white"
                  />
                  <InputOTPSlot
                    index={2}
                    className="border-white/10 bg-white/5 text-white"
                  />
                </InputOTPGroup>
                <InputOTPSeparator />
                <InputOTPGroup>
                  <InputOTPSlot
                    index={3}
                    className="border-white/10 bg-white/5 text-white"
                  />
                  <InputOTPSlot
                    index={4}
                    className="border-white/10 bg-white/5 text-white"
                  />
                  <InputOTPSlot
                    index={5}
                    className="border-white/10 bg-white/5 text-white"
                  />
                </InputOTPGroup>
              </InputOTP>
            </div>

            {error && (
              <div className="rounded-lg border border-red-500/10 bg-red-500/5 p-3 text-center text-sm text-red-400 backdrop-blur-sm">
                {error}
              </div>
            )}

            <div>
              <button
                type="submit"
                disabled={loading}
                className={`group relative flex w-full justify-center rounded-full border border-white/10 px-6 py-3 text-sm font-medium transition-all duration-300 ${
                  loading
                    ? 'bg-white/10 text-transparent'
                    : 'bg-white/5 text-white hover:bg-white/10'
                } focus:outline-none focus:ring-2 focus:ring-white/20 disabled:opacity-50`}
              >
                {loading && (
                  <div className="absolute left-1/2 flex -translate-x-1/2 space-x-1">
                    <div className="h-2 w-2 animate-[bounce_1s_infinite_0ms] rounded-full bg-white"></div>
                    <div className="h-2 w-2 animate-[bounce_1s_infinite_200ms] rounded-full bg-white"></div>
                    <div className="h-2 w-2 animate-[bounce_1s_infinite_400ms] rounded-full bg-white"></div>
                  </div>
                )}
                <span className={loading ? 'invisible' : 'visible'}>
                  {loading ? 'Verifying...' : 'Verify Email'}
                </span>
              </button>
            </div>

            <div className="text-center">
              <button
                type="button"
                onClick={handleResendCode}
                disabled={loading}
                className="text-sm font-medium text-blue-400 transition-colors duration-200 hover:text-blue-500"
              >
                Resend verification code
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default function VerifyEmail() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <VerifyEmailContent />
    </Suspense>
  );
}
