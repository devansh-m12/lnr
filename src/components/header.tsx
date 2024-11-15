"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { cn } from "@/lib/utils";
import { Menu, X, User, Settings, LogOut, BookOpen, Heart, History } from "lucide-react";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

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
      name: "½ Browse", 
      href: "/browse",
      items: [
        { name: "Latest Updates", href: "/latest", icon: BookOpen },
        { name: "Popular Series", href: "/popular", icon: Heart },
        { name: "Reading History", href: "/history", icon: History },
      ]
    },
    { 
      name: "½ Community", 
      href: "/community",
      items: [
        { name: "Forums", href: "/forums" },
        { name: "Discord", href: "/discord" },
        { name: "Blog", href: "/blog" },
      ]
    },
    { name: "½ About", href: "/me" },
  ];
  
  return (
    <header className="fixed top-0 z-50 w-full p-4">
      <div className="mx-auto max-w-7xl">
        <div className="flex items-start justify-between">
          {/* Logo */}
          <Link 
            href="/" 
            className="group bg-black/20 backdrop-blur-sm px-2 py-1 rounded-md 
              hover:bg-white/30 transition-all duration-300"
          >
            <div className="flex items-center space-x-1">
              <Image
                src="/logo.png"
                alt="Logo"
                width={20}
                height={20}
                className="rounded-sm transform transition-all duration-300 
                  group-hover:scale-110"
              />
              <span className="text-sm font-medium italic font-serif">D3V1</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-start space-x-4">
            {navigation.map((item) => (
              item.items ? (
                <DropdownMenu key={item.href}>
                  <DropdownMenuTrigger className="bg-black/20 backdrop-blur-sm px-4 py-2 rounded-lg 
                    text-sm transition-all duration-300 hover:bg-black/30 text-white/70 hover:text-white">
                    <span>{item.name}</span>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56 bg-black/20 backdrop-blur-xl 
                    border border-white/10 mt-2">
                    <DropdownMenuLabel className="text-white/70">{item.name}</DropdownMenuLabel>
                    <DropdownMenuSeparator className="bg-white/10" />
                    {item.items.map((dropdownItem) => (
                      <DropdownMenuItem 
                        key={dropdownItem.href} 
                        className="hover:bg-black/30 focus:bg-black/30"
                      >
                        <Link 
                          href={dropdownItem.href} 
                          className="flex items-center space-x-2 w-full text-white/70 
                            hover:text-white transition-colors"
                        >
                          {dropdownItem.icon && <dropdownItem.icon className="h-4 w-4" />}
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
                  className="bg-black/20 backdrop-blur-sm px-4 py-2 rounded-lg text-sm 
                    transition-all duration-300 hover:bg-black/30 text-white/70 hover:text-white"
                >
                  {item.name}
                </Link>
              )
            ))}

            {/* Auth Section with Dropdown */}
            {session ? (
              <DropdownMenu>
                <DropdownMenuTrigger className="bg-black/20 backdrop-blur-sm px-4 py-2 
                  rounded-lg transition-all duration-300 hover:bg-black/30 text-white/70 
                  hover:text-white flex items-center space-x-2">
                  <Image
                    src={session.user?.image || "https://github.com/shadcn.png"}
                    alt="Profile"
                    width={20}
                    height={20}
                    className="rounded-full"
                  />
                  <span className="text-sm">{session.user?.name}</span>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 bg-black/20 backdrop-blur-xl 
                  border border-white/10 mt-2">
                  <DropdownMenuLabel className="text-white/70">My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-white/10" />
                  <DropdownMenuItem className="hover:bg-black/30 focus:bg-black/30">
                    <Link href="/me" className="flex items-center space-x-2 w-full text-white/70 
                      hover:text-white">
                      <User className="h-4 w-4" />
                      <span>Profile</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="hover:bg-black/30 focus:bg-black/30">
                    <Link href="/settings" className="flex items-center space-x-2 w-full text-white/70 
                      hover:text-white">
                      <Settings className="h-4 w-4" />
                      <span>Settings</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-white/10" />
                  <DropdownMenuItem 
                    className="hover:bg-black/30 focus:bg-black/30"
                    onClick={() => signOut()}
                  >
                    <div className="flex items-center space-x-2 w-full text-white/70 hover:text-white">
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
                  className="bg-black/20 backdrop-blur-sm px-4 py-2 rounded-lg text-sm 
                    text-white/70 hover:text-white hover:bg-black/30 transition-all duration-300"
                >
                  Sign In
                </Link>
                <Link
                  href="/auth/register"
                  className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg text-sm 
                    text-white hover:bg-white/20 transition-all duration-300"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </nav>

          {/* Mobile menu button */}
          <button
            className="md:hidden bg-black/20 backdrop-blur-sm p-2 rounded-lg 
              text-white/70 hover:text-white hover:bg-black/30 transition-all duration-300"
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
        <div className="md:hidden mt-4 bg-black/20 backdrop-blur-sm rounded-lg 
          border border-white/10">
          <div className="p-4 space-y-2">
            {navigation.map((item) => (
              <div key={item.href} className="space-y-2">
                <button
                  onClick={() => setOpenDropdown(openDropdown === item.href ? null : item.href)}
                  className={cn(
                    "w-full text-left px-3 py-2 text-sm rounded-lg transition-all duration-300",
                    "text-white/70 hover:text-white hover:bg-black/30",
                    openDropdown === item.href && "bg-black/30 text-white"
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
                        className="flex items-center space-x-2 px-3 py-2 text-sm text-white/70 
                          hover:text-white hover:bg-black/30 rounded-lg transition-all duration-300"
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
              <div className="border-t border-white/10 pt-2 mt-2">
                <div className="px-3 py-2 text-sm text-white/70 flex items-center space-x-2">
                  <Image
                    src={session.user?.image || "https://github.com/shadcn.png"}
                    alt="Profile"
                    width={20}
                    height={20}
                    className="rounded-full"
                  />
                  <span>{session.user?.name}</span>
                </div>
                <button
                  onClick={() => signOut()}
                  className="w-full text-left px-3 py-2 text-sm text-white/70 
                    hover:text-white hover:bg-black/30 rounded-lg transition-all duration-300"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <div className="border-t border-white/10 pt-2 mt-2 space-y-2">
                <Link
                  href="/auth/login"
                  className="block px-3 py-2 text-sm text-white/70 hover:text-white 
                    hover:bg-black/30 rounded-lg transition-all duration-300"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Sign In
                </Link>
                <Link
                  href="/auth/register"
                  className="block px-3 py-2 text-sm text-white hover:bg-white/10 
                    rounded-lg transition-all duration-300"
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
