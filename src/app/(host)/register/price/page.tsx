import ModalProvider from '@/components/common/ModalProvider/ModalProvider';
import { MODAL_ID } from '@/constants/modal';
import PriceInfoModal from './components/PriceInfoModal';
import PriceInput from './components/PriceInput';

export default function Price() {
  return (
    <div className="flex h-full w-full flex-col items-start justify-center px-80">
      <p className="mb-4 text-3xl font-semibold">이제 주중 기본 요금을 설정하세요</p>
      <span className="text-lg text-neutral-07">
        제안 요금은 ₩65,629입니다. 다음 단계에서 주⁠말 요⁠금⁠을 설⁠정⁠합⁠니⁠다⁠.
      </span>
      <PriceInput initPrice={65629} />
      <ModalProvider modalId={MODAL_ID.ROOM_PRICE_INFO}>
        <PriceInfoModal />
      </ModalProvider>
    </div>
  );
}
