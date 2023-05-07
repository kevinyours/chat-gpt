import { MemeberDTO } from '@/interfaces/member.dto';
import { ChatFriends } from '@/mocks/members';

class FriendsRepository {
  _MINIMUM_CAPACITY = 1;
  _MAXIMUN_CAPACITY = ChatFriends.length - 1;

  get minimumCapacity(): number {
    return this._MINIMUM_CAPACITY;
  }

  get maximumCapacity(): number {
    return this._MAXIMUN_CAPACITY;
  }

  get me() {
    return ChatFriends[0];
  }

  public getFriend(id: number) {
    return ChatFriends[id];
  }

  get randomFriendId() {
    return Math.floor(
      Math.random() * this.maximumCapacity + this.minimumCapacity
    );
  }

  public reArrangeFriends(members: MemeberDTO[], correctionValue: number) {
    if (correctionValue === 0) return members;
    if (correctionValue < 0) return members.slice(0, correctionValue);

    return this.generateFriends(
      members.length + correctionValue,
      members.map(({ id }) => id)
    );
  }

  public generateFriends(
    capacity = this.minimumCapacity,
    members: number[] = []
  ) {
    const numberOfFriends = Math.min(capacity, this.maximumCapacity);
    const candidates = new Set<number>(members);

    do {
      const id = this.randomFriendId;
      const isExisted = candidates.has(id);

      if (!isExisted) {
        candidates.add(id);
      }
    } while (candidates.size < numberOfFriends);

    return Array.from(candidates).map((idx) => ChatFriends[idx]);
  }
}

const friendsRepository = new FriendsRepository();
export default friendsRepository;
