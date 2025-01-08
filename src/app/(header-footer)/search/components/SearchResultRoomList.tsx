'use client';

import RoomList from '@/app/(header-footer)/components/RoomList';
import { FilterType } from '@/schemas/rooms';
import { FilterRoom } from '@/types/room';
import { useFilterRooms } from '@/hooks/useFilterRooms';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';

interface SearchResultRoomListProps {
  initRooms: FilterRoom[];
  filter: FilterType;
  hasNext: boolean;
  roomCount: number;
}

export default function SearchResultRoomList({
  initRooms,
  filter,
  hasNext,
  roomCount,
}: SearchResultRoomListProps) {
  const { rooms, isLoading, hasNextPage, fetchNextPage } = useFilterRooms({
    filter,
    initialRooms: initRooms,
    hasNext,
    roomCount,
  });

  const observerRef = useIntersectionObserver({
    onIntersect: fetchNextPage,
    disabled: isLoading && !hasNextPage,
  });

  return (
    <div className="col-span-7">
      <RoomList
        rooms={rooms}
        search
      />
      <div
        ref={observerRef}
        className="h-4"
      />
    </div>
  );
}
