import Image from 'next/image';

export function AllMessageListItem () {
  return (
    <li className="flex w-full gap-5 rounded-md bg-gray-100 px-3 py-3 pb-4 text-sm text-gray-400">
    <div className="relative h-14 w-14 shrink-0">
      <div className="relative h-full w-full">
        <Image
          src="/images/05.avif"
          alt="room"
          fill
          className="rounded-md object-cover"
        />
        <div className="absolute -bottom-3 -right-3 h-10 w-10">
          <Image
            src="/images/05.avif"
            alt="profile"
            fill
            className="rounded-full border-2 border-white object-cover"
          />
        </div>
      </div>
    </div>
    <div className="flex flex-1 flex-col">
      <div className="flex justify-between">
        <p>호스트 이름</p>
        <p>0000.00.00.</p>
      </div>
      <div>에어비앤비 업데이트</div>
      <div>0000년 0월 00일 ~ 00일</div>
    </div>
  </li>
  )
}