import { ChatDTO } from '@/interfaces/chat.dto';
import { RoomDTO } from '@/interfaces/room.dto';
import { Nullable } from '@/interfaces/shared';
import Dexie, { Table } from 'dexie';
import friendsRepository from './friends';

class ChatRepository extends Dexie {
  rooms!: Table<RoomDTO>;
  chats!: Table<ChatDTO>;

  constructor() {
    super('myChatDB');
    this.version(1).stores({
      rooms: '++id,name,capacity',
      chats: 'chatId,*contents',
    });
  }

  public async createRoom({ name, capacity }: Omit<RoomDTO, 'members'>) {
    const room: RoomDTO = {
      name,
      capacity,
      members: friendsRepository.generateFriends(capacity),
    };

    const id = await this.rooms.add(room);
    return id;
  }

  public async readRoom(id: number): Promise<Nullable<RoomDTO>> {
    const room = this.rooms.get(id);
    if (!room) return null;
    return room as Promise<RoomDTO>;
  }

  public async readAllRooms(): Promise<RoomDTO[]> {
    return this.rooms.toArray();
  }

  public async updateRoom({
    id,
    name,
    capacity,
  }: Omit<RoomDTO, 'members'>): Promise<boolean> {
    const room = await this.rooms.get(id!);
    if (!room) return false;

    const { members: roomMembers = [], capacity: roomCapacity } =
      room as RoomDTO;

    const members = friendsRepository.reArrangeFriends(
      roomMembers,
      capacity - roomCapacity
    );

    await this.rooms.where('id').equals(id!).modify({
      name,
      capacity,
      members,
    });

    return true;
  }

  public async deleteRoom(id: number) {
    await this.rooms.delete(id);
  }

  public async clearRooms() {
    await this.rooms.clear();
  }

  public async insertOrUpdateChat(chat: ChatDTO) {
    const history = await this.readChatByChatId(chat.chatId);
    if (history.length < 1) return this.addChat(chat);
    return this.putChat(chat);
  }

  public async addChat(chat: ChatDTO) {
    await this.chats.add(chat);
  }

  public async putChat(chat: ChatDTO) {
    await this.chats.put(chat);
  }

  public async readChatByChatId(chatId: number) {
    return this.chats.where('chatId').equals(chatId).sortBy('contents.order');
  }
}

const chatRepository = new ChatRepository();
export default chatRepository;
