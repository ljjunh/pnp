import Image from "next/image";

export function RecentlyViewedCard() {
  return (
    <div
      className="flex w-full flex-col gap-2"
    >
      <div className="aspect-square w-full rounded-2xl p-1 shadow-[0_0_10px_rgba(0,0,0,0.1)]">
        <div className="relative h-full w-full cursor-pointer">
          <Image
            src="/images/01.avif"
            alt="숙소 사진"
            fill
            className="rounded-2xl object-cover"
          />
        </div>
      </div>
      <div>
        <h3 className="text-base">최근 조회</h3>
        <p className="text-sm text-gray-400">오늘</p>
      </div>
    </div>
  );
}
