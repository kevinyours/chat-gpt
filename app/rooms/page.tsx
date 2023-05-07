import Image from 'next/image';
import { twMerge } from 'tailwind-merge';
import RoomButton from '@/components/RoomButton';
import Rooms from '@/fragments/Rooms';

export default function Room() {
  return (
    <div className="w-full h-full px-2 py-8 box-border">
      <nav className="flex items-center gap-4 mt-8 p-4 box-border">
        <Image
          className={twMerge('w-[124px]')}
          width={124}
          height={19}
          src="/logo.svg"
          alt="logo"
        />
        <RoomButton />
      </nav>
      <Rooms />
    </div>
  );
}
