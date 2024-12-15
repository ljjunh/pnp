import { redirect } from 'next/navigation';

export default function HouseRulesPage({ params }: { params: { id: string } }) {
  redirect(`/rooms/${params.id}`);
}
