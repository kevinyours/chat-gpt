import ChatHistory from '@/fragments/ChatHistory';

interface ChatBubblesProps {
  params: { id: string };
}

export default async function ChatBubbles({ params }: ChatBubblesProps) {
  return (
    <div className="relative w-full h-full px-4 pt-10 pb-28 box-border">
      <ChatHistory chatId={params.id} />
    </div>
  );
}
