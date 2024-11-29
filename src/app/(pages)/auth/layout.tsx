import React from 'react';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { TypewriterEffect } from '../../../components/ui/TypewriterEffect';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const words = [
    { text: 'Crafting' },
    { text: 'digital' },
    { text: 'experiences' },
    { text: 'and' },
    { text: 'building' },
    { text: 'crazy' },
    { text: 'projects' },
  ];

  const dotMatrix = [
    '█▀▄ █▀▀ █ █ ▄▀█ █▄ █ █▀ █ █',
    '█▄▀ ██▄ ▀▄▀ █▀█ █ ▀█ ▄█ █▀█',
  ];

  return (
    <div className="flex min-h-screen bg-gradient-to-b from-slate-950 via-black to-black">
      {/* Left side - Site intro */}
      <section className="relative hidden w-1/2 overflow-hidden lg:block">
        {/* Updated background effects */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.95)_100%)]" />
          <div className="absolute inset-0 bg-gradient-to-t from-blue-600/10 via-transparent to-transparent blur-3xl" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-violet-600/5 to-transparent blur-2xl" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black" />
        </div>

        {/* Updated grid background */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,black_70%,transparent_110%)]">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/[0.02] to-transparent"></div>
        </div>

        <div className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden p-8">
          {/* Updated corner styling */}
          <div className="absolute left-0 top-0 h-16 w-16 rounded-tl-2xl border-l-2 border-t-2 border-white/5" />
          <div className="absolute bottom-0 right-0 h-16 w-16 rounded-br-2xl border-b-2 border-r-2 border-white/5" />

          {/* Content */}
          <div className="relative z-20 space-y-8 text-center">
            {/* Updated logo styling */}
            <div className="group relative mx-auto h-28 w-28">
              <div className="absolute inset-0 rounded-full bg-gradient-to-b from-blue-600/20 to-violet-600/20 blur-xl transition-all duration-500 group-hover:blur-2xl" />
              <Image
                src="/logo.png"
                alt="Devash Logo"
                width={112}
                height={112}
                className="relative rounded-2xl transition-all duration-700 group-hover:scale-105"
              />
            </div>

            <div className="space-y-4">
              {/* Dot Matrix with updated colors */}
              <div className="space-y-0.5 font-mono">
                {dotMatrix.map((line, index) => (
                  <div
                    key={index}
                    className="animate-fade-in whitespace-pre text-[0.6rem] tracking-[0.2em] text-white/40"
                    style={{
                      animationDelay: `${index * 200}ms`,
                    }}
                  >
                    {line}
                  </div>
                ))}
              </div>

              <h2 className="text-xl font-extralight">
                <span className="text-white/60">Developer</span> •
                <span className="text-white/80"> Creator</span> •
                <span className="text-white/60"> Builder</span>
              </h2>

              <div className="h-12">
                <TypewriterEffect words={words} className="text-white/40" />
              </div>
            </div>

            {/* Updated tech stack indicators */}
            <div className="flex justify-center space-x-4 text-xs text-white/30">
              <div className="group flex items-center space-x-1">
                <div className="h-1.5 w-1.5 rounded-full bg-white/10 transition-all duration-300 group-hover:bg-white/30" />
                <span>Next.js</span>
              </div>
              <div className="group flex items-center space-x-1">
                <div className="h-1.5 w-1.5 rounded-full bg-white/20 transition-all duration-300 group-hover:bg-white/40" />
                <span>TypeScript</span>
              </div>
              <div className="group flex items-center space-x-1">
                <div className="h-1.5 w-1.5 rounded-full bg-white/20 transition-all duration-300 group-hover:bg-white/40" />
                <span>Tailwind</span>
              </div>
            </div>
          </div>

          {/* Updated status indicators */}
          <div className="absolute bottom-8 flex space-x-4 text-sm text-white/20">
            <div className="flex items-center space-x-1">
              <div className="h-1 w-1 rounded-full bg-white/10" />
              <span>Projects: 10+</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="h-1 w-1 animate-pulse rounded-full bg-white/10" />
              <span>Status: Building</span>
            </div>
          </div>
        </div>
      </section>

      {/* Right side - Auth forms */}
      <section className="flex w-full items-center justify-center bg-transparent lg:w-1/2">
        <div className="w-full max-w-md px-8">{children}</div>
      </section>
    </div>
  );
}
