import KindOfRoom from '@/app/(header-footer)/components/filter/KindOfRoom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('KindOfRoom 컴포넌트 테스트', () => {
  const mockHandleFilter = jest.fn();
  const user = userEvent.setup();

  test('초기 상태에서 모든 버튼이 렌더링되는지 확인', () => {
    render(<KindOfRoom handleFilter={mockHandleFilter} />);

    expect(screen.queryByText('모든 유형')).toBeInTheDocument();
    expect(screen.queryByText('방')).toBeInTheDocument();
    expect(screen.queryByText('집 전체')).toBeInTheDocument();
  });

  describe('숙소 유형 선택', () => {
    test('모든 유형 버튼 클릭 시 상태 변경', async () => {
      const { rerender } = render(
        <KindOfRoom
          roomType={'Entire'}
          handleFilter={mockHandleFilter}
        />,
      );

      rerender(
        <KindOfRoom
          roomType={null}
          handleFilter={mockHandleFilter}
        />,
      );

      const button = screen.getByText('모든 유형');

      // 선택된 버튼에 선택 스타일 적용 확인
      expect(button.parentElement).toHaveClass(
        'rounded-lg',
        'border-2',
        'border-black',
        'bg-neutral-01',
      );
    });

    test('방 버튼 클릭 시 상태 변경', async () => {
      const { rerender } = render(
        <KindOfRoom
          roomType={null}
          handleFilter={mockHandleFilter}
        />,
      );

      rerender(
        <KindOfRoom
          roomType="Private"
          handleFilter={mockHandleFilter}
        />,
      );

      const button = screen.getByText('방');

      // 선택된 버튼에 선택 스타일 적용 확인
      expect(button.parentElement).toHaveClass(
        'rounded-lg',
        'border-2',
        'border-black',
        'bg-neutral-01',
      );
    });

    test('집 전체 버튼 클릭 시 상태 변경', async () => {
      const { rerender } = render(
        <KindOfRoom
          roomType={null}
          handleFilter={mockHandleFilter}
        />,
      );

      rerender(
        <KindOfRoom
          roomType="Entire"
          handleFilter={mockHandleFilter}
        />,
      );

      const button = screen.getByText('집 전체');

      // 선택된 버튼에 선택 스타일 적용 확인
      expect(button.parentElement).toHaveClass(
        'rounded-lg',
        'border-2',
        'border-black',
        'bg-neutral-01',
      );
    });

    test('다른 버튼 클릭 시 이전 선택 버튼 스타일 변경', async () => {
      const { rerender } = render(
        <KindOfRoom
          roomType={null}
          handleFilter={mockHandleFilter}
        />,
      );

      rerender(
        <KindOfRoom
          roomType="Private"
          handleFilter={mockHandleFilter}
        />,
      );

      const allTypeButton = screen.getByText('모든 유형');
      const roomButton = screen.getByText('방');

      // 모든 유형 선택
      await user.click(allTypeButton);

      // 방 선택
      await user.click(roomButton);

      // 모든 유형 버튼 스타일 확인
      expect(allTypeButton.parentElement).not.toHaveClass(
        'border-2',
        'border-black',
        'bg-neutral-01',
      );

      // 방 버튼 스타일 확인
      expect(roomButton.parentElement).toHaveClass(
        'rounded-lg',
        'border-2',
        'border-black',
        'bg-neutral-01',
      );
    });
  });

  test('모든 유형 버튼 클릭 시 handleFilter 호출 확인', async () => {
    render(
      <KindOfRoom
        roomType={null}
        handleFilter={mockHandleFilter}
      />,
    );

    const button = screen.getByText('모든 유형');
    await user.click(button);

    expect(mockHandleFilter).toHaveBeenCalledWith(null, 'roomType');
  });
});
