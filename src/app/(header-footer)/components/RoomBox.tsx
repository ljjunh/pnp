'use client';

import RoomList from '@/app/(header-footer)/components/RoomList';
import { FilterType } from '@/schemas/rooms';
import { FilterRoomResponse } from '@/types/room';
import { useFilterRooms } from '@/hooks/useFilterRooms';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';

interface RoomBoxProps {
  filter: FilterType;
  filterRoom: FilterRoomResponse;
}

export default function RoomBox({ filter, filterRoom }: RoomBoxProps) {
  if (filterRoom.data.length === 0) {
    return (
      <div className="flex h-[500px] items-center justify-center">
        <p>조건에 맞는 숙소가 없습니다.</p>
      </div>
    );
  }

  const { rooms, isLoading, hasNextPage, fetchNextPage } = useFilterRooms({
    filter,
    initialRooms: filterRoom.data,
    hasNext: filterRoom.page.hasNextPage,
    roomCount: 36,
  });

  const observerRef = useIntersectionObserver({
    onIntersect: fetchNextPage,
    disabled: isLoading && !hasNextPage,
  });

  return (
    <div>
      <RoomList rooms={rooms} />
      <div
        ref={observerRef}
        className="h-4"
      />
    </div>
  );
}
