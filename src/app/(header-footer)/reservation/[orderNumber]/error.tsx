'use client';

export default function ReservationError({ error }: { error: Error }) {
  return <div>{error.message}</div>;
}
