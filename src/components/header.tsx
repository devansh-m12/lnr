"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "./ui/button";
import { useSession, signOut } from "next-auth/react";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { ChevronDown, User, Settings, LogOut, BookOpen, Heart, History, LucideIcon } from "lucide-react";

// Define types for our navigation items
type DropdownItem = {
  name: string;
  href: string;
  icon?: LucideIcon;
};

type NavigationItem = {
  name: string;
  href: string;
  dropdownItems?: DropdownItem[];
};

const Header = () => {
  const pathname = usePathname();
  const { data: session } = useSession();

  const navigation: NavigationItem[] = [
    { 
      name: "Browse", 
      href: "#",
      dropdownItems: [
        { name: "Latest Updates", href: "/latest", icon: BookOpen },
        { name: "Popular Series", href: "/popular", icon: Heart },
        { name: "Categories", href: "/categories", icon: BookOpen },
        { name: "Reading History", href: "/history", icon: History },
      ]
    },
    { 
      name: "Community", 
      href: "#",
      dropdownItems: [
        { name: "Forums", href: "/forums" },
        { name: "Discord", href: "/discord" },
        { name: "Blog", href: "/blog" },
      ]
    },
    { name: "About", href: "/me" },
  ];
  
  return (
    <header className="sticky top-0 z-50 w-full">
      {/* Animated background gradients */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -inset-[10px] opacity-20">
          <div className="absolute top-0 left-1/4 w-32 h-32 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob" />
          <div className="absolute top-0 right-1/4 w-32 h-32 bg-yellow-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000" />
          <div className="absolute top-0 left-1/2 w-32 h-32 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000" />
        </div>
      </div>

      {/* Main header content */}
      <div className="relative border-b border-white/10 bg-black/50 backdrop-blur-xl">
        <div className="container flex h-20 max-w-screen-2xl items-center">
          <div className="flex flex-1 items-center justify-between">
            {/* Logo with hover effect */}
            <Link href="/" className="group flex items-center space-x-3">
              <div className="relative">
                <div className="absolute -inset-2 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 
                  opacity-0 group-hover:opacity-100 blur-lg transition-all duration-500" />
                <Image
                  src="/logo.png"
                  alt="Logo"
                  width={40}
                  height={40}
                  className="relative rounded-sm transform transition-all duration-300 
                    group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(168,85,247,0.3)]"
                />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-yellow-400 
                bg-clip-text text-white">D3V1</span>
            </Link>

            {/* Navigation with dropdowns */}
            <nav className="flex items-center space-x-8 text-base font-medium">
              {navigation.map((item) => (
                item.dropdownItems ? (
                  <DropdownMenu key={item.name}>
                    <DropdownMenuTrigger className="flex items-center space-x-1 px-4 py-2 hover:text-white transition-colors">
                      <span>{item.name}</span>
                      <ChevronDown className="h-4 w-4" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56 bg-black/90 backdrop-blur-xl border border-white/10">
                      <DropdownMenuLabel>{item.name}</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      {item.dropdownItems.map((dropdownItem) => (
                        <DropdownMenuItem key={dropdownItem.name} className="hover:bg-white/10">
                          <Link href={dropdownItem.href} className="flex items-center space-x-2 w-full">
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
                    className={cn(
                      "relative px-4 py-2 transition-all duration-300 hover:text-white group",
                      pathname === item.href ? "text-white" : "text-gray-400"
                    )}
                  >
                    <span className="relative z-10">{item.name}</span>
                    {pathname === item.href && (
                      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 
                        blur-sm transition-all duration-300" />
                    )}
                  </Link>
                )
              ))}
            </nav>

            {/* Auth section with dropdown */}
            <div className="flex items-center space-x-4">
              {session ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="lg" 
                      className="relative group overflow-hidden rounded-full border border-white/20 
                        hover:border-white/40 transition-all duration-300">
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 
                        opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="flex items-center space-x-2">
                        <Image
                          src={session.user?.image || "https://randomuser.me/api/portraits/men/1.jpg"}
                          alt="Profile"
                          width={24}
                          height={24}
                          className="rounded-full"
                        />
                        <span className="relative">{session.user?.name}</span>
                        <ChevronDown className="h-4 w-4" />
                      </div>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56 bg-black/90 backdrop-blur-xl border border-white/10">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="hover:bg-white/10">
                      <Link href="/me" className="flex items-center space-x-2 w-full">
                        <User className="h-4 w-4" />
                        <span>Profile</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="hover:bg-white/10">
                      <Link href="/settings" className="flex items-center space-x-2 w-full">
                        <Settings className="h-4 w-4" />
                        <span>Settings</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="hover:bg-white/10" onClick={() => signOut()}>
                      <div className="flex items-center space-x-2 w-full">
                        <LogOut className="h-4 w-4" />
                        <span>Sign Out</span>
                      </div>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <>
                  <Link href="/auth/login">
                    <Button variant="ghost" size="lg"
                      className="relative group overflow-hidden rounded-full border border-white/20 
                        hover:border-white/40 transition-all duration-300">
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 
                        opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <span className="relative">Sign In</span>
                    </Button>
                  </Link>
                  <Link href="/auth/register">
                    <Button
                      className="relative group overflow-hidden rounded-full bg-gradient-to-r 
                        from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 
                        transition-all duration-300"
                      size="lg"
                    >
                      <div className="absolute inset-0 bg-white/10 opacity-0 
                        group-hover:opacity-100 transition-opacity duration-300" />
                      <span className="relative">Sign Up</span>
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
