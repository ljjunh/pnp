import RoomBookingCard from '@/app/(header-footer)/rooms/[id]/components/booking/RoomBookingCard';
import RoomGallery from '@/app/(header-footer)/rooms/[id]/components/header/RoomGallery';
import RoomHeader from '@/app/(header-footer)/rooms/[id]/components/header/RoomHeader';
import RoomAmenities from '@/app/(header-footer)/rooms/[id]/components/information/RoomAmenities';
import RoomDescription from '@/app/(header-footer)/rooms/[id]/components/information/RoomDescription';
import RoomHost from '@/app/(header-footer)/rooms/[id]/components/information/RoomHost';
import RoomLocation from '@/app/(header-footer)/rooms/[id]/components/information/RoomLocation';
import RoomRules from '@/app/(header-footer)/rooms/[id]/components/information/RoomRules';
import RoomReviewList from '@/app/(header-footer)/rooms/[id]/components/review/RoomReviewList';
import { Room } from '@/types/room';
import { getRoom } from '@/apis/rooms/queries';

export default async function RoomDetailPage({ params }: { params: { id: string } }) {
  const room: Room = await getRoom(Number(params.id));

  return (
    <div className="pt-6">
      <RoomHeader title={room.title} />
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
          />
        </div>
        <div className="relative col-span-2">
          <div className="sticky top-28">
            <RoomBookingCard price={room.price} />
          </div>
        </div>
      </section>
      <RoomLocation
        lat={room.latitude}
        lng={room.longitude}
        location={room.location}
      />
      <RoomReviewList
        id={Number(params.id)}
        reviewsCount={room.reviewsCount}
        reviewsAverage={room.reviewsAverage}
      />
      <RoomAmenities amenities={room.amenities} />
      <RoomHost host={room.host} />
      <RoomRules
        id={Number(params.id)}
        checkIn={room.checkIn}
        checkOut={room.checkOut}
        rules={room.rules}
      />
    </div>
  );
}
