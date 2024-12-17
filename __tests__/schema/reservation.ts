import { createReservationSchema, reservationAvailableSchema } from '@/schemas';

describe('createReservationSchema', () => {
  it('올바른 예약 정보를 입력하면 에러가 발생하지 않습니다.', () => {
    const data = {
      roomId: 1,
      guestNumber: 5,
      checkIn: new Date('2025-12-01'),
      checkOut: new Date('2025-12-02'),
    };

    const parse = createReservationSchema.safeParse(data);
    expect(parse.success).toBeTruthy();
  });

  it('만약, roomId가 없다면 에러가 발생합니다.', () => {
    const data = {
      guestNumber: 5,
      checkIn: new Date('2025-12-01'),
      checkOut: new Date('2025-12-02'),
    };

    const parse = createReservationSchema.safeParse(data);
    expect(parse.success).toBeFalsy();
    expect(parse.error?.errors[0].message).toBe('Required');
  });

  it('만약, guestNumber가 음수라면 에러가 발생합니다.', () => {
    const data = {
      roomId: 1,
      guestNumber: -5,
      checkIn: new Date('2025-12-01'),
      checkOut: new Date('2025-12-02'),
    };

    const parse = createReservationSchema.safeParse(data);
    expect(parse.success).toBeFalsy();
    expect(parse.error?.errors[0].message).toBe('게스트 수는 1명 이상이어야 합니다.');
  });

  it('만약, checkIn이 checkOut보다 늦다면 에러가 발생합니다.', () => {
    const data = {
      roomId: 1,
      guestNumber: 5,
      checkIn: new Date('2025-12-02'),
      checkOut: new Date('2025-12-01'),
    };

    const parse = createReservationSchema.safeParse(data);
    expect(parse.success).toBeFalsy();
    expect(parse.error?.errors[0].message).toBe('체크아웃 날짜는 체크인 날짜 이후여야 합니다');
  });

  it('만약, checkIn이 오늘 이전이라면 에러가 발생합니다.', () => {
    const data = {
      roomId: 1,
      guestNumber: 5,
      checkIn: new Date('2021-12-01'),
      checkOut: new Date('2021-12-02'),
    };

    const parse = createReservationSchema.safeParse(data);
    expect(parse.success).toBeFalsy();
    expect(parse.error?.errors[0].message).toBe('오늘 이후 날짜만 예약할 수 있습니다');
  });
});

describe('reservationAvailableSchema', () => {
  it('올바른 예약 정보를 입력하면 에러가 발생하지 않습니다.', () => {
    const data = {
      roomId: 1,
      checkIn: new Date('2025-12-01'),
      checkOut: new Date('2025-12-02'),
    };

    const parse = reservationAvailableSchema.safeParse(data);
    expect(parse.success).toBeTruthy();
  });

  it('만약, roomId가 없다면 에러가 발생합니다.', () => {
    const data = {
      checkIn: new Date('2025-12-01'),
      checkOut: new Date('2025-12-02'),
    };

    const parse = reservationAvailableSchema.safeParse(data);
    expect(parse.success).toBeFalsy();
    expect(parse.error?.errors[0].message).toBe('Required');
  });

  it('만약, checkIn이 checkOut보다 늦다면 에러가 발생합니다.', () => {
    const data = {
      roomId: 1,
      checkIn: new Date('2025-12-02'),
      checkOut: new Date('2025-12-01'),
    };

    const parse = reservationAvailableSchema.safeParse(data);
    expect(parse.success).toBeFalsy();
    expect(parse.error?.errors[0].message).toBe('체크아웃 날짜는 체크인 날짜 이후여야 합니다');
  });
});
