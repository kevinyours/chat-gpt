'use client';

import Button from '@/components/Button';
import Modal from '@/components/Modal';
import RoomForm from '@/components/RoomForm';
import { useForm } from '@/hooks/useForm';
import { useRoom } from '@/hooks/useRoom';
import { useRouter } from 'next/navigation';
import { Fragment } from 'react';

const Rooms = () => {
  const { push } = useRouter();
  const { readAllRooms } = useRoom();
  const { handleClick, handleOpen, setIsOpen, isOpen, value } = useForm();

  const handleRoute = (capacity: number, id: number) => {
    // use capacity value if you want group chat
    push(`/chat/${id}`);
  };

  return (
    <Fragment>
      <Modal
        mode={'edit'}
        initialValue={value}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onClick={handleClick}
      />
      <ul className="block mt-8">
        {readAllRooms?.length === 0 ? (
          <RoomForm onClick={handleClick} />
        ) : (
          <>
            {readAllRooms?.map(({ id, name, capacity }) => {
              return (
                <li
                  key={`chat-room-${id}`}
                  className={'flex justify-between border-t-[1px] leading-10'}
                  style={{
                    padding: '1rem 0.5rem',
                    borderTop: '0.4px solid white',
                  }}
                >
                  <span
                    className="text-xl text-white cursor-pointer"
                    onClick={() => handleRoute(capacity, id!)}
                  >
                    {name}
                  </span>
                  <Button
                    style="btn-sm w-max cursor-pointer btn-success"
                    onClick={() =>
                      handleOpen({
                        id,
                        name,
                        capacity,
                      })
                    }
                  >
                    Edit
                  </Button>
                </li>
              );
            })}
          </>
        )}
      </ul>
    </Fragment>
  );
};

export default Rooms;
