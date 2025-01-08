import Filter from '@/app/(header-footer)/components/Filter';
import RoomList from '@/app/(header-footer)/components/RoomList';
import { FilterType } from '@/schemas/rooms';
import { FilterRoomResponse } from '@/types/room';
import { getFilterRoom } from '@/apis/filters/queries';
import { getParamFilter } from '@/utils/getParamFilter';

export default async function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const filter: FilterType = getParamFilter(searchParams);

  // 12의 배수로 들어가야 함
  const filterRoom: FilterRoomResponse = await getFilterRoom(filter, 1, 36);

  return (
    <>
      <Filter />
      <RoomList rooms={filterRoom.data} />
    </>
  );
}
