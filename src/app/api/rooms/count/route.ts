import { NextRequest } from 'next/server';
import { CustomResponse } from '@/lib/server';
import { getFilterRoomCount } from '@/services/room';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;

    // null 이면 전체 타입, Private room은 방, Entire home/apt는 집 전체
    const roomType = searchParams.get('roomType');

    // 침실 및 침대 조회
    const bedroom = searchParams.get('bedroom') ? Number(searchParams.get('bedroom')) : undefined;
    const bed = searchParams.get('bed') ? Number(searchParams.get('bed')) : undefined;
    const bathroom = searchParams.get('bathroom')
      ? Number(searchParams.get('bathroom'))
      : undefined;

    // 편의시설 조회 -> icon string 값 받아옴
    const amenities = searchParams.getAll('amenities');

    // 예약 옵션 조회 -> SYSTEM_KEY(셀프 체크인), SYSTEM_BUZZER(디지털 도어록), SYSTEM_PETS(반려동물 동반 허용)
    const option = searchParams.getAll('option');

    // 호스트 언어 조회 -> id 값 받아옴
    const language = searchParams.getAll('language').map(Number);

    // 숙소 타입 조회
    const property = searchParams.get('property');

    const filterParams = {
      roomType,
      bedroom,
      bed,
      bathroom,
      amenityArray: amenities,
      option,
      language,
      property,
    };

    const roomCount = await getFilterRoomCount(filterParams);

    return CustomResponse.ok(roomCount);
  } catch (error) {
    console.error('숙소 필터 조회 중 에러 발생: ', {
      error: error instanceof Error ? error.message : error,
    });

    return CustomResponse.errors();
  }
}
