import RoomCancellationModalButton from '@/app/(header-footer)/rooms/[id]/components/information/RoomCancellationModalButton';
import RoomRulesModalButton from '@/app/(header-footer)/rooms/[id]/components/information/RoomRulesModalButton';
import RoomSafetyModalButton from '@/app/(header-footer)/rooms/[id]/components/information/RoomSafetyModalButton';
import { Room } from '@/types/room';
import { RuleSchema } from '@/types/table';

interface RoomRulesProps {
  checkIn: Room['checkIn'];
  checkOut: Room['checkOut'];
  rules: Room['rules'];
  checkInType: Room['checkInType'];
  amenities: Room['amenities'];
}

export default function RoomRules({
  checkIn,
  checkOut,
  rules,
  checkInType,
  amenities,
}: RoomRulesProps) {
  const guestCapacityRule: RuleSchema | undefined = rules.find((rule) =>
    rule.title.includes('게스트 정원'),
  );
  const safetyAmenities: Room['amenities'] = amenities.filter(
    (amenity) => amenity.category === '숙소 안전',
  );

  return (
    <div className="py-12">
      <h2 className="pb-6 text-2xl">알아두어야 할 사항</h2>
      <div className="grid grid-cols-3">
        <div className="col-span-1 flex flex-col">
          <span className="pb-3">숙소 이용 규칙</span>
          <span className="pb-4 text-shade-02">체크인 가능 시간: {checkIn} 이후</span>
          <span className="pb-4 text-shade-02">체크아웃 시간: {checkOut} 전까지</span>
          <span className="pb-4 text-shade-02">{guestCapacityRule?.title}</span>
          <RoomRulesModalButton
            checkIn={checkIn}
            checkOut={checkOut}
            checkInType={checkInType}
            rules={rules}
          />
        </div>
        <div className="col-span-1 flex flex-col">
          <span className="pb-3">안전 및 숙소</span>
          {safetyAmenities.slice(0, 3).map((amenity) => (
            <span
              key={amenity.id}
              className="pb-4 text-shade-02"
            >
              {amenity.title} {amenity.available ? '있음' : '없음'}
            </span>
          ))}
          <RoomSafetyModalButton safetyAmenities={safetyAmenities} />
        </div>
        <div className="col-span-1 flex flex-col">
          <span className="pb-3">환불 정책</span>
          <span className="pb-4 text-shade-02">
            예약 당일까지 무료 취소가 가능합니다. 체크인 전에 취소하면 부분 환불을 받으실 수
            있습니다.
          </span>
          <span className="pb-4 text-shade-02">
            자세한 내용은 호스트의 환불 정책 전문을 참고하세요.
          </span>
          <RoomCancellationModalButton />
        </div>
      </div>
    </div>
  );
}
