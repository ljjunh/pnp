import { redirect } from 'next/navigation';
import SearchFilter from '@/app/(header-footer)/search/components/SearchFilter';
import SearchProperty from '@/app/(header-footer)/search/components/SearchProperty';
import SearchResultBox from '@/app/(header-footer)/search/components/SearchResultBox';
import { FilterType } from '@/schemas/rooms';
import { FilterRoomResponse } from '@/types/room';
import { getFilterRoom } from '@/apis/filters/queries';
import { formatFilter } from '@/utils/formatFilter';
import { getParamFilter } from '@/utils/getParamFilter';

export default async function SearchResultPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const filter: FilterType = getParamFilter(searchParams);

  if (!filter.location) {
    redirect(`/?${formatFilter(filter).toString()}`);
  }

  // 6의 배수이면 됨
  const filterRoom: FilterRoomResponse = await getFilterRoom(filter, 1, 18);

  return (
    <div>
      <div className="sticky top-[82px] z-10 bg-white">
        <SearchProperty />
        <hr />
        <SearchFilter filter={filter} />
        <hr />
      </div>
      <SearchResultBox
        filter={filter}
        filterRoom={filterRoom}
      />
    </div>
  );
}
