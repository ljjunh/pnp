import { redirect } from 'next/navigation';

export default function RoomReviewPage({ params }: { params: { id: string } }) {
  redirect(`/rooms/${params.id}`);
}
