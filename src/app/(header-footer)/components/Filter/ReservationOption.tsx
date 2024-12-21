import Tag from './Tag';

const reservation = ['digital', 'selfCheckIn', 'pet'];

export default function ReservationOption() {
  return (
    <div className="px-6 py-8">
      <div className="pb-4">
        <span className="text-lg font-semibold">예약 옵션</span>
      </div>
      <div className="flex flex-wrap gap-3">
        {reservation.map((option, index) => (
          <Tag
            tag={option}
            key={`${option}-${index}`}
          />
        ))}
      </div>
    </div>
  );
}
