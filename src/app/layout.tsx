import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import React from 'react';
import { Providers } from '@/app/provider';
import { Toaster } from '@/components/ui/toaster';
import { DotGothic16 } from "next/font/google";
import Header from "@/components/header";

const dotGothic = DotGothic16({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-dot-gothic",
});

export const metadata: Metadata = {
  title: 'D3V1 - Developer',
  description: 'D3V1 is a developer who loves to code and build things',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${dotGothic.variable} font-dot-gothic antialiased`}>
        <Providers>
          <Header />
          <div className="flex">
            <main className="flex-1">{children}</main>
          </div>
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
