import SearchResultLocation from '@/app/(header-footer)/search/components/SearchResultLocation';
import { FilterType } from '@/schemas/rooms';
import { FilterRoomResponse } from '@/types/room';
import SearchResultRoomList from './SearchResultRoomList';

interface SearchResultBoxProps {
  filter: FilterType;
  filterRoom: FilterRoomResponse;
}

export default function SearchResultBox({ filter, filterRoom }: SearchResultBoxProps) {
  if (filterRoom.data.length === 0) {
    return (
      <div className="flex h-[500px] items-center justify-center">
        <p>조건에 맞는 숙소가 없습니다.</p>
      </div>
    );
  }

  return (
    <div className="space-y-3 p-4">
      <span className="text-lg font-semibold">
        숙소&nbsp;
        {filterRoom.page.totalItems >= 1000 ? '1000개 이상' : `${filterRoom.page.totalItems}개`}
      </span>
      <div className="relative grid grid-cols-12 gap-6">
        <SearchResultRoomList
          filter={filter}
          initRooms={filterRoom.data}
          hasNext={filterRoom.page.hasNextPage}
          roomCount={18}
        />
        <div className="sticky top-64 col-span-5 h-[calc(100vh-256px)]">
          <SearchResultLocation
            latitude={+filterRoom.data[0].latitude}
            longitude={+filterRoom.data[0].longitude}
          />
        </div>
      </div>
    </div>
  );
}
