import React from 'react';
import { Boxes } from '@/components/ui/background-boxes';
import { cn } from '@/lib/utils';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      {/* Left side - Site intro */}
      <section className="relative hidden w-1/2 overflow-hidden bg-slate-900 lg:block">
        <div className="relative flex h-96 w-full flex-col items-center justify-center overflow-hidden rounded-lg bg-slate-900">
          <div className="pointer-events-none absolute inset-0 z-20 h-full w-full bg-slate-900 [mask-image:radial-gradient(transparent,white)]" />

          <Boxes />
          <h1 className={cn('relative z-20 text-xl text-white md:text-4xl')}>
            LNR - Light Novel Reader
          </h1>
          <p className="relative z-20 mt-2 text-center text-neutral-300">
            Your one-stop destination for manga, manhwa and novels
          </p>
        </div>
      </section>

      {/* Right side - Auth forms */}
      <section className="w-full lg:w-1/2">{children}</section>
    </div>
  );
}
