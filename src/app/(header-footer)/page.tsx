import Filter from '@/app/(header-footer)/components/Filter';
import RoomList from '@/app/(header-footer)/components/RoomList';
import { FilterType } from '@/schemas/rooms';
import { FilterRoom } from '@/types/room';
import { getFilterRoom } from '@/apis/filters/queries';

export default async function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const {
    roomType,
    minPrice,
    maxPrice,
    bedroom,
    bed,
    bathroom,
    amenities,
    option,
    language,
    property,
  } = searchParams;

  const filter: FilterType = {
    roomType: roomType as 'Entire' | 'Private' | null,
    minPrice: minPrice ? Number(minPrice) : undefined,
    maxPrice: maxPrice ? Number(maxPrice) : undefined,
    bedroom: bedroom ? Number(bedroom) : undefined,
    bed: bed ? Number(bed) : undefined,
    bathroom: bathroom ? Number(bathroom) : undefined,
    amenityArray: typeof amenities === 'string' ? amenities.split(',') : [],
    option: typeof option === 'string' ? option.split(',') : [],
    language: typeof language === 'string' ? language.split(',').map(Number) : [],
    property: property ? Number(property) : undefined,
  };

  const filterRoom: FilterRoom[] = await getFilterRoom(filter);

  return (
    <>
      <Filter />
      <RoomList rooms={filterRoom} />
    </>
  );
}
