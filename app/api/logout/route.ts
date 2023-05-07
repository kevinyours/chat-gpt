import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(request: NextRequest) {
  return new Response('Success', {
    status: 201,
    headers: {
      'set-cookie': `apiKey=deleted; Max-Age=0; path=/;`,
      'content-type': 'application/json',
    },
  });
}
