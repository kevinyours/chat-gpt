'use client';

import ReceiveBubble from '@/components/Bubble/Receive';
import SendBubble from '@/components/Bubble/Send';
import Form from '@/components/Form';
import { useChat } from '@/hooks/useChat';
import { useFriends } from '@/hooks/useFriends';
import { useRoom } from '@/hooks/useRoom';
import { ChatContentDTO } from '@/interfaces/chat.dto';
import { MemeberDTO } from '@/interfaces/member.dto';
import { FC, Fragment, useEffect, useState } from 'react';

interface ChatHistoryProps {
  chatId: string;
}

const ChatHistory: FC<ChatHistoryProps> = ({ chatId }) => {
  const { readRoom } = useRoom();
  const { getFriend, me } = useFriends();
  const [friends, setFriends] = useState<MemeberDTO[]>([]);
  const {
    response,
    chatRef,
    isLoading,
    handleClick,
    handleEnter,
    handleSubmit,
    loadChatHistory,
  } = useChat({ chatId, friends });

  const loadRoomInfo = async () => {
    const room = await readRoom(parseInt(chatId));
    if (!room) return;
    setFriends(room.members);
  };

  useEffect(() => {
    loadRoomInfo();
    loadChatHistory(parseInt(chatId));
  }, []);

  return (
    <Fragment>
      <div className="h-full" style={{ overflowY: 'auto' }}>
        {response.map(
          ({ message, createdAt, speaker }: ChatContentDTO, idx: number) => {
            return idx % 2 === 0 ? (
              <SendBubble
                key={`chat-bubbles-${idx}`}
                writer={me.name}
                message={message}
                createdAt={createdAt}
                avatar={me.avatar}
              />
            ) : (
              <ReceiveBubble
                key={`chat-bubbles-${idx}`}
                writer={getFriend(speaker!)?.name}
                message={message}
                createdAt={createdAt}
                avatar={getFriend(speaker!)?.avatar}
              />
            );
          }
        )}
      </div>
      <div className="absolute w-full h-fit" style={{ bottom: 32 }}>
        <Form
          ref={chatRef}
          isLoading={isLoading}
          handleClick={handleClick}
          handleEnter={handleEnter}
          handleSubmit={handleSubmit}
        />
      </div>
    </Fragment>
  );
};

export default ChatHistory;
