import PriceInfoModal from '@/app/host/[roomId]/price/components/PriceInfoModal';
import PriceInput from '@/app/host/[roomId]/price/components/PriceInput';
import ModalProvider from '@/components/common/ModalProvider/ModalProvider';
import { MODAL_ID } from '@/constants/modal';

export default function Price() {
  return (
    <div className="flex h-full w-full flex-col items-start justify-center px-80">
      <p className="mb-4 text-3xl font-semibold">이제 기본 요금을 설정하세요</p>
      <span className="text-lg text-neutral-07">기본 요금은 수정할 수 있습니다.</span>
      <PriceInput />
      <ModalProvider modalId={MODAL_ID.ROOM_PRICE_INFO}>
        <PriceInfoModal />
      </ModalProvider>
      <input
        type="hidden"
        name="step"
        value="price"
      />
    </div>
  );
}
