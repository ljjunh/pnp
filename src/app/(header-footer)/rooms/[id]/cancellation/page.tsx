import { redirect } from 'next/navigation';

export default function CancellationPage({ params }: { params: { id: string } }) {
  redirect(`/rooms/${params.id}`);
}
