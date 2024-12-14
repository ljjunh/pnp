import Link from 'next/link';
import Button from '@/components/common/Button/Button';
import { ROUTES } from '@/constants/routeURL';
import { IoIosArrowForward, IoIosStar } from 'react-icons/io';
import { IoEarthOutline } from 'react-icons/io5';

export default function RoomHost() {
  return (
    <div className="border-b pb-12">
      <h2 className="mb-6 text-2xl">호스트 소개</h2>
      <div className="flex gap-20">
        <div className="flex flex-col justify-between">
          <Link
            href={ROUTES.HOME}
            className="flex items-center gap-20 rounded-3xl py-4 pl-12 pr-8 shadow-2xl"
          >
            <div>
              <div className="h-24 w-24 rounded-full bg-black"></div>
              <div className="mt-2 flex flex-col text-center">
                <div className="text-2xl font-semibold">John</div>
                <div className="text-sm">호스트</div>
              </div>
            </div>
            <div>
              <div className="flex flex-col py-2 pr-20">
                <div className="text-xs">후기</div>
                <div className="flex items-baseline">
                  <div className="text-xl font-semibold">293</div>
                  <div className="text-[10px]">개</div>
                </div>
              </div>
              <hr />
              <div className="flex flex-col py-2 pr-20">
                <div className="text-xs">평점</div>
                <div className="flex items-baseline">
                  <div className="text-xl font-semibold">4.86</div>
                  <IoIosStar />
                </div>
              </div>
              <hr />
              <div className="flex flex-col py-2 pr-20">
                <div className="text-xs">호스팅 경력</div>
                <div className="flex items-baseline">
                  <div className="text-xl font-semibold">4</div>
                  <div className="text-[10px]">년</div>
                </div>
              </div>
            </div>
          </Link>
          <div className="pt-8">
            <div className="flex items-center gap-3">
              <IoEarthOutline size={22} />
              거주지: Lipa, 필리핀
            </div>
            <Link
              href={ROUTES.HOME}
              className="mt-2 flex items-center text-shade-02 underline hover:text-black"
            >
              더 보기
              <IoIosArrowForward />
            </Link>
          </div>
        </div>
        <div>
          <div className="border-b">
            <div className="text-lg font-semibold">호스트 상세 정보</div>
            <div className="mt-2 text-shade-02">응답률: 100%</div>
            <div className="text-shade-02">1시간 이내에 응답</div>
            <div className="my-8">
              <Button variant="secondary">호스트에게 메시지 보내기</Button>
            </div>
          </div>
          <div className="py-7 text-sm text-shade-02">
            안전한 결제를 위해 웹사이트나 앱 외부에서 송금하거나 대화를 나누지 마세요.
          </div>
        </div>
      </div>
    </div>
  );
}
