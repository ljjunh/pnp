import Modal from '@/components/common/Modal/Modal';
import { GrSteps } from 'react-icons/gr';
import { PiProhibit, PiSwimmingPoolFill, PiWarning } from 'react-icons/pi';

export default function SafetyModal() {
  return (
    <Modal>
      <section className="mb-6 w-[732px] pt-10">
        <h1 className="mb-4 mt-2 text-2xl">안전 및 숙소</h1>
        <p className="mb-8 text-shade-02">
          나중에 당황하는 일이 없도록 호스트 숙소에 대한 중요 정보를 미리 확인하세요.
        </p>
        <section>
          <div className="mb-2">
            <h2 className="py-4 text-lg">안전 관련 사항</h2>
            <div className="flex items-center gap-4 border-b py-6 text-shade-02">
              <PiSwimmingPoolFill size={25} />
              출입이 제한되지 않는 수영장/대형 욕조
            </div>
            <div className="flex items-center gap-4 py-6 text-shade-02">
              <PiWarning size={25} />
              난간이나 보호 장치가 없는 높은 곳
            </div>
          </div>
          <div className="mb-2">
            <h2 className="py-4 text-lg">안전 장치</h2>
            <div className="flex items-center gap-4 border-b py-6 text-shade-02">
              <PiProhibit size={25} />
              일산화탄소 경보기 없음
            </div>
            <div className="flex items-center gap-4 py-6 text-shade-02">
              <PiProhibit size={25} />
              화재경보기 없음
            </div>
          </div>
          <div>
            <h2 className="py-4 text-lg">숙소 정보</h2>
            <div className="flex items-center gap-4 py-6 text-shade-02">
              <GrSteps size={25} />
              계단을 올라가야 함
            </div>
          </div>
        </section>
      </section>
    </Modal>
  );
}
