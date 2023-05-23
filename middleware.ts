import { NextRequest, NextResponse } from 'next/server';

export const config = {
  matcher: [
    /*
     * Match all paths except for:
     * 1. /api routes
     * 2. /_next (Next.js internals)
     * 3. /examples (inside /public)
     * 4. all root files inside /public (e.g. /favicon.ico)
     */
    '/((?!api/|_next/|_static/|media/|favicon/|images/|api/|examples/|[\\w-]+\\.\\w+).*)',
  ],
};

export default async function middleware(req: NextRequest) {
  const url = req.nextUrl;
  const path = url.pathname;
  const search = url.search;

  if (path == '/najem-plovil' && search.length > 0) {
    return NextResponse.rewrite(new URL(`${path}/search/${search}`, req.url));
  }

  return NextResponse.rewrite(url);
}
