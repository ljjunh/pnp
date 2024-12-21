import { AiOutlineThunderbolt } from 'react-icons/ai';
import { BiSolidDryer } from 'react-icons/bi';
import { BsEvStation } from 'react-icons/bs';
import { CiCircleAlert, CiSquareAlert, CiTempHigh } from 'react-icons/ci';
import { FaWater } from 'react-icons/fa';
import { GoKey } from 'react-icons/go';
import { IoMdTv } from 'react-icons/io';
import { IoBedOutline, IoSnowOutline, IoWifiOutline } from 'react-icons/io5';
import { LiaDumbbellSolid, LiaHotelSolid, LiaSwimmingPoolSolid } from 'react-icons/lia';
import { LuCircleParking, LuWashingMachine } from 'react-icons/lu';
import {
  MdOutlineBathtub,
  MdOutlineBreakfastDining,
  MdOutlineFireplace,
  MdOutlineOutdoorGrill,
  MdOutlinePets,
  MdOutlineTableRestaurant,
} from 'react-icons/md';
import { PiHairDryer, PiHouseLine, PiWarehouse } from 'react-icons/pi';
import { RiHotelBedLine } from 'react-icons/ri';
import { TbBeach, TbIroningSteam, TbSmoking, TbToolsKitchen2 } from 'react-icons/tb';

interface TagListType {
  [key: string]: {
    icon: JSX.Element;
    name: string;
  };
}

const TagList: TagListType = {
  wifi: {
    icon: <IoWifiOutline size={24} />,
    name: '와이파이',
  },
  kitchen: {
    icon: <TbToolsKitchen2 size={24} />,
    name: '주방',
  },
  washingMachine: {
    icon: <LuWashingMachine size={24} />,
    name: '세탁기',
  },
  dryingMachine: {
    icon: <BiSolidDryer size={24} />,
    name: '건조기',
  },
  airConditioner: {
    icon: <IoSnowOutline size={24} />,
    name: '에어컨',
  },
  heating: {
    icon: <CiTempHigh size={24} />,
    name: '난방',
  },
  library: {
    icon: <MdOutlineTableRestaurant size={24} />,
    name: '업무 전용 공간',
  },
  tv: {
    icon: <IoMdTv size={24} />,
    name: 'TV',
  },
  hairDryer: {
    icon: <PiHairDryer size={24} />,
    name: '헤어드라이어',
  },
  iron: {
    icon: <TbIroningSteam size={24} />,
    name: '다리미',
  },
  swimmingPool: {
    icon: <LiaSwimmingPoolSolid size={24} />,
    name: '수영장',
  },
  bath: {
    icon: <MdOutlineBathtub size={24} />,
    name: '대형 욕조',
  },
  parking: {
    icon: <LuCircleParking size={24} />,
    name: '무료 주차 공간',
  },
  eletronic: {
    icon: <BsEvStation size={24} />,
    name: '전기차 충전시설',
  },
  babyBed: {
    icon: <RiHotelBedLine size={24} />,
    name: '아기 침대',
  },
  kingSizeBed: {
    icon: <IoBedOutline size={24} />,
    name: '킹사이즈 침대',
  },
  fitness: {
    icon: <LiaDumbbellSolid size={24} />,
    name: '헬스장',
  },
  barbecue: {
    icon: <MdOutlineOutdoorGrill size={24} />,
    name: '바베큐 시설',
  },
  breakfast: {
    icon: <MdOutlineBreakfastDining size={24} />,
    name: '조식',
  },
  fireplace: {
    icon: <MdOutlineFireplace size={24} />,
    name: '벽난로',
  },
  smoking: {
    icon: <TbSmoking size={24} />,
    name: '흡연 가능',
  },
  beach: {
    icon: <TbBeach size={24} />,
    name: '해변에 인접',
  },
  nearWater: {
    icon: <FaWater size={24} />,
    name: '수변',
  },
  fireAlarm: {
    icon: <CiCircleAlert size={24} />,
    name: '화재경보기',
  },
  carbonMonoxideDetector: {
    icon: <CiSquareAlert size={24} />,
    name: '일산화탄소 경보기',
  },
  digital: {
    icon: <AiOutlineThunderbolt size={24} />,
    name: '디지털 도어록',
  },
  selfCheckIn: {
    icon: <GoKey size={24} />,
    name: '셀프 체크인',
  },
  pet: {
    icon: <MdOutlinePets size={24} />,
    name: '반려동물 동반 가능',
  },
  apartment: {
    icon: <PiHouseLine size={24} />,
    name: '단독 또는 다세대 주택',
  },
  guestHouse: {
    icon: <PiWarehouse size={24} />,
    name: '게스트용 별채',
  },
  hotel: {
    icon: <LiaHotelSolid size={24} />,
    name: '호텔',
  },
};

interface TagProps {
  tag: keyof TagListType;
}

export default function Tag({ tag }: TagProps) {
  return (
    <div className="flex w-fit cursor-pointer items-center justify-center space-x-2 rounded-3xl border border-neutral-03 px-5 py-2.5 hover:border-black">
      {TagList[tag].icon}
      <span className="text-sm">{TagList[tag].name}</span>
    </div>
  );
}
