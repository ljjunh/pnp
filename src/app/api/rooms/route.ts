import { NextRequest } from 'next/server';
import { CustomResponse } from '@/lib/server';
import { getFilterRoom } from '@/services/room';

// 와이파이 'SYSTEM_WI_FI'
// 주방 'SYSTEM_COOKING_BASICS'
// 세탁기 'SYSTEM_WASHER'
// 건조기 'SYSTEM_DRYER'
// 에어컨 'SYSTEM_SNOWFLAKE'
// 난방 'SYSTEM_THERMOMETER'
// 업무 전용 공간 'SYSTEM_WORKSPACE'
// TV 'SYSTEM_TV'
// 헤어드라이어 'SYSTEM_HAIRDRYER'
// 다리미 'SYSTEM_IRON'
// 수영장 'SYSTEM_POOL'
// 대형 욕조 'SYSTEM_JACUZZI'
// 무료 주차 공간 'SYSTEM_MAPS_CAR_RENTAL'
// 전기차 충전 시설 'SYSTEM_EV_CHARGER'
// 아기 침대 'SYSTEM_CRIB'
// 킹사이즈 침대 '' //! 왜 못찾겠지
// 헬스장 'SYSTEM_GYM'
// 바비큐 그릴 'SYSTEM_GRILL'
// 조식 'SYSTEM_BREAKFAST'
// 실내 벽난로 'SYSTEM_FIREPLACE'
// 흡연 가능 'SYSTEM_SMOKING_ALLOWED'
// 해변에 인접 'SYSTEM_BEACH'
// 수변 'SYSTEM_VIEW_OCEAN'
// 화재경보기 'SYSTEM_DETECTOR_SMOKE'
// 일산화탄소 경보기 'SYSTEM_DETECTOR_CO'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;

  // null 이면 전체 타입, Private room은 방, Entire home/apt는 집 전체
  const roomType = searchParams.get('roomType');

  // 침실 및 침대 조회
  const bedroom = searchParams.get('bedroom') ? Number(searchParams.get('bedroom')) : null;
  const bed = searchParams.get('bed') ? Number(searchParams.get('bed')) : null;
  const bathroom = searchParams.get('bathroom') ? Number(searchParams.get('bathroom')) : null;

  // 편의시설 조회 -> icon string 값 받아옴
  const amenities = searchParams.get('amenities')?.split(',') || [];

  // 예약 옵션 조회 -> SYSTEM_KEY(셀프 체크인), SYSTEM_BUZZER(디지털 도어록), SYSTEM_PETS(반려동물 동반 허용)
  const option = searchParams.get('option')?.split(',') || [];

  // 건물 유형 조회
  // TODO: 건물 유형 46개 메인 페이지 만들고 하기
  // const buildingType = searchParams.get('buildingType');

  // 호스트 언어 조회
  const language = searchParams.get('language')?.split(',') || [];

  const filterParams = {
    roomType,
    bedroom,
    bed,
    bathroom,
    amenityArray: amenities,
    option,
  };

  const room = await getFilterRoom(filterParams);

  return CustomResponse.ok(room);
}
