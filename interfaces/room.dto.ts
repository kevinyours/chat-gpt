import { MemeberDTO } from './member.dto';

export interface RoomDTO {
  id?: number;
  name: string;
  capacity: number;
  members: MemeberDTO[];
}
