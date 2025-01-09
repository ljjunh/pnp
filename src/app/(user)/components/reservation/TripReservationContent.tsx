import { BackBtn } from '@/app/(user)/components/BackBtn';
import { CustomerSupport } from '@/app/(user)/components/reservation/CustomerSupport';
import { HostInformation } from '@/app/(user)/components/reservation/HostInformation';
import { PaymentInformation } from '@/app/(user)/components/reservation/PaymentInformation';
import { ReservationDetailInformation } from '@/app/(user)/components/reservation/ReservationDetailInformation';
import { RoomRules } from '@/app/(user)/components/reservation/RoomRules';
import { TripRoomInformation } from '@/app/(user)/components/reservation/TripRoomInformation';
import { Reservation } from '@/types/reservation';
import { formatDate } from '@/utils/formatDate';
import { formatTime } from '@/utils/formatTime';
import { ROUTES } from '@/constants/routeURL';

export default function TripReservationContent({ reservation }: { reservation: Reservation }) {
  return (
    <div className="flex h-full flex-col gap-3 overflow-y-scroll rounded-lg bg-white shadow-lg">
      {/* 뒤로 가기 버튼 */}
      <div className="flex px-2 pt-3">
        <BackBtn url={ROUTES.USER.TRIPS} />
      </div>
      {/* 객실 정보 */}
      <TripRoomInformation
        hostName={reservation.room.host.user.name}
        checkIn={formatDate(reservation.checkIn, { showDay: true })}
        checkInTime={formatTime(reservation.checkIn)}
        checkOut={formatDate(reservation.checkOut, { showDay: true })}
        checkOutTime={formatTime(reservation.checkOut)}
        title={reservation.room.title}
        images={reservation.room.images}
        roomId={reservation.roomId}
      />

      <div className="border-b-8" />

      {/* 예약 상세 정보 */}
      <ReservationDetailInformation
        guestNumber={reservation.guestNumber}
        orderNumber={reservation.orderNumber}
        checkIn={formatDate(reservation.checkIn)}
        checkOut={formatDate(reservation.checkOut)}
      />

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
