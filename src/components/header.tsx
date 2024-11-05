'use client';

import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';
import { useState } from 'react';
import { Sidebar, SidebarBody, SidebarLink } from '@/components/ui/sidebar';
import { IconHome, IconUser, IconBook, IconBookmarks, IconLogout, IconLogin, IconUserPlus, IconInfoCircle, IconPlus } from '@tabler/icons-react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { SessionWithAvatar } from '@/types/session';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

export default function Header() {
  const { data: session } = useSession();
  const sessionWithAvatar = session as SessionWithAvatar;
  const [open, setOpen] = useState(false);
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);
  
  const navItems = [
    { 
      label: 'Home',
      href: '/',
      icon: <IconHome className="h-5 w-5 text-neutral-700 dark:text-neutral-200 flex-shrink-0" />
    },
    {
      label: 'Library',
      href: '/library',
      icon: <IconBook className="h-5 w-5 text-neutral-700 dark:text-neutral-200 flex-shrink-0" />
    },
    {
      label: 'Bookmarks',
      href: '/bookmarks',
      icon: <IconBookmarks className="h-5 w-5 text-neutral-700 dark:text-neutral-200 flex-shrink-0" />
    },
    {
      label: 'Add Content',
      href: '/add-content',
      icon: <IconPlus className="h-5 w-5 text-neutral-700 dark:text-neutral-200 flex-shrink-0" />
    },
    {
      label: 'About',
      href: '/about',
      icon: <IconInfoCircle className="h-5 w-5 text-neutral-700 dark:text-neutral-200 flex-shrink-0" />
    }
  ];

  const handleLogout = async () => {
    await signOut({ callbackUrl: '/' });
    setShowLogoutDialog(false);
  };

  return (
    <>
      <div className="h-screen">
        <Sidebar open={open} setOpen={setOpen}>
          <SidebarBody className="justify-between gap-10">
            <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
              {open ? (
                <Link href="/" className="flex items-center space-x-2">
                  <div className="h-6 w-6 bg-indigo-600 rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-xl font-bold text-foreground"
                  >
                    MangaReader
                  </motion.span>
                </Link>
              ) : (
                <Link href="/" className="flex items-center">
                  <div className="h-6 w-6 bg-indigo-600 rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
                </Link>
              )}

              <div className="mt-8 flex flex-col gap-2">
                {navItems.map((item) => (
                  <SidebarLink key={item.label} link={item} />
                ))}
              </div>
            </div>

            <div>
              {session ? (
                <div className="space-y-2">
                  <SidebarLink
                    link={{
                      label: sessionWithAvatar.user?.name || sessionWithAvatar.user?.email || '',
                      href: '/profile',
                      icon: sessionWithAvatar.user?.avatar_url ? (
                        <div
                          style={{
                            width: 28,
                            height: 28,
                            backgroundImage: `url(${sessionWithAvatar.user.avatar_url})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            borderRadius: '50%',
                            flexShrink: 0
                          }}
                          role="img"
                          aria-label="Avatar"
                        />
                      ) : (
                        <IconUser className="h-5 w-5 text-neutral-700 dark:text-neutral-200 flex-shrink-0" />
                      ),
                    }}
                  />
                  <button
                    onClick={() => setShowLogoutDialog(true)}
                    className="w-full"
                  >
                    <SidebarLink
                      link={{
                        label: 'Logout',
                        href: '#',
                        icon: <IconLogout className="h-5 w-5 text-neutral-700 dark:text-neutral-200 flex-shrink-0" />
                      }}
                    />
                  </button>
                </div>
              ) : (
                <div className="flex flex-col gap-2 p-2">
                  {open ? (
                    <>
                      <Link
                        href="/auth/login"
                        className="flex items-center justify-center gap-2 w-full rounded-lg bg-white/10 px-4 py-2 text-center text-foreground backdrop-blur-md hover:text-foreground/80"
                      >
                        <IconLogin className="h-5 w-5" />
                        Login
                      </Link>
                      <Link
                        href="/auth/register" 
                        className="flex items-center justify-center gap-2 w-full rounded-lg bg-indigo-600 px-4 py-2 text-center text-white backdrop-blur-md hover:bg-indigo-700"
                      >
                        <IconUserPlus className="h-5 w-5" />
                        Register
                      </Link>
                    </>
                  ) : (
                    <>
                      <Link
                        href="/auth/login"
                        className="text-foreground hover:text-foreground/80 mb-2"
                      >
                        <IconLogin className="h-5 w-5" />
                      </Link>
                      <Link
                        href="/auth/register"
                        className="text-indigo-600 hover:text-indigo-700"
                      >
                        <IconUserPlus className="h-5 w-5" />
                      </Link>
                    </>
                  )}
                </div>
              )}
            </div>
          </SidebarBody>
        </Sidebar>
      </div>

      <Dialog open={showLogoutDialog} onOpenChange={setShowLogoutDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Logout</DialogTitle>
            <DialogDescription>
              Are you sure you want to logout from your account?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowLogoutDialog(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleLogout}>
              Logout
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
