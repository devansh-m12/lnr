import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import { auth } from '@/auth';

// Define paths that require protection
const protectedPaths = ['/dashboard', '/admin', '/sample'];

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // Check if the current path starts with any of the protected paths
  const isProtectedPath = protectedPaths.some((prefix) =>
    path.startsWith(prefix),
  );

  if (isProtectedPath) {
    // Check authentication status
    const session = await auth();

    // If not authenticated, redirect to login
    if (!session) {
      const loginUrl = new URL('/api/auth/signin', request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  // Allow access to non-protected paths or authenticated users
  return NextResponse.next();
}

// Configure which paths the middleware should run on
export const config = {
  matcher: ['/((?!api/auth|_next|static|.*\\.[^/]*$).*)'],
};
