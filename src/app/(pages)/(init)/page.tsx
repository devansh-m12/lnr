'use client';
import { useState, useEffect } from 'react';
import { LatestRelease } from './latestRelease';
import { Novel } from '@/types/novel';

export default function Page() {
  return (
    <main className="container mx-auto">
      <div className="h-[33vh] bg-black">
        <LatestRelease />
      </div>
    </main>
  );
}
