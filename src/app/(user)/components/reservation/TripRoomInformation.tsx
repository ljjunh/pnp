import Link from 'next/link';
import { ImageLink, Room } from '@/types/room';
import { User } from '@/types/user';
import RoomCardCarousel from '@/components/common/Card/RoomCardCarousel';
import { ROUTES } from '@/constants/routeURL';
import { BiMessage } from 'react-icons/bi';
import { BsHouseExclamation } from 'react-icons/bs';

interface TripRoomInformationProps {
  hostName: User['name'];
  roomId: Room['id'];
  title: Room['title'];
  images: ImageLink[];
  checkIn: string;
  checkInTime: string;
  checkOut: string;
  checkOutTime: string;
}

export function TripRoomInformation({
  hostName,
  roomId,
  title,
  images,
  checkIn,
  checkInTime,
  checkOut,
  checkOutTime,
}: TripRoomInformationProps) {
  return (
    <>
      <div className="flex flex-col gap-5 px-4">
        <h1 className="text-2xl font-medium">{hostName}님의 숙소</h1>
        <RoomCardCarousel images={images} />
        <div className="flex justify-between text-gray-500">
          <div className="flex-1 border-r">
            <p className="text-black">체크인</p>
            <p>{checkIn}</p>
            <p>{checkInTime}</p>
          </div>
          <div className="flex-1 text-right">
            <p className="text-black">체크아웃</p>
            <p>{checkOut}</p>
            <p>{checkOutTime}</p>
          </div>
        </div>
        <hr />
      </div>

      <Link href={ROUTES.USER.MESSAGES}>
        <div className="flex gap-3 px-4 py-4 hover:bg-gray-100">
          <BiMessage className="size-6" />
          <div className="flex flex-col text-left">
            <h1 className="font-medium">호스트에게 메시지 보내기</h1>
            <p className="line-clamp-1 text-xs text-gray-500">{hostName}</p>
          </div>
        </div>
      </Link>

      <Link href={ROUTES.ROOMS.DETAIL(roomId)}>
        <div className="flex gap-3 px-4 py-4 hover:bg-gray-100">
          <BsHouseExclamation className="size-6" />
          <div className="flex flex-col text-left">
            <h1 className="font-medium">숙소</h1>
            <p className="line-clamp-1 text-xs text-gray-500">{title}</p>
          </div>
        </div>
      </Link>
    </>
  );
}
