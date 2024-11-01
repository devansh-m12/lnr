'use client';

import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';

export default function HomePage() {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-t-2 border-gray-900"></div>
      </div>
    );
  }

  if (!session) {
    redirect('/auth/login');
  }

  return (
    <div className="min-h-screen p-8">
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-6 text-3xl font-bold">
          Welcome, {session.user?.name}!
        </h1>
        <div className="rounded-lg bg-white p-6 shadow">
          <p className="text-gray-600">
            You are successfully logged in. This is your home page.
          </p>
        </div>
      </div>
    </div>
  );
}
