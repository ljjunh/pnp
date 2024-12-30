'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import Amenity from '@/app/(header-footer)/components/filter/Amenity';
import HostLanguage from '@/app/(header-footer)/components/filter/HostLanguage';
import KindOfRoom from '@/app/(header-footer)/components/filter/KindOfRoom';
import PriceRange from '@/app/(header-footer)/components/filter/PriceRange';
import ReservationOption from '@/app/(header-footer)/components/filter/ReservationOption';
import RoomAndBed from '@/app/(header-footer)/components/filter/RoomAndBed';
import { FilterType } from '@/schemas/rooms';
import { fetchFilterCount } from '@/apis/filters/action';
import { useModal } from '@/hooks/useModal';
import { formatFilter } from '@/utils/formatFilter';
import { MODAL_ID } from '@/constants/modal';
import { RxCross2 } from 'react-icons/rx';

export default function FilterModal() {
  const [filterCount, setFilterCount] = useState<number | null>(null);
  const { handleCloseModal } = useModal(MODAL_ID.ROOM_FILTER);
  const params = useSearchParams();

  const paramFilter: FilterType = {
    roomType: params.get('roomType') as 'Entire' | 'Private' | null,
    minPrice: params.get('minPrice') ? Number(params.get('minPrice')) : undefined,
    maxPrice: params.get('maxPrice') ? Number(params.get('maxPrice')) : undefined,
    bedroom: params.get('bedroom') ? Number(params.get('bedroom')) : undefined,
    bed: params.get('bed') ? Number(params.get('bed')) : undefined,
    bathroom: params.get('bathroom') ? Number(params.get('bathroom')) : undefined,
    amenityArray: params.get('amenities')?.split(',') || [],
    option: params.get('option')?.split(',') || [],
    language: params.get('language')?.split(',').map(Number) || [],
    property: params.get('property') ? Number(params.get('property')) : undefined,
  };

  const [filter, setFilter] = useState<FilterType>(paramFilter);

  const handleFilter = <K extends keyof FilterType>(
    newState: FilterType[K],
    type: keyof FilterType,
  ) => {
    setFilter((prev) => ({ ...prev, [type]: newState }));
  };

  const handleClearFilter = () => {
    setFilter({
      roomType: null,
      minPrice: undefined,
      maxPrice: undefined,
      bedroom: undefined,
      bed: undefined,
      bathroom: undefined,
      amenityArray: [],
      option: [],
      language: [],
      property: undefined,
    });
  };

  useEffect(() => {
    const changeCount = async () => {
      try {
        const response = await fetchFilterCount(filter);

        setFilterCount(response);
      } catch (error) {
        console.error(error);
      }
    };

    changeCount();
  }, [filter]);

  // 클릭 시 필터링 주소로 이동 및 모달 닫기
  const handleFilterRoom = () => {
    const param = formatFilter(filter);

    return `${param.toString() ? `?${param.toString()}` : ''}`;
  };

  return (
    <div className="relative h-[600px] w-[550px]">
      <div className="sticky top-0 z-10 flex h-16 w-full items-center justify-center border-b border-neutral-03 bg-white">
        <RxCross2
          className="absolute left-4 cursor-pointer"
          size={20}
          onClick={handleCloseModal}
        />
        <p className="text-center font-semibold">필터</p>
      </div>
      <div className="h-[calc(600px-128px)] overflow-y-auto">
        {/* 선택된 필터 추가 */}
        {/* 숙소 유형 */}
        <KindOfRoom
          roomType={filter.roomType}
          handleFilter={handleFilter}
        />
        <hr className="mx-6 bg-neutral-03" />
        {/* 가격 범위 */}
        <PriceRange
          roomType={filter.roomType}
          property={filter.property}
          handleFilter={handleFilter}
        />
        <hr className="mx-6 bg-neutral-03" />
        {/* 침실과 침대 */}
        <RoomAndBed
          bedroom={filter.bedroom}
          bed={filter.bed}
          bathroom={filter.bathroom}
          handleFilter={handleFilter}
        />
        <hr className="mx-6 bg-neutral-03" />
        {/* 편의시설 */}
        <Amenity
          amenityArray={filter.amenityArray}
          handleFilter={handleFilter}
        />
        <hr className="mx-6 bg-neutral-03" />
        {/* 예약 옵션 */}
        <ReservationOption
          option={filter.option}
          handleFilter={handleFilter}
        />
        <hr className="mx-6 bg-neutral-03" />
        {/* 호스트 언어 */}
        <HostLanguage
          language={filter.language}
          handleFilter={handleFilter}
        />
      </div>
      <div className="sticky bottom-0 flex h-16 w-full items-center justify-between border-t border-neutral-03 bg-white px-6">
        <span
          className="cursor-pointer font-semibold"
          onClick={handleClearFilter}
        >
          전체 해제
        </span>
        <div onClick={handleCloseModal}>
          <Link
            className="rounded-lg bg-black px-4 py-2 text-white"
            href={handleFilterRoom()}
          >
            <span>
              숙소 {filterCount !== null && filterCount > 1000 ? '1000+' : (filterCount ?? 0)}개
              보기
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
