'use client';

import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';

export default function HomePage() {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (!session) {
    redirect('/auth/login');
  }

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Welcome, {session.user?.name}!</h1>
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-gray-600">
            You are successfully logged in. This is your home page.
          </p>
        </div>
      </div>
    </div>
  );
}
