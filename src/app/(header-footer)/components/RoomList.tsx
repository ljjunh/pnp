import { FilterRoom } from '@/types/room';
import RoomCard from '@/components/common/Card/RoomCard';

interface RoomListProps {
  rooms: FilterRoom[];
}

export default function RoomList({ rooms }: RoomListProps) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:gap-8 lg:grid-cols-3 xl:grid-cols-4">
      {rooms.map((room) => (
        <RoomCard
          key={room.id}
          id={room.id}
          images={room.images}
          location={room.location}
          price={room.price}
          rating={room.reviewsAverage}
          review={'review'}
        />
      ))}
    </div>
  );
}
