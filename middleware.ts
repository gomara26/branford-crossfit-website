import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Check if the request is for an admin route
  if (request.nextUrl.pathname.startsWith('/admin')) {
    // Skip middleware for the login page itself
    if (request.nextUrl.pathname === '/admin/login') {
      return NextResponse.next()
    }

    // Check for admin authentication cookie
    const adminAuth = request.cookies.get('adminAuth')
    
    if (!adminAuth || adminAuth.value !== 'true') {
      // Redirect to login page if not authenticated
      return NextResponse.redirect(new URL('/admin/login', request.url))
    }
  }

  return NextResponse.next()
}

// Configure which routes to run middleware on
export const config = {
  matcher: [
    '/admin/:path*',
    '/editmemberspotlights/:path*',
    '/editupcomingevents/:path*',
    '/editlifeatbranford/:path*',
    '/editgallery/:path*'
  ]
} 