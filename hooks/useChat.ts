import { getCurrentTime24, getTimestamp } from '@/helpers/date';
import { getErrorMessage } from '@/helpers/error';
import fetcher from '@/helpers/fetcher';
import { ChatContentDTO, ChatDTO } from '@/interfaces/chat.dto';
import { MemeberDTO } from '@/interfaces/member.dto';
import { Nullable } from '@/interfaces/shared';
import chatRepository from '@/repositories/chat';
import { FormEvent, useRef, useState, KeyboardEvent, MouseEvent } from 'react';

interface UseChatProps {
  chatId: string;
  friends: MemeberDTO[];
}

export function useChat({ chatId, friends }: UseChatProps) {
  const chatRef = useRef<Nullable<HTMLTextAreaElement>>(null);
  const [response, setResponse] = useState<ChatContentDTO[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleClick = (
    e: MouseEvent<SVGElement> & FormEvent<HTMLFormElement>
  ) => {
    if (isLoading) return;
    setIsLoading(true);
    handleSubmit(e);
  };

  const handleEnter = (
    e: KeyboardEvent<HTMLTextAreaElement> & FormEvent<HTMLFormElement>
  ) => {
    if (e.key !== 'Enter' || isLoading) return;
    if (isLoading) return;
    setIsLoading(true);
    handleSubmit(e);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const question = chatRef.current?.value ?? null;
    if (!question) return;

    // from user input
    const chatFromUser: ChatDTO = {
      chatId: parseInt(chatId),
      contents: [
        ...response,
        {
          order: response.length,
          speaker: 0,
          message: question,
          createdAt: getCurrentTime24(),
          timestamp: getTimestamp(),
        },
      ],
    };

    await chatRepository.insertOrUpdateChat(chatFromUser);
    const chatFromUserIdx = chatFromUser.contents.length - 1;

    setResponse((prev) => {
      return [
        ...prev,
        chatFromUser.contents[chatFromUserIdx > 0 ? chatFromUserIdx : 0],
      ];
    });
    chatRef.current!.value = '';

    try {
      const chatGPTresponse = await fetcher({
        url: '/api/chat',
        payload: { payload: question },
      });

      if (!chatGPTresponse.ok) {
        throw new Error(chatGPTresponse.status.toString());
      }

      const data = chatGPTresponse.body;
      if (!data) return;

      const reader = data.getReader();
      const decoder = new TextDecoder();
      let done = false;

      setResponse((prev) => [...prev, chatFromUser.contents[0]]);

      let currentResponse: string[] = [];
      let chatFromGTP: ChatDTO;
      let newContent: ChatContentDTO;

      while (!done) {
        const { value, done: doneReading } = await reader.read();
        done = doneReading;
        const chunkValue = decoder.decode(value);
        currentResponse = [...currentResponse, chunkValue];

        newContent = {
          speaker: friends[0].id,
          order: chatFromUser.contents.length + 1,
          message: currentResponse.join(''),
          createdAt: getCurrentTime24(),
          timestamp: getTimestamp(),
        };

        chatFromGTP = {
          chatId: parseInt(chatId),
          contents: [...chatFromUser.contents, newContent],
        };

        setResponse((prev) => [...prev.slice(0, -1), newContent]);
      }

      setIsLoading(false);

      setTimeout(() => {
        chatRepository.putChat(chatFromGTP);
      }, 400);
    } catch (error) {
      const errorStatus = Number((error as any)?.message ?? 401);
      alert(getErrorMessage(errorStatus));
    }
  };

  const loadChatHistory = async (chatId: number) => {
    const history = await chatRepository.readChatByChatId(chatId);
    setResponse(history[0]?.contents ?? []);
  };

  return {
    chatRef,
    response,
    isLoading,
    handleClick,
    handleEnter,
    handleSubmit,
    loadChatHistory,
  };
}
