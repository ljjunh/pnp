import Image from 'next/image';

export function WishlistCard() {
  return (
    <div>
      <div className="relative aspect-square">
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
      <div className="mt-2 w-full rounded-xl bg-gray-100 p-3">
        <p className="cursor-pointer text-sm underline">메모 추가</p>
      </div>
    </div>
  );
}
