import { NextRequest } from 'next/server';
import { CustomResponse, prisma } from '@/lib/server';

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
// 킹사이즈 침대 ''
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
  // const amenityArray = ['SYSTEM_WI_FI', 'SYSTEM_CRIB'];
  const amenityArray = searchParams.get('amenities')?.split(',') || [];

  console.log('amenityArray', amenityArray);

  const testdata = await prisma.room.findMany({
    where: {
      amenities: {
        some: {
          amenity: {
            icon: {
              in: amenityArray,
            },
          },
        },
      },
    },
  });

  return CustomResponse.ok(testdata);
}
