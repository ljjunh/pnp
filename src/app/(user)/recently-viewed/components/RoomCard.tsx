import Image from 'next/image';

interface RoomCardProps {
  isEdit: boolean;
}

export function RoomCard({ isEdit }: RoomCardProps) {
  return (
    <div>
      <div className="relative aspect-square">
        {isEdit === true && (
          <div className="absolute left-3 top-3 z-10 cursor-pointer rounded-full bg-slate-50 px-2 shadow-lg hover:scale-105 hover:bg-white">
            <span>&times;</span>
          </div>
        )}
        <Image
          src="/images/05.avif"
          alt="숙소 사진"
          fill
          className="rounded-2xl object-cover"
        />
      </div>
      <div className="mt-2">
        <h3 className="text-base">호스트 이름의 집</h3>
        <p className="text-sm text-neutral-500">침대 1개 ㆍ 침실 1개</p>
      </div>
    </div>
  );
}
