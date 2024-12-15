import { redirect } from 'next/navigation';

export default function SafetyPage({ params }: { params: { id: string } }) {
  redirect(`/rooms/${params.id}`);
}
