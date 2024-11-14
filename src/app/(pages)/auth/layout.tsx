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
    { text: "Crafting" },
    { text: "digital" },
    { text: "experiences" },
    { text: "and" },
    { text: "building" },
    { text: "crazy" },
    { text: "projects" },
  ];

  // Matrix text for DEVANSH
  const dotMatrix = [
    "█▀▄ █▀▀ █ █ ▄▀█ █▄ █ █▀ █ █",
    "█▄▀ ██▄ ▀▄▀ █▀█ █ ▀█ ▄█ █▀█"
  ];

  return (
    <div className="flex min-h-screen bg-black">
      {/* Left side - Site intro */}
      <section className="relative hidden w-1/2 overflow-hidden lg:block">
        {/* Subtle background gradients */}
        <div className="absolute inset-0 bg-black">
          <div className="absolute -left-4 top-0 h-[500px] w-[500px] animate-subtle-drift rounded-full bg-white/[0.08] blur-[120px] transition-all duration-1000" />
          <div className="absolute bottom-0 right-0 h-[500px] w-[500px] animate-subtle-drift-delayed rounded-full bg-white/[0.08] blur-[120px] transition-all duration-1000" />
        </div>

        {/* Monochromatic grid background */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,black_70%,transparent_110%)]">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/[0.02] to-transparent"></div>
        </div>

        <div className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden p-8">
          {/* Subtle glowing corners */}
          <div className="absolute left-0 top-0 h-16 w-16 rounded-tl-2xl border-l-2 border-t-2 border-white/10 shadow-[inset_0_0_15px_rgba(255,255,255,0.1)]" />
          <div className="absolute bottom-0 right-0 h-16 w-16 rounded-br-2xl border-b-2 border-r-2 border-white/10 shadow-[inset_0_0_15px_rgba(255,255,255,0.1)]" />
          
          {/* Content */}
          <div className="relative z-20 space-y-8 text-center">
            {/* Logo with subtle glow */}
            <div className="relative mx-auto h-28 w-28 group">
              <div className="absolute inset-0 rounded-full bg-white/10 blur-xl transition-all duration-500 group-hover:blur-2xl" />
              <Image
                src="/logo.png"
                alt="Devash Logo"
                width={112}
                height={112}
                className="relative rounded-2xl transition-all duration-700 group-hover:scale-105 group-hover:shadow-[0_0_30px_rgba(255,255,255,0.2)]"
              />
            </div>

            <div className="space-y-4">
              {/* Dot Matrix DEVANSH */}
              <div className="space-y-0.5 font-mono">
                {dotMatrix.map((line, index) => (
                  <div 
                    key={index}
                    className="text-[0.6rem] text-white/60 tracking-[0.2em] whitespace-pre animate-fade-in"
                    style={{ 
                      animationDelay: `${index * 200}ms`,
                      textShadow: '0 0 10px rgba(255,255,255,0.3)'
                    }}
                  >
                    {line}
                  </div>
                ))}
              </div>

              {/* DEVASH title */}
              {/* <h1 className={cn('text-6xl font-bold tracking-tight mt-4')}>
                <span className="bg-gradient-to-r from-white via-white/80 to-white bg-clip-text text-transparent transition-all duration-500">
                  DEVASH
                </span>
              </h1> */}
              
              <h2 className="text-xl font-light">
                <span className="text-white/60">Developer</span> • 
                <span className="text-white/80"> Creator</span> • 
                <span className="text-white/60"> Builder</span>
              </h2>
              
              <div className="h-12">
                <TypewriterEffect words={words} className="text-white/60" />
              </div>
            </div>

            {/* Tech stack indicators */}
            <div className="flex justify-center space-x-4 text-xs text-white/40">
              <div className="group flex items-center space-x-1">
                <div className="h-1.5 w-1.5 rounded-full bg-white/20 transition-all duration-300 group-hover:bg-white/40" />
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

          {/* Status indicators */}
          <div className="absolute bottom-8 flex space-x-4 text-sm text-white/30">
            <div className="flex items-center space-x-1">
              <div className="h-1 w-1 rounded-full bg-white/20" />
              <span>Projects: 10+</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="h-1 w-1 rounded-full bg-white/20 animate-pulse" />
              <span>Status: Building</span>
            </div>
          </div>
        </div>
      </section>

      {/* Right side - Auth forms */}
      <section className="flex w-full items-center justify-center bg-black lg:w-1/2">
        <div className="w-full max-w-md px-8">
          {children}
        </div>
      </section>
    </div>
  );
}
