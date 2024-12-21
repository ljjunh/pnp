'use client';

import { Room } from '@/types/room';
import ModalProvider from '@/components/common/ModalProvider/ModalProvider';
import { useModal } from '@/hooks/useModal';
import { MODAL_ID } from '@/constants/modal';
import { IoIosArrowForward, IoMdTime } from 'react-icons/io';
import { PiDoorOpen } from 'react-icons/pi';
import { RxCross2 } from 'react-icons/rx';

interface RoomRulesModalButtonProps {
  checkIn: Room['checkIn'];
  checkOut: Room['checkOut'];
  checkInType: Room['checkInType'];
  rules: Room['rules'];
}

export default function RoomRulesModalButton({
  checkIn,
  checkOut,
  checkInType,
  rules,
}: RoomRulesModalButtonProps) {
  const { handleOpenModal, handleCloseModal } = useModal(MODAL_ID.ROOM_RULES);

  return (
    <>
      <button
        type="button"
        aria-label="숙소 규칙 상세 설명 보기"
        onClick={handleOpenModal}
        className="flex items-center text-shade-02 underline hover:text-black"
      >
        더 보기
        <IoIosArrowForward size={19} />
      </button>
      <ModalProvider modalId={MODAL_ID.ROOM_RULES}>
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
          aria-describedby="modal-description"
          className="relative max-h-[80vh] w-[780px] px-6 pb-8 pt-4"
        >
          <div className="mb-4 mt-2 inline-block rounded-full p-2 hover:bg-neutral-01">
            <RxCross2
              onClick={handleCloseModal}
              aria-label="모달 닫기"
              className="cursor-pointer"
              role="button"
              tabIndex={0}
            />
          </div>
          <h1 className="mb-4 mt-2 text-2xl">숙소 이용규칙</h1>
          <p className="mb-8 text-shade-02">
            에어비앤비 숙소는 다른 사람이 실제로 거주하는 집인 경우가 많으므로, 숙소를 소중히
            다뤄주세요.
          </p>
          <section>
            <div className="mb-2">
              <h2 className="py-4 text-lg">체크인 및 체크아웃</h2>
              <div className="flex items-center gap-4 border-b py-6 text-shade-02">
                <IoMdTime size={25} />
                체크인 가능 시간 : {checkIn} 이후
              </div>
              <div className="flex items-center gap-4 border-b py-6 text-shade-02">
                <IoMdTime size={25} />
                체크아웃 시간 : {checkOut} 전까지
              </div>
              {checkInType && (
                <div className="flex items-center gap-4 py-6 text-shade-02">
                  <PiDoorOpen size={25} />
                  셀프 체크인 : {checkInType}
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
      </ModalProvider>
    </>
  );
}
