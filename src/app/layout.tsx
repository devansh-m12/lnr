import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import React from 'react';
import { Providers } from '@/app/provider';
import { Toaster } from '@/components/ui/toaster';
import { DotGothic16 } from "next/font/google";

const dotGothic = DotGothic16({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-dot-gothic",
});

export const metadata: Metadata = {
  title: 'LNR - Light Novel Reader',
  description: 'Your one-stop destination for manga, manhwa and novels',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${dotGothic.variable} font-dot-gothic antialiased`}>
        <Providers>
          <div className="flex">
            <main className="flex-1">{children}</main>
          </div>
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
