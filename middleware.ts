import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
  const url = req.nextUrl;

  if (url.pathname.startsWith('/_next/') || url.pathname.startsWith('/api/')) {
    return NextResponse.next();
  }

  const allowedPaths = ['/fr/conclusion', '/ja/conclusion', '/robots.txt', '/headerbg.jpg'];

  if (!allowedPaths.includes(url.pathname)) {
    return NextResponse.redirect(new URL('/fr/conclusion', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/((?!_next/|api/).*)',
};
