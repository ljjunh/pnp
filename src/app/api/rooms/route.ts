import { NextRequest } from 'next/server';
import { auth } from '@/auth';
import { CustomError, UnAuthorizedError } from '@/errors';
import { TooManyRequestError } from '@/errors/errors';
import {
  CustomResponse,
  PaginationResponse,
  createPaginationResponse,
  createRoomLimit,
  getPaginationParams,
  getSkipTake,
} from '@/lib/server';
import { filterSchema } from '@/schemas/rooms';
import { createRoom, getFilterRoom } from '@/services/room';
import { CreateRoomResponse, FilterRoom } from '@/types/room';

export async function GET(
  request: NextRequest,
): Promise<CustomResponse<PaginationResponse<FilterRoom[]>>> {
  try {
    const searchParams = request.nextUrl.searchParams;

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
      language: searchParams.getAll('language').map(Number),
      // 숙소 타입 조회
      property: searchParams.get('property') ? Number(searchParams.get('property')) : undefined,
      // 위치 조회 타입
      location: searchParams.get('location') || undefined,
      checkIn: searchParams.get('checkIn') || undefined,
      checkOut: searchParams.get('checkOut') || undefined,
      capacity: searchParams.get('capacity') ? Number(searchParams.get('capacity')) : undefined,
    });

    const sort = searchParams.get('sort') || 'recent';

    const { page, limit } = getPaginationParams(request);
    const { skip, take } = getSkipTake(page, limit);

    const [room, total] = await getFilterRoom(filterParams, skip, take, sort);

    return CustomResponse.ok(createPaginationResponse(room, total, page, limit));
  } catch (error) {
    console.error('숙소 필터 조회 중 에러 발생: ', {
      error: error instanceof Error ? error.message : error,
    });

    return CustomResponse.errors();
  }
}

export async function POST(): Promise<CustomResponse<CreateRoomResponse>> {
  try {
    const session = await auth();
    if (!session) {
      throw new UnAuthorizedError();
    }

    const { success } = await createRoomLimit.limit(session.user.id);
    if (!success) {
      throw new TooManyRequestError('숙소 등록은 5분에 한 번만 가능합니다.');
    }

    const roomId = await createRoom(session.user.id);

    return CustomResponse.create({ roomId });
  } catch (error) {
    if (error instanceof CustomError) {
      return CustomResponse.errors(error.message, error.statusCode);
    }

    return CustomResponse.errors();
  }
}
