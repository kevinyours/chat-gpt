import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  const hasApiKey = request.cookies.get('apiKey');
  if (!hasApiKey) return NextResponse.rewrite(new URL('/', request.url));

  return response;
}

export const config = {
  matcher: ['/rooms/:path*', '/chat/:path*'],
};
