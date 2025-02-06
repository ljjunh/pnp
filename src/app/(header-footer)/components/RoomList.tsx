import { cn } from '@/lib/utils';
import { FilterRoom, StoryFilterRoom } from '@/types/room';
import RoomCard from '@/components/common/Card/RoomCard';

interface RoomListProps {
  rooms: FilterRoom[] | StoryFilterRoom[];
  search?: boolean;
}

export default function RoomList({ rooms, search }: RoomListProps) {
  return (
    <div
      className={cn(
        'grid grid-cols-1 gap-6 sm:grid-cols-2 md:gap-8 lg:grid-cols-3',
        search && 'xl:grid-cols-4',
      )}
    >
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
