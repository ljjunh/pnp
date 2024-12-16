import Image from 'next/image';
import Link from 'next/link';
import { Room } from '@/types/room';
import Button from '@/components/common/Button/Button';
import { formatElapsedTime } from '@/utils/formatElapsedTime';
import { ROUTES } from '@/constants/routeURL';
import { IoIosArrowForward, IoIosStar } from 'react-icons/io';

interface RoomHostProps {
  host: Room['host'];
}

export default function RoomHost({ host }: RoomHostProps) {
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
              <div className="relative h-24 w-24 rounded-full bg-black">
                {host.user.image && (
                  <Image
                    src={host.user.image}
                    fill
                    alt={'호스트 프로필 이미지'}
                    className="rounded-full object-cover"
                  />
                )}
              </div>
              <div className="mt-2 flex flex-col text-center">
                <div className="text-2xl font-semibold">{host.user.name}</div>
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
                <div className="text-xl font-semibold">
                  {formatElapsedTime(new Date(host.hostStartedAt))}
                </div>
              </div>
            </div>
          </Link>
          <div className="pt-8">
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
            <div className="mb-2 text-lg font-semibold">호스트 상세 정보</div>
            {host.hostTags.map((tag) => (
              <div
                key={tag.content}
                className="text-shade-02"
              >
                {tag.content}
              </div>
            ))}
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
