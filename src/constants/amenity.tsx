import Image from 'next/image';

type RoomListType = {
  [key: string]: {
    icon: JSX.Element;
    name: string;
    id?: number; // TODO 내일 추가하기 -> id 값으로 조회 하기
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
  'SYSTEM_CALENDAR', // king size bed 인데 일단 없어서 이거 넣어둠
  'SYSTEM_GYM',
  'SYSTEM_GRILL',
  'SYSTEM_BREAKFAST',
  'SYSTEM_FIREPLACE',
  'SYSTEM_SMOKING_ALLOWED',
];

export const LOCATION_AMENITIES: string[] = ['SYSTEM_BEACH', 'SYSTEM_VIEW_OCEAN'];

export const SAFETY_AMENITIES: string[] = ['SYSTEM_DETECTOR_SMOKE', 'SYSTEM_DETECTOR_CO'];

export const RESERVATION: string[] = ['SYSTEM_BUZZER', 'SYSTEM_KEY', 'SYSTEM_PETS'];

export const POPULAR: string[] = [
  'SYSTEM_WI_FI', // 14
  'SYSTEM_TV', // 6
  'SYSTEM_COOKING_BASICS', // 74
  'SYSTEM_WASHER', // 152
  'SYSTEM_MAPS_CAR_RENTAL', // 23
  'SYSTEM_SNOWFLAKE', // 7
  'SYSTEM_WORKSPACE', // 15
];

export const SPECIAL: string[] = [
  'SYSTEM_POOL', // 89
  'SYSTEM_JACUZZI', // 55
  'SYSTEM_PATIO_BALCONY', // 125
  'SYSTEM_GRILL', // 105
  'SYSTEM_ROOFTOP_DECK', // 21
  'SYSTEM_FIREPIT', // 184
  'SYSTEM_POOL_TABLE', // 631
  'SYSTEM_FIREPLACE', // 179
  'SYSTEM_PIANO', // 213
  'SYSTEM_GYM', // 168
  'SYSTEM_VIEW_OCEAN', // 30
  'SYSTEM_BEACH', // 20
  'SYSTEM_SKI', // 960
  'SYSTEM_SHOWER', // 96
];

export const SAFETY: string[] = [
  'SYSTEM_DETECTOR_SMOKE', // 38
  'SYSTEM_FIRST_AID_KIT', // 41
  'SYSTEM_FIRE_EXTINGUISHER', // 40
  'SYSTEM_DETECTOR_CO', // 39
];

export const AMENITY_LIST: RoomListType = {
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
        alt="주방"
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
        alt="세탁기"
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
        alt="건조기"
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
        alt="에어컨"
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
        alt="난방"
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
        alt="업무 전용 공간"
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
        alt="TV"
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
        alt="헤어드라이어"
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
        alt="다리미"
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
        alt="수영장"
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
        alt="대형 욕조"
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
        alt="무료 주차 공간"
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
        alt="전기차 충전시설"
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
        alt="아기 침대"
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
        alt="킹사이즈 침대"
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
  SYSTEM_PATIO_BALCONY: {
    icon: (
      <Image
        src="/icons/SYSTEM_PATIO_BALCONY.svg"
        alt="파티오"
        width={24}
        height={24}
      />
    ),
    name: '파티오',
  },
  SYSTEM_ROOFTOP_DECK: {
    icon: (
      <Image
        src="/icons/SYSTEM_ROOFTOP_DECK.svg"
        alt="야외 식사 공간"
        width={24}
        height={24}
      />
    ),
    name: '야외 식사 공간',
  },
  SYSTEM_FIREPIT: {
    icon: (
      <Image
        src="/icons/SYSTEM_FIREPIT.svg"
        alt="화로"
        width={24}
        height={24}
      />
    ),
    name: '화로',
  },
  SYSTEM_POOL_TABLE: {
    icon: (
      <Image
        src="/icons/SYSTEM_POOL_TABLE.svg"
        alt="당구대"
        width={24}
        height={24}
      />
    ),
    name: '당구대',
  },
  SYSTEM_PIANO: {
    icon: (
      <Image
        src="/icons/SYSTEM_PIANO.svg"
        alt="피아노"
        width={24}
        height={24}
      />
    ),
    name: '피아노',
  },
  SYSTEM_SKI: {
    icon: (
      <Image
        src="/icons/SYSTEM_SKI.svg"
        alt="스키 타고 출입"
        width={24}
        height={24}
      />
    ),
    name: '스키 타고 출입',
  },
  SYSTEM_SHOWER: {
    icon: (
      <Image
        src="/icons/SYSTEM_SHOWER.svg"
        alt="야외 샤워 시설"
        width={24}
        height={24}
      />
    ),
    name: '야외 샤워 시설',
  },
  SYSTEM_FIRST_AID_KIT: {
    icon: (
      <Image
        src="/icons/SYSTEM_FIRST_AID_KIT.svg"
        alt="구급 상자"
        width={24}
        height={24}
      />
    ),
    name: '구급 상자',
  },
  SYSTEM_FIRE_EXTINGUISHER: {
    icon: (
      <Image
        src="/icons/SYSTEM_FIRE_EXTINGUISHER.svg"
        alt="소화기"
        width={24}
        height={24}
      />
    ),
    name: '소화기',
  },
};
