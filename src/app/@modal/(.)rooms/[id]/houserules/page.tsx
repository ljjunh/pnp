import Modal from '@/components/common/Modal/Modal';
import { BsCamera } from 'react-icons/bs';
import { IoMdTime } from 'react-icons/io';
import { PiCigarette, PiDog, PiDoorOpen, PiUsers } from 'react-icons/pi';

export default function HouseRulesModal() {
  return (
    <Modal>
      <section className="mb-6 w-[732px] pt-10">
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
              체크인
            </div>
            <div className="flex items-center gap-4 border-b py-6 text-shade-02">
              <IoMdTime size={25} />
              체크아웃
            </div>
            <div className="flex items-center gap-4 py-6 text-shade-02">
              <PiDoorOpen size={25} />
              셀프 체크인
            </div>
          </div>
          <div>
            <h2 className="py-4 text-lg">숙박 중</h2>
            <div className="flex items-center gap-4 border-b py-6 text-shade-02">
              <PiUsers size={25} />
              게스트 정원 3명
            </div>
            <div className="flex items-center gap-4 border-b py-6 text-shade-02">
              <PiDog size={25} />
              반려동물 동반 가능
            </div>
            <div className="flex items-center gap-4 border-b py-6 text-shade-02">
              <BsCamera size={25} />
              상업적 사진 촬영 가능
            </div>
            <div className="flex items-center gap-4 py-6 text-shade-02">
              <PiCigarette size={25} />
              흡연 가능
            </div>
          </div>
        </section>
      </section>
    </Modal>
  );
}
