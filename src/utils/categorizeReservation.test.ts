import { categorizeReservations } from './categorizeReservation';
import { ReservationTrip } from '@/types/reservation';

describe('categorizeReservations 테스트', () => {
  // 테스트용 현재 날짜 고정 (2024-01-03)
  beforeAll(() => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date('2024-01-03'));
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  const mockReservations: ReservationTrip[] = [
    {
      id: 1,
      orderNumber: 'ORDER1',
      status: 'CONFIRMED',
      checkIn: new Date('2024-01-10'), // 미래
      checkOut: new Date('2024-01-15'),
      room: {
        id: 1,
        title: '테스트 룸 1',
        thumbnail: 'test1.jpg',
        location: '서울',
        host: {
          id: 1,
          user: {
            name: '호스트1',
            image: 'host1.jpg'
          }
        }
      }
    },
    {
      id: 2,
      orderNumber: 'ORDER2',
      status: 'COMPLETED',
      checkIn: new Date('2023-12-01'), // 과거
      checkOut: new Date('2023-12-05'),
      room: {
        id: 2,
        title: '테스트 룸 2',
        thumbnail: 'test2.jpg',
        location: '부산',
        host: {
          id: 2,
          user: {
            name: '호스트2',
            image: 'host2.jpg'
          }
        }
      }
    }
  ];

  it('예약 리스트를 다가오는 여행지, 지난 여행지로 올바르게 분류한다', () => {
    const result = categorizeReservations(mockReservations);

    // 미래 예약 확인
    expect(result.upcomingReservations).toHaveLength(1);
    expect(result.upcomingReservations[0].id).toBe(1);
    expect(result.upcomingReservations[0].checkIn).toEqual(new Date('2024-01-10'));

    // 과거 예약 확인
    expect(result.previousReservations).toHaveLength(1);
    expect(result.previousReservations[0].id).toBe(2);
    expect(result.previousReservations[0].checkIn).toEqual(new Date('2023-12-01'));
  });

  it('예약 리스트가 없을 경우 빈 배열을 반환한다', () => {
    const result = categorizeReservations([]);

    expect(result.upcomingReservations).toHaveLength(0);
    expect(result.previousReservations).toHaveLength(0);
  });

  it('예약 리스트를 시간 순서로 올바르게 분류한다', () => {
    const moreReservations: ReservationTrip[] = [
      ...mockReservations,
      {
        id: 3,
        orderNumber: 'ORDER3',
        status: 'CONFIRMED',
        checkIn: new Date('2024-02-01'), // 더 먼 미래
        checkOut: new Date('2024-02-05'),
        room: {
          id: 3,
          title: '테스트 룸 3',
          thumbnail: 'test3.jpg',
          location: '제주',
          host: {
            id: 3,
            user: {
              name: '호스트3',
              image: 'host3.jpg'
            }
          }
        }
      }
    ];

    const result = categorizeReservations(moreReservations);

    // 미래 예약은 가까운 순
    expect(result.upcomingReservations[0].id).toBe(1); // 1월 10일
    expect(result.upcomingReservations[1].id).toBe(3); // 2월 1일

    // 과거 예약은 최신순
    expect(result.previousReservations[0].id).toBe(2); // 12월 1일
  });
});