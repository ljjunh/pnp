import { NextRequest } from 'next/server';
import { CustomResponse } from '@/lib/server';
import { filterSchema } from '@/schemas/rooms';
import { getFilterRoomCount } from '@/services/room';

export async function GET(request: NextRequest): Promise<CustomResponse> {
  const searchParams = request.nextUrl.searchParams;
  try {
    const filterParams = filterSchema.parse({
      // null 이면 전체 타입, Private room은 방, Entire home/apt는 집 전체
      roomType: searchParams.get('roomType') as 'Entire' | 'Private' | null,
      // 가격 조회
      minPrice: searchParams.get('minPrice') ? Number(searchParams.get('minPrice')) : undefined,
      maxPrice: searchParams.get('maxPrice') ? Number(searchParams.get('maxPrice')) : undefined,
      // 침실 및 침대 조회
      bedroom: searchParams.get('bedroom') ? Number(searchParams.get('bedroom')) : undefined,
      bed: searchParams.get('bed') ? Number(searchParams.get('bed')) : undefined,
      bathroom: searchParams.get('bathroom') ? Number(searchParams.get('bathroom')) : undefined,
      // 편의시설 조회 -> icon string 값 받아옴
      amenities: searchParams.getAll('amenities'),
      // 예약 옵션 조회 -> SYSTEM_KEY(셀프 체크인), SYSTEM_BUZZER(디지털 도어록), SYSTEM_PETS(반려동물 동반 허용)
      option: searchParams.getAll('option'),
      // 호스트 언어 조회 -> id 값 받아옴
      language: searchParams.getAll('language')[0]?.split(',').map(Number),
      // 숙소 타입 조회
      property: searchParams.get('property') ? Number(searchParams.get('property')) : undefined,
      // 위치 조회 타입
      location: searchParams.get('location') || undefined,
      checkIn: searchParams.get('checkIn') || undefined,
      checkOut: searchParams.get('checkOut') || undefined,
      capacity: searchParams.get('capacity') ? Number(searchParams.get('capacity')) : undefined,
    });

    const roomCount = await getFilterRoomCount(filterParams);

    return CustomResponse.ok(roomCount);
  } catch (error) {
    console.error('숙소 필터 카운트 조회 중 에러 발생: ', {
      error: error instanceof Error ? error.message : error,
    });

    return CustomResponse.errors();
  }
}
