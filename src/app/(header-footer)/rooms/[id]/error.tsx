'use client';

export default function RoomError({ error }: { error: Error }) {
  return <div>{error.message}</div>;
}
