import { FaAirbnb } from 'react-icons/fa';
import { IoIosArrowForward } from 'react-icons/io';
import { IoIosHelpCircle } from 'react-icons/io';

export function CustomerSupport() {
  return (
    <div className="flex flex-col gap-2 px-4 pb-5 pt-3">
      <div>
        <h2 className="text-xl font-medium">언제든 도움을 받으세요</h2>
        <p className="text-sm">도움이 필요하세요? 전 세계 어디서든 연중무휴로 지원해드립니다.</p>
      </div>
      <div>
        <div className="-mx-4 px-4 hover:bg-gray-100">
          <button className="w-full py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <FaAirbnb />
                <p>에어비앤비 고객지원 팀에 연락하기</p>
              </div>
              <IoIosArrowForward />
            </div>
          </button>
          <hr />
        </div>
        <div className="-mx-4 px-4 hover:bg-gray-100">
          <button className="w-full py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <IoIosHelpCircle />
                <p>도움말 센터 방문하기</p>
              </div>
              <IoIosArrowForward />
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
