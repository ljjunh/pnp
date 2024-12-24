import { calculatePrice } from '@/utils/calculatePrice';

describe('calculatePrice 테스트', () => {
  test('기본 수수로(10%)로 2박 숙박비를 계산한다', () => {
    const request = {
      price: 100000,
      nights: 2,
    };

    const result = calculatePrice(request);

    expect(result.subtotal).toBe(200000);
    expect(result.serviceFee).toBe(20000);
    expect(result.total).toBe(220000);
  });

  test('0박 예약 시 모든 금액이 0원이 된다', () => {
    const request = {
      price: 100000,
      nights: 0,
    };
    const result = calculatePrice(request);

    expect(result.subtotal).toBe(0);
    expect(result.serviceFee).toBe(0);
    expect(result.total).toBe(0);
  });

  test('0원 숙소의 경우 모든 금액이 0원이 된다', () => {
    const request = {
      price: 0,
      nights: 5,
    };

    const result = calculatePrice(request);

    expect(result.subtotal).toBe(0);
    expect(result.serviceFee).toBe(0);
    expect(result.total).toBe(0);
  });
});
