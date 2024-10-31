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
        <div className="flex justify-between h-14 items-center">
          {/* Left side - Logo/Name */}
          <div className="flex items-center space-x-6">
            <Link href="/" className="flex items-center backdrop-blur-md bg-white/10 px-4 py-2 h-10">
              <svg className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <span className="ml-2 text-xl font-bold text-foreground">AppName</span>
            </Link>
            <nav>
              <ul className="flex space-x-4">
                {navItems.map((item) => (
                  <li key={item.name}>
                    <Link 
                      href={item.href}
                      className="flex items-center backdrop-blur-md bg-white/10 px-3 py-2 h-10"
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
                  className="flex items-center space-x-2 text-foreground hover:text-foreground/80 focus:outline-none backdrop-blur-md bg-white/10 px-4 py-2 rounded-lg"
                >
                  <span>{session.user?.name || session.user?.email}</span>
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 rounded-lg backdrop-blur-md bg-white/10 ring-1 ring-white/20">
                    <div className="py-1">
                      <button
                        onClick={() => signOut()}
                        className="block w-full text-left px-4 py-2 text-sm text-foreground hover:bg-white/20"
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
                  className="text-foreground hover:text-foreground/80 px-4 py-2 rounded-lg backdrop-blur-md bg-white/10"
                >
                  Sign in
                </Link>
                <Link
                  href="/auth/register"
                  className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 backdrop-blur-md"
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
