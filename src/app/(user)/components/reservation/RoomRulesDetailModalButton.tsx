'use client';

import { Room } from '@/types/room';
import ModalProvider from '@/components/common/ModalProvider/ModalProvider';
import { useModal } from '@/hooks/useModal';
import { MODAL_ID } from '@/constants/modal';
import { DEFAULT_CHECK_IN_TIME, DEFAULT_CHECK_OUT_TIME } from '@/constants/reservation';
import { IoMdTime } from 'react-icons/io';
import { PiDoorOpen } from 'react-icons/pi';
import { RxCross2 } from 'react-icons/rx';

interface RoomRulesDetailModalButtonProps {
  checkInType: Room['checkInType'];
  checkIn: Room['checkIn'];
  checkOut: Room['checkOut'];
  rules: Room['rules'];
}

export function RoomRulesDetailModalButton({
  checkInType,
  checkIn,
  checkOut,
  rules,
}: RoomRulesDetailModalButtonProps) {
  const { handleOpenModal, handleCloseModal } = useModal(MODAL_ID.TRIP_ROOM_RULES);

  return (
    <>
      <button
        aria-label="숙소 규칙 상세 설명 보기"
        onClick={handleOpenModal}
        className="cursor-pointer underline"
      >
        더 보기
      </button>
      <ModalProvider modalId={MODAL_ID.TRIP_ROOM_RULES}>
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
          aria-describedby="modal-description"
          className="relative max-h-[80vh] w-[560px] overflow-hidden pb-8 pt-4"
        >
          <div className="mx-2 mb-4 mt-2 inline-block rounded-full p-2 hover:bg-neutral-01">
            <RxCross2
              onClick={handleCloseModal}
              onKeyDown={(e) => e.key === 'ESC' && handleCloseModal()}
              aria-label="모달 닫기"
              className="cursor-pointer"
              role="button"
              tabIndex={0}
            />
          </div>
          <div className="h-full overflow-auto px-6 pb-8 pt-4">
            <h1 className="mb-4 mt-2 text-2xl font-medium">숙소 이용규칙</h1>
            <p className="mb-8 text-shade-02">
              에어비앤비 숙소는 다른 사람이 실제로 거주하는 집인 경우가 많으므로, 숙소를 소중히
              다뤄주세요.
            </p>
            <section>
              <div className="mb-2">
                <h2 className="py-4 text-lg">체크인 및 체크아웃</h2>
                <div className="flex items-center gap-4 border-b py-6 text-shade-02">
                  <IoMdTime size={25} />
                  체크인 시간: {checkIn ? checkIn : DEFAULT_CHECK_IN_TIME} 이후
                </div>
                <div className="flex items-center gap-4 border-b py-6 text-shade-02">
                  <IoMdTime size={25} />
                  체크아웃 시간: {checkOut ? checkOut : DEFAULT_CHECK_OUT_TIME} 이전
                </div>
                {checkInType && (
                  <div className="flex items-center gap-4 py-6 text-shade-02">
                    <PiDoorOpen size={25} />
                    체크인 : {checkInType}
                  </div>
                )}
              </div>
              <div>
                <h2 className="py-4 text-lg">숙박 중</h2>
                {rules.map((rule) => (
                  <div
                    key={rule.id}
                    className="flex items-center gap-4 border-b py-6 text-shade-02"
                  >
                    {rule.title}
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </ModalProvider>
    </>
  );
}
