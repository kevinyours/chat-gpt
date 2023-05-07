export type ChatGPTAgent = 'user' | 'system' | 'assistant';

export interface ChatGPTMessageDTO {
  role: ChatGPTAgent;
  content: string;
}

export interface OpenAIStreamDTO {
  model: string;
  messages: ChatGPTMessageDTO[];
  temperature: number;
  top_p: number;
  frequency_penalty: number;
  presence_penalty: number;
  max_tokens: number;
  stream: boolean;
  n: number;
}
