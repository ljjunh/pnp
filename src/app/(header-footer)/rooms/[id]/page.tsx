import RoomBookingCard from '@/app/(header-footer)/rooms/[id]/components/booking/RoomBookingCard';
import RoomGallery from '@/app/(header-footer)/rooms/[id]/components/header/RoomGallery';
import RoomHeader from '@/app/(header-footer)/rooms/[id]/components/header/RoomHeader';
import RoomDescription from '@/app/(header-footer)/rooms/[id]/components/information/RoomDescription';
import RoomRules from '@/app/(header-footer)/rooms/[id]/components/information/RoomRules';
import RoomReviewList from '@/app/(header-footer)/rooms/[id]/components/review/RoomReviewList';
import RoomReviewSummary from '@/app/(header-footer)/rooms/[id]/components/review/RoomReviewSummary';

export default function RoomDetailPage({ params }: { params: { id: number } }) {
  return (
    <div className="pt-6">
      <RoomHeader title={'한옥독채/거실겸큰방1/작은방1/설악해변도보3분/낙산사/설악산'} />
      <RoomGallery />
      <section className="grid grid-cols-5 gap-28">
        <div className="col-span-3">
          <RoomDescription />
        </div>
        <div className="relative col-span-2">
          <div className="sticky top-28">
            <RoomBookingCard />
          </div>
        </div>
      </section>
      <section className="my-12">
        <RoomReviewSummary />
        <RoomReviewList />
      </section>
      <RoomRules id={params.id} />
    </div>
  );
}
