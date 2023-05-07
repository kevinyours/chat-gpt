import { getCurrentTime24 } from '@/helpers/date';
import Image from 'next/image';
import { FC } from 'react';

interface SendBubbleProps {
  writer: string;
  message: string;
  createdAt?: string;
  avatar: string;
}

const SendBubble: FC<SendBubbleProps> = ({
  writer,
  message,
  createdAt = getCurrentTime24(),
  avatar,
}) => {
  return (
    <div className="chat chat-end">
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <Image width={40} height={40} src={avatar} alt={writer} />
        </div>
      </div>
      <div className="chat-header">
        {writer}&nbsp;
        <time className="text-xs opacity-50">{createdAt}</time>
      </div>
      <div className="chat-bubble">{message}</div>
    </div>
  );
};

export default SendBubble;
