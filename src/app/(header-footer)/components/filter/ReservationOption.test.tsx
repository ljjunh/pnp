import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ReservationOption from './ReservationOption';

describe('ReservationOption 컴포넌트 테스트', () => {
  const mockReservationOption: string[] = [];
  const mockHandleFilter = jest.fn();
  const user = userEvent.setup();

  test('예약 옵션 컴포넌트 렌더링', () => {
    render(
      <ReservationOption
        option={mockReservationOption}
        handleFilter={mockHandleFilter}
      />,
    );

    expect(screen.queryByText('디지털 도어록')).toBeInTheDocument();
  });

  test("예약 옵션 체크박스 선택 시 'handleFilter' 함수 호출 테스트", async () => {
    render(
      <ReservationOption
        option={mockReservationOption}
        handleFilter={mockHandleFilter}
      />,
    );

    await user.click(screen.getByText('디지털 도어록'));

    expect(mockHandleFilter).toHaveBeenCalledWith(['SYSTEM_BUZZER'], 'option');
  });
});
