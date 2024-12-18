import RoomAmenitiesModalButton from '@/app/(header-footer)/rooms/[id]/components/information/RoomAmenitiesModalButton';
import { Room } from '@/types/room';

interface RoomAmenitiesProps {
  amenities: Room['amenities'];
}

export default function RoomAmenities({ amenities }: RoomAmenitiesProps) {
  const availableAmenities = amenities.filter((amenity) => amenity.available === true).slice(0, 10);

  return (
    <section className="border-b border-neutral-04 pb-12">
      <h2 className="text-2xl">숙소 편의시설</h2>
      <div className="grid grid-cols-2 gap-4 py-4 pb-12">
        {availableAmenities.map((amenity) => (
          <div key={amenity.id}>
            <span>{amenity.title}</span>
          </div>
        ))}
      </div>
      <RoomAmenitiesModalButton amenities={amenities} />
    </section>
  );
}
