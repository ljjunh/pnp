import { redirect } from 'next/navigation';

export default function CancellationPage({ params }: { params: { id: number } }) {
  redirect(`/rooms/${params.id}`);
}
