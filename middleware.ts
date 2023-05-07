import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const validatePath = (pathname: string) => {
  return {
    isRoom: pathname.startsWith('/room'),
    isChat: pathname.startsWith('/chat'),
    isConversation: pathname.startsWith('/conversation'),
  };
};

export function middleware(request: NextRequest) {
  const response = NextResponse.next();
  const { isRoom, isChat, isConversation } = validatePath(
    request.nextUrl.pathname
  );

  if (isRoom || isChat || isConversation) {
    const hasApiKey = request.cookies.get('apiKey');
    if (!hasApiKey) return NextResponse.rewrite(new URL('/', request.url));
  }

  return response;
}

export const config = {
  matcher: '/:path*',
};
