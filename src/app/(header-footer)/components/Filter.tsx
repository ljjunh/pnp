'use client';

import FilterModal from '@/app/(header-footer)/components/filter/FilterModal';
import FilterButton from '@/components/common/Button/FilterButton';
import ModalProvider from '@/components/common/ModalProvider/ModalProvider';
import { MODAL_ID } from '@/constants/modal';

const filterArray: string[] = [
  'B&B',
  '게스트 스위트',
  '게스트용 별채',
  '공동주택',
  '농장 체험',
  '레지던스',
  '로프트',
  '료칸',
  '리조트',
  '방갈로',
  '별장',
  '산장',
  '아파트',
  '저택',
  '집',
  '초소형 주택',
  '카사 파르티쿨라르',
  '캠핑장',
  '캠핑카',
  '컨테이너 하우스',
  '콘도',
  '타운하우스',
  '펜션',
  '호스텔',
  '휴가용 주택',
];

export default function Filter() {
  return (
    <>
      <div className="flex h-[78px] flex-row items-center justify-between">
        <p>필터 아이콘들 들어갈 자리</p>
        <FilterButton />
      </div>
      <ModalProvider modalId={MODAL_ID.ROOM_FILTER}>
        <FilterModal />
      </ModalProvider>
    </>
  );
}
