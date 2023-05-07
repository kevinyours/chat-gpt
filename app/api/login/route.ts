import { type NextRequest } from 'next/server';

// Max-Age=${maxAge};
// const maxAge = 60 * 60 * 24 * 30; // 30일

type RequestDTO = {
  payload: string;
};

export const runtime = 'edge';

export async function POST(request: NextRequest) {
  const { payload } = (await request.json()) as RequestDTO;

  if (!payload)
    return new Response('No payload', {
      status: 400,
      statusText: 'Invalid Payload',
    });

  try {
    return new Response(JSON.stringify({ result: true }), {
      status: 200,
      headers: {
        'set-cookie': `apiKey=${payload}; path=/;`,
        'content-type': 'application/json',
      },
    });
  } catch (err) {
    console.error(err);

    return new Response('Success', {
      status: 500,
      statusText: 'Server Error',
    });
  }
}
