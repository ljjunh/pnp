import { redirect } from 'next/navigation';

export default function HouseRulesPage({ params }: { params: { id: number } }) {
  redirect(`/rooms/${params.id}`);
}
