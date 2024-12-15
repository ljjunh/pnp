import Filter from '@/app/(header-footer)/components/Filter';
import RoomList from '@/app/(header-footer)/components/RoomList';

export default async function Home() {
  return (
    <>
      <Filter />
      <RoomList />
    </>
  );
}
