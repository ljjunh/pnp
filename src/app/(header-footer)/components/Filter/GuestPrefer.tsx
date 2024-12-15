import { TbLaurelWreath } from 'react-icons/tb';

export default function GuestPrefer() {
  return (
    <div className="px-6 py-8">
      <div className="pb-4">
        <span className="text-lg font-semibold">돋보이는 숙소</span>
      </div>
      <div className="flex cursor-pointer flex-row items-center space-x-5 rounded-xl border border-neutral-03 px-5 py-2 hover:border-black">
        <TbLaurelWreath size={36} />
        <div className="flex flex-col space-y-1">
          <span className="text-base font-semibold">게스트 선호</span>
          <span className="text-sm text-neutral-07">
            에어비앤비에서 가장 사랑받는 숙소를 소개합니다.
          </span>
        </div>
      </div>
    </div>
  );
}
