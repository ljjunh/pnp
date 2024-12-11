import RoomList from '@/app/(header-footer)/components/RoomList';
import { auth } from '@/auth';

export default async function Home() {
  const session = await auth();
  console.log(session);
  return <RoomList />;
}
