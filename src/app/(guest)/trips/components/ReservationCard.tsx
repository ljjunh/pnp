import Image from 'next/image';

export function ReservationCard() {
  return (
    <li className="flex cursor-pointer gap-3">
      <div className="relative w-20">
        <Image
          src="/images/05.avif"
          alt="숙소 이미지"
          fill
          className="rounded-lg object-cover"
        />
      </div>
      <div className="flex flex-col gap-1 text-neutral-400">
        <p className="font-medium text-black">Hwaseong-si</p>
        <p>호스트:Urbanstay님</p>
        <p>2024년 01월 01일 ~ 2024년 01월 03일</p>
      </div>
    </li>
  );
}
