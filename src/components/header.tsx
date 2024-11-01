'use client';

import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';
import { useState } from 'react';

export default function Header() {
  const { data: session } = useSession();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const [navItems] = useState([
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ]);

  return (
    <header className="bg-transparent">
      <div className="px-7 py-7">
        <div className="flex h-14 items-center justify-between">
          {/* Left side - Logo/Name */}
          <div className="flex items-center space-x-6">
            <Link
              href="/"
              className="flex h-10 items-center bg-white/10 px-4 py-2 backdrop-blur-md"
            >
              <svg
                className="h-6 w-6 text-indigo-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
              <span className="ml-2 text-xl font-bold text-foreground">
                AppName
              </span>
            </Link>
            <nav>
              <ul className="flex space-x-4">
                {navItems.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="flex h-10 items-center bg-white/10 px-3 py-2 backdrop-blur-md"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Right side - Auth buttons/dropdown */}
          <div className="relative">
            {session ? (
              <div>
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center space-x-2 rounded-lg bg-white/10 px-4 py-2 text-foreground backdrop-blur-md hover:text-foreground/80 focus:outline-none"
                >
                  <span>{session.user?.name || session.user?.email}</span>
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 rounded-lg bg-white/10 ring-1 ring-white/20 backdrop-blur-md">
                    <div className="py-1">
                      <button
                        onClick={() => signOut()}
                        className="block w-full px-4 py-2 text-left text-sm text-foreground hover:bg-white/20"
                      >
                        Sign out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex space-x-4">
                <Link
                  href="/auth/login"
                  className="rounded-lg bg-white/10 px-4 py-2 text-foreground backdrop-blur-md hover:text-foreground/80"
                >
                  Sign in
                </Link>
                <Link
                  href="/auth/register"
                  className="rounded-lg bg-indigo-600 px-4 py-2 text-white backdrop-blur-md hover:bg-indigo-700"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
