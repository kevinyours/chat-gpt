import { OpenAIStream } from '@/helpers/stream';
import { OpenAIStreamDTO } from '@/interfaces/open-ai.dto';
import { ModelType, RoleType } from '@/interfaces/open-ai.enum';
import { NextRequest } from 'next/server';

type RequestDTO = {
  payload: string;
};

export const runtime = 'edge';

export async function POST(request: NextRequest) {
  const hasApiKey = request.cookies.has('apiKey');
  const { payload } = (await request.json()) as RequestDTO;

  if (!hasApiKey) return new Response('No API Key', { status: 400 });
  if (!payload) return new Response('No payload', { status: 400 });

  const apiKey = request.cookies.get('apiKey')!.value;
  const data: OpenAIStreamDTO = {
    model: ModelType.GPT3,
    messages: [{ role: RoleType.USER, content: payload }],
    temperature: 0.7,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
    max_tokens: 2048,
    stream: true,
    n: 1,
  };

  try {
    const stream = await OpenAIStream(data, apiKey);
    return new Response(stream);
  } catch (error: unknown) {
    const errorStatus = Number((error as any)?.message ?? 401);

    return new Response('Failure', {
      status: errorStatus,
    });
  }
}
