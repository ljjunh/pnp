import { CustomerSupport } from '@/app/(user)/components/reservation/CustomerSupport';
import { HostInformation } from '@/app/(user)/components/reservation/HostInformation';
import { PaymentInformation } from '@/app/(user)/components/reservation/PaymentInformation';
import { ReservationDetailInformation } from '@/app/(user)/components/reservation/ReservationDetailInformation';
import { RoomInformation } from '@/app/(user)/components/reservation/RoomInformation';
import { RoomRules } from '@/app/(user)/components/reservation/RoomRules';

export function ReservationContent() {
  return (
    <div className="flex flex-1 flex-col gap-3 overflow-y-scroll px-2">
      {/* 객실 정보 */}
      <RoomInformation />

      <div className="border-b-8" />

      {/* 예약 상세 정보 */}
      <ReservationDetailInformation />

      <div className="border-b-8" />

      {/* 이용 규칙 */}
      <RoomRules />

      <div className="border-b-8" />

      {/* 호스트 정보 */}
      <HostInformation />

      <div className="border-b-8" />

      {/* 결제 정보 */}
      <PaymentInformation />

      <div className="border-b-8" />

      {/* 고객 지원 */}
      <CustomerSupport />
    </div>
  );
}
