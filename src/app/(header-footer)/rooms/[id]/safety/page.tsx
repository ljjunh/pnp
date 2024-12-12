import { redirect } from 'next/navigation';

export default function SafetyPage({ params }: { params: { id: number } }) {
  redirect(`/rooms/${params.id}`);
}
