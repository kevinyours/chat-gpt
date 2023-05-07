'use client';

import { VscAdd } from 'react-icons/vsc';
import { twMerge } from 'tailwind-merge';
import { OnClickProps, useForm } from '@/hooks/useForm';
import { useRoom } from '@/hooks/useRoom';
import Modal from '../Modal';

const RoomButton = () => {
  const { createRoom, readAllRooms = [] } = useRoom();
  const { isOpen, setIsOpen } = useForm();

  const handleClick: OnClickProps = async ({ type, value }) => {
    switch (type) {
      case 'create':
      default:
        await createRoom(value!);
        setIsOpen(false);
        break;
    }
  };

  return (
    <>
      {readAllRooms?.length > 0 && (
        <>
          <VscAdd
            onClick={() => setIsOpen(true)}
            className={twMerge('w-5 h-5 ml-auto cursor-pointer')}
          />
          <Modal
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
            onClick={handleClick}
          />
        </>
      )}
    </>
  );
};

export default RoomButton;
