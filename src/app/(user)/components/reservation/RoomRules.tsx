import { BsHouseExclamation } from 'react-icons/bs';
import { IoIosArrowForward } from 'react-icons/io';

export function RoomRules() {
  return (
    <div className="flex flex-col gap-5 px-4">
      <h2 className="text-xl font-medium">숙소 이용 규칙 및 안내</h2>
      <div>
        <h3 className="font-bold">숙소 이용규칙</h3>
        <p>셀프 체크인:스마트 도어록</p>
        <p>게스트 정원 1명</p>
        <p>반려동물 동반 불가</p>
        <p className="cursor-pointer underline">더 보기</p>
      </div>
      <div className="-mx-4 px-4 hover:bg-gray-100">
        <hr />
        <button
          className="w-full py-3"
          aria-label="숙소 상세 보기"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <BsHouseExclamation />
              <p>숙소 보기</p>
            </div>
            <IoIosArrowForward />
          </div>
        </button>
      </div>
    </div>
  );
}
