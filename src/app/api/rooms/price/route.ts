import { CustomResponse } from '@/lib/server';
import { getRoomPrice } from '@/services/room';

export async function GET() {
  try {
    const priceData = await getRoomPrice();

    return CustomResponse.ok(priceData);
  } catch (error) {
    console.error('숙소 가격 조회 중 에러 발생: ', {
      error: error instanceof Error ? error.message : error,
    });

    return CustomResponse.errors();
  }
}
