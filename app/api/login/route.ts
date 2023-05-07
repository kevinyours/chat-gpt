import { type NextRequest } from 'next/server';

type RequestDTO = {
  payload: string;
};

const maxAge = 60 * 60 * 24 * 30;
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
        'set-cookie': `apiKey=${payload}; Max-Age=${maxAge}; path=/;`,
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
