import { NextRequest } from 'next/server';
import { CustomResponse } from '@/lib/server';
import { priceFilterSchema } from '@/schemas/rooms';
import { getRoomPrice } from '@/services/room';

export async function GET(request: NextRequest): Promise<CustomResponse> {
  const searchParams = request.nextUrl.searchParams;
  try {
    const filterParams = priceFilterSchema.parse({
      roomType: searchParams.get('roomType') as 'Entire' | 'Private' | null,
      property: searchParams.get('property'),
    });

    const priceData = await getRoomPrice(filterParams);

    return CustomResponse.ok(priceData);
  } catch (error) {
    console.error('숙소 가격 조회 중 에러 발생: ', {
      error: error instanceof Error ? error.message : error,
    });

    return CustomResponse.errors();
  }
}
