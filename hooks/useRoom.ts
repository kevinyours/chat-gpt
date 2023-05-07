import { useLiveQuery } from 'dexie-react-hooks';
import { RoomDTO } from '@/interfaces/room.dto';
import chatRepository from '@/repositories/chat';

export function useRoom() {
  const createRoom = async (props: Omit<RoomDTO, 'members'>) => {
    return chatRepository.createRoom(props);
  };

  const readRoom = async (id: number) => chatRepository.readRoom(id);

  const readAllRooms = useLiveQuery(async () => {
    return chatRepository.rooms.toArray();
  });

  const updateRoom = async (props: Omit<RoomDTO, 'members'>) => {
    return chatRepository.updateRoom(props);
  };

  const deleteRoom = (id: number) => chatRepository.deleteRoom(id);

  const clearRooms = () => chatRepository.clearRooms();

  return {
    createRoom,
    readRoom,
    readAllRooms,
    updateRoom,
    deleteRoom,
    clearRooms,
  };
}
