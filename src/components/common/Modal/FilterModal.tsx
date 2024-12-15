'use client';

import Accessibility from '@/app/(header-footer)/components/Filter/Accessibility';
import Amenity from '@/app/(header-footer)/components/Filter/Amenity';
import BuildingOption from '@/app/(header-footer)/components/Filter/BuildingOption';
import GuestPrefer from '@/app/(header-footer)/components/Filter/GuestPrefer';
import HostLanguage from '@/app/(header-footer)/components/Filter/HostLanguage';
import KindOfRoom from '@/app/(header-footer)/components/Filter/KindOfRoom';
import PriceRange from '@/app/(header-footer)/components/Filter/PriceRange';
import ReservationOption from '@/app/(header-footer)/components/Filter/ReservationOption';
import RoomAndBed from '@/app/(header-footer)/components/Filter/RoomAndBed';
import { useModal } from '@/hooks/useModal';
import { RxCross2 } from 'react-icons/rx';

export default function FilterModal() {
  const { handleCloseModal } = useModal();

  return (
    <div className="relative h-[600px] w-[550px]">
      <header className="sticky top-0 z-10 flex h-16 w-full items-center justify-center border-b border-neutral-03 bg-white">
        <RxCross2
          className="absolute left-4 cursor-pointer"
          size={20}
          onClick={handleCloseModal}
        />
        <p className="text-center font-semibold">필터</p>
      </header>
      <div className="h-[calc(600px-128px)] overflow-y-auto">
        {/* 숙소 유형 */}
        <KindOfRoom />
        <hr className="mx-6 bg-neutral-03" />
        {/* 가격 범위 */}
        <PriceRange />
        <hr className="mx-6 bg-neutral-03" />
        {/* 침실과 침대 */}
        <RoomAndBed />
        <hr className="mx-6 bg-neutral-03" />
        {/* 편의시설 */}
        <Amenity />
        <hr className="mx-6 bg-neutral-03" />
        {/* 예약 옵션 */}
        <ReservationOption />
        <hr className="mx-6 bg-neutral-03" />
        {/* 돋보이는 숙소 */}
        <GuestPrefer />
        <hr className="mx-6 bg-neutral-03" />
        {/* 건물 유형 */}
        <BuildingOption />
        <hr className="mx-6 bg-neutral-03" />
        {/* 접근성 편의 */}
        <Accessibility />
        <hr className="mx-6 bg-neutral-03" />
        {/* 호스트 언어 */}
        <HostLanguage />
      </div>
      <footer className="sticky bottom-0 flex h-16 w-full items-center justify-between border-t border-neutral-03 bg-white px-6">
        <span className="font-semibold">전체 해제</span>
        <div className="rounded-lg bg-black px-4 py-2 text-white">
          <span>숙소 923개 보기</span>
        </div>
      </footer>
    </div>
  );
}
