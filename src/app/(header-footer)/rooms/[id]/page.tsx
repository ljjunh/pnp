import RoomBookingCard from '@/app/(header-footer)/rooms/[id]/components/booking/RoomBookingCard';
import RoomGallery from '@/app/(header-footer)/rooms/[id]/components/header/RoomGallery';
import RoomHeader from '@/app/(header-footer)/rooms/[id]/components/header/RoomHeader';
import RoomAmenities from '@/app/(header-footer)/rooms/[id]/components/information/RoomAmenities';
import RoomDescription from '@/app/(header-footer)/rooms/[id]/components/information/RoomDescription';
import RoomHost from '@/app/(header-footer)/rooms/[id]/components/information/RoomHost';
import RoomLocation from '@/app/(header-footer)/rooms/[id]/components/information/RoomLocation';
import RoomRules from '@/app/(header-footer)/rooms/[id]/components/information/RoomRules';
import RoomReviewList from '@/app/(header-footer)/rooms/[id]/components/review/RoomReviewList';
import { getRoom, getRoomAvailable } from '@/apis/rooms/queries';

export default async function RoomDetailPage({ params }: { params: { id: string } }) {
  const [room, availableDates] = await Promise.all([
    getRoom(Number(params.id)),
    getRoomAvailable(Number(params.id)),
  ]);

  return (
    <div className="pt-6">
      <RoomHeader
        title={room.title}
        roomId={room.id}
      />
      <RoomGallery images={room.images.slice(0, 5)} />
      <section className="grid grid-cols-5 gap-28 border-b border-neutral-04 pb-12">
        <div className="col-span-3">
          <RoomDescription
            location={room.location}
            roomTags={room.roomTags}
            description={room.description}
            host={room.host}
            reviewsCount={room.reviewsCount}
            reviewsAverage={room.reviewsAverage}
            amenities={room.amenities}
            roomId={room.id}
          />
        </div>
        <div className="relative col-span-2">
          <div className="sticky top-28">
            <RoomBookingCard
              price={room.price}
              roomId={room.id}
              availableDates={availableDates}
            />
          </div>
        </div>
      </section>
      <RoomLocation
        lat={room.latitude}
        lng={room.longitude}
        location={room.location}
      />
      <RoomReviewList
        roomId={room.id}
        reviewsCount={room.reviewsCount}
        reviewsAverage={room.reviewsAverage}
      />
      <RoomAmenities amenities={room.amenities} />
      <RoomHost host={room.host} />
      <RoomRules
        checkIn={room.checkIn}
        checkOut={room.checkOut}
        rules={room.rules}
        checkInType={room.checkInType}
        amenities={room.amenities}
      />
    </div>
  );
}
