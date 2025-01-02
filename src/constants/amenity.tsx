import Image from 'next/image';

type RoomListType = {
  [key: string]: {
    icon: JSX.Element;
    name: string;
  };
};

export const ESSENTIAL_AMENITIES: string[] = [
  'SYSTEM_WI_FI',
  'SYSTEM_COOKING_BASICS',
  'SYSTEM_WASHER',
  'SYSTEM_DRYER',
  'SYSTEM_SNOWFLAKE',
  'SYSTEM_THERMOMETER',
  'SYSTEM_WORKSPACE',
  'SYSTEM_TV',
  'SYSTEM_HAIRDRYER',
  'SYSTEM_IRON',
];

export const CHARACTERISTIC_AMENITIES: string[] = [
  'SYSTEM_POOL',
  'SYSTEM_JACUZZI',
  'SYSTEM_MAPS_CAR_RENTAL',
  'SYSTEM_EV_CHARGER',
  'SYSTEM_CRIB',
  'SYSTEM_CALENDAR', // kingsize bed 인데 일단 없어서 이거 넣어둠
  'SYSTEM_GYM',
  'SYSTEM_GRILL',
  'SYSTEM_BREAKFAST',
  'SYSTEM_FIREPLACE',
  'SYSTEM_SMOKING_ALLOWED',
];

export const LOCATION_AMENITIES: string[] = ['SYSTEM_BEACH', 'SYSTEM_VIEW_OCEAN'];

export const SAFETY_AMENITIES: string[] = ['SYSTEM_DETECTOR_SMOKE', 'SYSTEM_DETECTOR_CO'];

export const RESERVATION: string[] = ['SYSTEM_BUZZER', 'SYSTEM_KEY', 'SYSTEM_PETS'];

export const TAG_LIST: RoomListType = {
  SYSTEM_WI_FI: {
    icon: (
      <Image
        src="/icons/SYSTEM_WI_FI.svg"
        alt="와이파이"
        width={24}
        height={24}
      />
    ),
    name: '와이파이',
  },
  SYSTEM_COOKING_BASICS: {
    icon: (
      <Image
        src="/icons/SYSTEM_COOKING_BASICS.svg"
        alt="와이파이"
        width={24}
        height={24}
      />
    ),
    name: '주방',
  },
  SYSTEM_WASHER: {
    icon: (
      <Image
        src="/icons/SYSTEM_WASHER.svg"
        alt="와이파이"
        width={24}
        height={24}
      />
    ),
    name: '세탁기',
  },
  SYSTEM_DRYER: {
    icon: (
      <Image
        src="/icons/SYSTEM_DRYER.svg"
        alt="와이파이"
        width={24}
        height={24}
      />
    ),
    name: '건조기',
  },
  SYSTEM_SNOWFLAKE: {
    icon: (
      <Image
        src="/icons/SYSTEM_SNOWFLAKE.svg"
        alt="와이파이"
        width={24}
        height={24}
      />
    ),
    name: '에어컨',
  },
  SYSTEM_THERMOMETER: {
    icon: (
      <Image
        src="/icons/SYSTEM_THERMOMETER.svg"
        alt="와이파이"
        width={24}
        height={24}
      />
    ),
    name: '난방',
  },
  SYSTEM_WORKSPACE: {
    icon: (
      <Image
        src="/icons/SYSTEM_WORKSPACE.svg"
        alt="와이파이"
        width={24}
        height={24}
      />
    ),
    name: '업무 전용 공간',
  },
  SYSTEM_TV: {
    icon: (
      <Image
        src="/icons/SYSTEM_TV.svg"
        alt="와이파이"
        width={24}
        height={24}
      />
    ),
    name: 'TV',
  },
  SYSTEM_HAIRDRYER: {
    icon: (
      <Image
        src="/icons/SYSTEM_HAIRDRYER.svg"
        alt="와이파이"
        width={24}
        height={24}
      />
    ),
    name: '헤어드라이어',
  },
  SYSTEM_IRON: {
    icon: (
      <Image
        src="/icons/SYSTEM_IRON.svg"
        alt="와이파이"
        width={24}
        height={24}
      />
    ),
    name: '다리미',
  },
  SYSTEM_POOL: {
    icon: (
      <Image
        src="/icons/SYSTEM_POOL.svg"
        alt="와이파이"
        width={24}
        height={24}
      />
    ),
    name: '수영장',
  },
  SYSTEM_JACUZZI: {
    icon: (
      <Image
        src="/icons/SYSTEM_JACUZZI.svg"
        alt="와이파이"
        width={24}
        height={24}
      />
    ),
    name: '대형 욕조',
  },
  SYSTEM_MAPS_CAR_RENTAL: {
    icon: (
      <Image
        src="/icons/SYSTEM_MAPS_CAR_RENTAL.svg"
        alt="와이파이"
        width={24}
        height={24}
      />
    ),
    name: '무료 주차 공간',
  },
  SYSTEM_EV_CHARGER: {
    icon: (
      <Image
        src="/icons/SYSTEM_EV_CHARGER.svg"
        alt="와이파이"
        width={24}
        height={24}
      />
    ),
    name: '전기차 충전시설',
  },
  SYSTEM_CRIB: {
    icon: (
      <Image
        src="/icons/SYSTEM_CRIB.svg"
        alt="와이파이"
        width={24}
        height={24}
      />
    ),
    name: '아기 침대',
  },
  SYSTEM_CALENDAR: {
    icon: (
      <Image
        src="/icons/SYSTEM_CALENDAR.svg"
        alt="와이파이"
        width={24}
        height={24}
      />
    ),
    name: '킹사이즈 침대',
  },
  SYSTEM_GYM: {
    icon: (
      <Image
        src="/icons/SYSTEM_GYM.svg"
        alt="와이파이"
        width={24}
        height={24}
      />
    ),
    name: '헬스장',
  },
  SYSTEM_GRILL: {
    icon: (
      <Image
        src="/icons/SYSTEM_GRILL.svg"
        alt="와이파이"
        width={24}
        height={24}
      />
    ),
    name: '바베큐 시설',
  },
  SYSTEM_BREAKFAST: {
    icon: (
      <Image
        src="/icons/SYSTEM_BREAKFAST.svg"
        alt="와이파이"
        width={24}
        height={24}
      />
    ),
    name: '조식',
  },
  SYSTEM_FIREPLACE: {
    icon: (
      <Image
        src="/icons/SYSTEM_FIREPLACE.svg"
        alt="와이파이"
        width={24}
        height={24}
      />
    ),
    name: '벽난로',
  },
  SYSTEM_SMOKING_ALLOWED: {
    icon: (
      <Image
        src="/icons/SYSTEM_SMOKING_ALLOWED.svg"
        alt="와이파이"
        width={24}
        height={24}
      />
    ),
    name: '흡연 가능',
  },
  SYSTEM_BEACH: {
    icon: (
      <Image
        src="/icons/SYSTEM_BEACH.svg"
        alt="와이파이"
        width={24}
        height={24}
      />
    ),
    name: '해변에 인접',
  },
  SYSTEM_VIEW_OCEAN: {
    icon: (
      <Image
        src="/icons/SYSTEM_VIEW_OCEAN.svg"
        alt="와이파이"
        width={24}
        height={24}
      />
    ),
    name: '수변',
  },
  SYSTEM_DETECTOR_SMOKE: {
    icon: (
      <Image
        src="/icons/SYSTEM_DETECTOR_SMOKE.svg"
        alt="와이파이"
        width={24}
        height={24}
      />
    ),
    name: '화재경보기',
  },
  SYSTEM_DETECTOR_CO: {
    icon: (
      <Image
        src="/icons/SYSTEM_DETECTOR_CO.svg"
        alt="와이파이"
        width={24}
        height={24}
      />
    ),
    name: '일산화탄소 경보기',
  },
  SYSTEM_BUZZER: {
    icon: (
      <Image
        src="/icons/SYSTEM_BUZZER.svg"
        alt="와이파이"
        width={24}
        height={24}
      />
    ),
    name: '디지털 도어록',
  },
  SYSTEM_KEY: {
    icon: (
      <Image
        src="/icons/SYSTEM_KEY.svg"
        alt="와이파이"
        width={24}
        height={24}
      />
    ),
    name: '셀프 체크인',
  },
  SYSTEM_PETS: {
    icon: (
      <Image
        src="/icons/SYSTEM_PETS.svg"
        alt="와이파이"
        width={24}
        height={24}
      />
    ),
    name: '반려동물 동반 가능',
  },
};
