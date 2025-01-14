'use client';

import useGetRoomId from '@/hooks/useGetRoomId';

export default function RoomRegisterButton() {
  const { getRoomId } = useGetRoomId();

  return (
    <button
      className="rounded-lg border-[1.5px] border-black px-4 py-2 text-lg hover:bg-neutral-02"
      onClick={getRoomId}
    >
      숙소 등록 완료하기
    </button>
  );
}
