import { Reservation } from '@/types/reservation';
import { IoIosArrowForward } from 'react-icons/io';
import { TbReceiptFilled } from 'react-icons/tb';

interface PaymentInformationProps {
  totalPrice: Reservation['totalPrice'];
}

export function PaymentInformation({ totalPrice }: PaymentInformationProps) {
  return (
    <div className="flex flex-col gap-5 px-4">
      <h2 className="text-xl font-semibold">결제 정보</h2>
      <div>
        <h3 className="font-bold">결제한 금액</h3>
        <p>₩{totalPrice.toLocaleString('ko-KR', { maximumFractionDigits: 2 })}</p>
      </div>
      <div className="-mx-4 px-4 hover:bg-gray-100">
        <hr />
        <button
          type="button"
          className="w-full py-3"
          aria-label="영수증 받기"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <TbReceiptFilled />
              <p>영수증 받기</p>
            </div>
            <IoIosArrowForward />
          </div>
        </button>
      </div>
    </div>
  );
}
