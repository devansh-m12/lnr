'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';
import { cn } from '@/lib/utils';
import {
  Menu,
  X,
  User,
  Settings,
  LogOut,
  BookOpen,
  Heart,
  History,
} from 'lucide-react';
import { useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';

type NavigationItem = {
  name: string;
  href: string;
  items?: { name: string; href: string; icon?: any }[];
};

const Header = () => {
  const pathname = usePathname();
  const { data: session } = useSession();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const navigation: NavigationItem[] = [
    {
      name: '½ Browse',
      href: '/browse',
      items: [
        { name: 'Latest Updates', href: '/latest', icon: BookOpen },
        { name: 'Popular Series', href: '/popular', icon: Heart },
        { name: 'Reading History', href: '/history', icon: History },
      ],
    },
    {
      name: '½ Community',
      href: '/community',
      items: [
        { name: 'Forums', href: '/forums' },
        { name: 'Discord', href: '/discord' },
        { name: 'Blog', href: '/blog' },
      ],
    },
    { name: '½ About', href: '/me' },
  ];

  return (
    <header className="fixed top-0 z-50 w-full p-4">
      <div className="mx-auto max-w-7xl">
        <div className="flex items-start justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="group rounded-md bg-black/20 px-2 py-1 backdrop-blur-sm transition-all duration-300 hover:bg-white/30"
          >
            <div className="flex items-center space-x-1">
              <Image
                src="/logo.png"
                alt="Logo"
                width={20}
                height={20}
                className="transform rounded-sm transition-all duration-300 group-hover:scale-110"
              />
              <span className="font-serif text-sm font-medium italic">
                D3V1
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden items-start space-x-4 md:flex">
            {navigation.map((item) =>
              item.items ? (
                <DropdownMenu key={item.href}>
                  <DropdownMenuTrigger className="rounded-lg bg-black/20 px-4 py-2 text-sm text-white/70 backdrop-blur-sm transition-all duration-300 hover:bg-black/30 hover:text-white">
                    <span>{item.name}</span>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="mt-2 w-56 border border-white/10 bg-black/20 backdrop-blur-xl">
                    <DropdownMenuLabel className="text-white/70">
                      {item.name}
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator className="bg-white/10" />
                    {item.items.map((dropdownItem) => (
                      <DropdownMenuItem
                        key={dropdownItem.href}
                        className="hover:bg-black/30 focus:bg-black/30"
                      >
                        <Link
                          href={dropdownItem.href}
                          className="flex w-full items-center space-x-2 text-white/70 transition-colors hover:text-white"
                        >
                          {dropdownItem.icon && (
                            <dropdownItem.icon className="h-4 w-4" />
                          )}
                          <span>{dropdownItem.name}</span>
                        </Link>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-lg bg-black/20 px-4 py-2 text-sm text-white/70 backdrop-blur-sm transition-all duration-300 hover:bg-black/30 hover:text-white"
                >
                  {item.name}
                </Link>
              ),
            )}

            {/* Auth Section with Dropdown */}
            {session ? (
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center space-x-2 rounded-lg bg-black/20 px-4 py-2 text-white/70 backdrop-blur-sm transition-all duration-300 hover:bg-black/30 hover:text-white">
                  <Image
                    src={session.user?.image || 'https://github.com/shadcn.png'}
                    alt="Profile"
                    width={20}
                    height={20}
                    className="rounded-full"
                  />
                  <span className="text-sm">{session.user?.name}</span>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="mt-2 w-56 border border-white/10 bg-black/20 backdrop-blur-xl">
                  <DropdownMenuLabel className="text-white/70">
                    My Account
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-white/10" />
                  <DropdownMenuItem className="hover:bg-black/30 focus:bg-black/30">
                    <Link
                      href="/me"
                      className="flex w-full items-center space-x-2 text-white/70 hover:text-white"
                    >
                      <User className="h-4 w-4" />
                      <span>Profile</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="hover:bg-black/30 focus:bg-black/30">
                    <Link
                      href="/settings"
                      className="flex w-full items-center space-x-2 text-white/70 hover:text-white"
                    >
                      <Settings className="h-4 w-4" />
                      <span>Settings</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-white/10" />
                  <DropdownMenuItem
                    className="hover:bg-black/30 focus:bg-black/30"
                    onClick={() => signOut()}
                  >
                    <div className="flex w-full items-center space-x-2 text-white/70 hover:text-white">
                      <LogOut className="h-4 w-4" />
                      <span>Sign Out</span>
                    </div>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-start space-x-2">
                <Link
                  href="/auth/login"
                  className="rounded-lg bg-black/20 px-4 py-2 text-sm text-white/70 backdrop-blur-sm transition-all duration-300 hover:bg-black/30 hover:text-white"
                >
                  Sign In
                </Link>
                <Link
                  href="/auth/register"
                  className="rounded-lg bg-white/10 px-4 py-2 text-sm text-white backdrop-blur-sm transition-all duration-300 hover:bg-white/20"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </nav>

          {/* Mobile menu button */}
          <button
            className="rounded-lg bg-black/20 p-2 text-white/70 backdrop-blur-sm transition-all duration-300 hover:bg-black/30 hover:text-white md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="mt-4 rounded-lg border border-white/10 bg-black/20 backdrop-blur-sm md:hidden">
          <div className="space-y-2 p-4">
            {navigation.map((item) => (
              <div key={item.href} className="space-y-2">
                <button
                  onClick={() =>
                    setOpenDropdown(
                      openDropdown === item.href ? null : item.href,
                    )
                  }
                  className={cn(
                    'w-full rounded-lg px-3 py-2 text-left text-sm transition-all duration-300',
                    'text-white/70 hover:bg-black/30 hover:text-white',
                    openDropdown === item.href && 'bg-black/30 text-white',
                  )}
                >
                  {item.name}
                </button>

                {/* Mobile Dropdown */}
                {item.items && openDropdown === item.href && (
                  <div className="ml-4 space-y-1">
                    {item.items.map((subItem) => (
                      <Link
                        key={subItem.href}
                        href={subItem.href}
                        className="flex items-center space-x-2 rounded-lg px-3 py-2 text-sm text-white/70 transition-all duration-300 hover:bg-black/30 hover:text-white"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {subItem.icon && <subItem.icon className="h-4 w-4" />}
                        <span>{subItem.name}</span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {/* Mobile Auth */}
            {session ? (
              <div className="mt-2 border-t border-white/10 pt-2">
                <div className="flex items-center space-x-2 px-3 py-2 text-sm text-white/70">
                  <Image
                    src={session.user?.image || 'https://github.com/shadcn.png'}
                    alt="Profile"
                    width={20}
                    height={20}
                    className="rounded-full"
                  />
                  <span>{session.user?.name}</span>
                </div>
                <button
                  onClick={() => signOut()}
                  className="w-full rounded-lg px-3 py-2 text-left text-sm text-white/70 transition-all duration-300 hover:bg-black/30 hover:text-white"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <div className="mt-2 space-y-2 border-t border-white/10 pt-2">
                <Link
                  href="/auth/login"
                  className="block rounded-lg px-3 py-2 text-sm text-white/70 transition-all duration-300 hover:bg-black/30 hover:text-white"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Sign In
                </Link>
                <Link
                  href="/auth/register"
                  className="block rounded-lg px-3 py-2 text-sm text-white transition-all duration-300 hover:bg-white/10"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
