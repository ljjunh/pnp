import { act, renderHook } from '@testing-library/react';
import { createReservation } from '@/apis/reservation/actions';
import { useRoomBooking } from '@/hooks/useRoomBooking';
import { ROUTES } from '@/constants/routeURL';

const mockPush = jest.fn();
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(() => ({
    push: mockPush,
  })),
}));

const mockToast = jest.fn();
jest.mock('@/hooks/use-toast', () => ({
  useToast: jest.fn(() => ({
    toast: mockToast,
  })),
}));

jest.mock('@/apis/reservation/actions', () => ({
  createReservation: jest.fn(),
}));

describe('useRoomBooking', () => {
  const mockProps = {
    roomId: 1,
    guestCounts: {
      adults: 2,
      children: 1,
      infants: 0,
      pets: 0,
    },
    dates: {
      checkIn: new Date('2025-01-10'),
      checkOut: new Date('2025-01-15'),
    },
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('날짜가 선택되지 않은 경우 에러 토스트가 표시된다', async () => {
    const propsWithoutDates = {
      ...mockProps,
      dates: {
        checkIn: null,
        checkOut: null,
      },
    };

    const { result } = renderHook(() => useRoomBooking(propsWithoutDates));

    await act(async () => {
      result.current.handleReservation();
    });

    expect(mockToast).toHaveBeenCalledWith({
      title: '날짜를 선택해주세요',
      variant: 'destructive',
    });
  });

  test('비로그인 상태일 경우 로그인 다이얼로그가 표시된다', async () => {
    (createReservation as jest.Mock).mockResolvedValue({
      success: false,
      status: 401,
    });

    const { result } = renderHook(() => useRoomBooking(mockProps));

    await act(async () => {
      result.current.handleReservation();
    });

    expect(result.current.showLoginDialog).toBe(true);
  });

  test('예약이 성공적으로 완료되면 예약 상세 페이지로 이동한다', async () => {
    (createReservation as jest.Mock).mockResolvedValue({
      success: true,
      data: { orderNumber: '12345' },
    });

    const { result } = renderHook(() => useRoomBooking(mockProps));

    await act(async () => {
      await result.current.handleReservation();
    });

    expect(createReservation).toHaveBeenCalledWith({
      roomId: mockProps.roomId,
      guestNumber: 3,
      checkIn: mockProps.dates.checkIn,
      checkOut: mockProps.dates.checkOut,
    });

    expect(mockPush).toHaveBeenCalledWith(`/reservation/12345`);
  });

  test('이미 예약된 날짜를 선택한 경우 에러 메시지가 표시된다', async () => {
    (createReservation as jest.Mock).mockResolvedValue({
      success: false,
      status: 400,
      message: '이미 예약이 되어있습니다.',
    });

    const { result } = renderHook(() => useRoomBooking(mockProps));

    await act(async () => {
      await result.current.handleReservation();
    });

    expect(mockToast).toHaveBeenCalledWith({
      title: '예약 실패',
      description: '선택한 날짜는 이미 예약된 상태입니다. 다른 날짜를 선택해주세요',
      variant: 'destructive',
    });
  });

  test('최대 인원을 초과한 경우 에러 메시지가 표시된다', async () => {
    (createReservation as jest.Mock).mockResolvedValue({
      success: false,
      status: 400,
      message: '숙소의 최대 인원 수를 초과하였습니다.',
    });

    const { result } = renderHook(() => useRoomBooking(mockProps));

    await act(async () => {
      await result.current.handleReservation();
    });

    expect(mockToast).toHaveBeenCalledWith({
      title: '예약 실패',
      description: '선택하신 인원이 숙소 최대 수용 인원을 초과합니다',
      variant: 'destructive',
    });
  });

  test('400 에러 중 예상한 메시지가 아닐 경우 서버에서 온 메세지가 토스트메시지로 표시된다', async () => {
    (createReservation as jest.Mock).mockResolvedValue({
      success: false,
      status: 400,
      message: '예약에 실패했습니다.',
    });

    const { result } = renderHook(() => useRoomBooking(mockProps));

    await act(async () => {
      await result.current.handleReservation();
    });

    expect(mockToast).toHaveBeenCalledWith({
      title: '예약 실패',
      description: '예약에 실패했습니다.',
      variant: 'destructive',
    });
  });

  test('400, 401을 제외한 에러가 오는 경우 서버에서 온 메세지가 토스트메시지로 표시된다', async () => {
    (createReservation as jest.Mock).mockResolvedValue({
      success: false,
      status: 403,
      message: '예약에 실패했습니다.',
    });

    const { result } = renderHook(() => useRoomBooking(mockProps));

    await act(async () => {
      await result.current.handleReservation();
    });

    expect(mockToast).toHaveBeenCalledWith({
      title: '예약에 실패했습니다.',
      variant: 'destructive',
    });
  });

  test('성공했지만 orderNumber가 없는 경우는 서버 에러로 간주되고 토스트메시지가 표시된다', async () => {
    (createReservation as jest.Mock).mockResolvedValue({
      success: true,
      status: 201,
      message: '예약에 실패했습니다.',
    });

    const { result } = renderHook(() => useRoomBooking(mockProps));

    await act(async () => {
      await result.current.handleReservation();
    });

    expect(mockToast).toHaveBeenCalledWith({
      title: '예약 실패',
      description: '예약은 완료되었으나 주문번호를 받아오지 못했습니다. 고객센터로 문의해주세요.',
      variant: 'destructive',
    });
  });

  test('로그인 확인버튼 클릭시 다이얼로그가 닫히고 로그인 페이지로 이동한다', async () => {
    const { result } = renderHook(() => useRoomBooking(mockProps));

    act(() => {
      result.current.setShowLoginDialog(true);
    });

    expect(result.current.showLoginDialog).toBe(true);

    act(() => {
      result.current.handleLoginConfirm();
    });
    expect(result.current.showLoginDialog).toBe(false);

    expect(mockPush).toHaveBeenCalledWith(ROUTES.LOGIN);
  });
});
