import RoomGallery from '@/app/(header-footer)/rooms/[id]/components/header/RoomGallery';
import RoomHeader from '@/app/(header-footer)/rooms/[id]/components/header/RoomHeader';

export default function RoomDetailPage({ params }: { params: { id: string } }) {
  return (
    <div className="pt-6">
      <RoomHeader title={'한옥독채/거실겸큰방1/작은방1/설악해변도보3분/낙산사/설악산'} />
      <RoomGallery />
    </div>
  );
}
