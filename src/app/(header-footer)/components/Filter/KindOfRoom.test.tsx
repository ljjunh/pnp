import { fireEvent, render, screen } from '@testing-library/react';
import KindOfRoom from './KindOfRoom';

describe('KindOfRoom 컴포넌트 테스트', () => {
  test('초기 상태에서 모든 버튼이 렌더링되는지 확인', () => {
    render(<KindOfRoom />);

    expect(screen.queryByText('모든 유형')).toBeInTheDocument();
    expect(screen.queryByText('방')).toBeInTheDocument();
    expect(screen.queryByText('집 전체')).toBeInTheDocument();
  });

  describe('숙소 유형 선택', () => {
    test('모든 유형 버튼 클릭 시 상태 변경', () => {
      render(<KindOfRoom />);

      const button = screen.getByText('모든 유형');
      fireEvent.click(button);

      // 선택된 버튼에 선택 스타일 적용 확인
      expect(button.parentElement).toHaveClass('rounded-lg');
      expect(button.parentElement).toHaveClass('border-2');
      expect(button.parentElement).toHaveClass('border-black');
      expect(button.parentElement).toHaveClass('bg-neutral-01');
    });

    test('방 버튼 클릭 시 상태 변경', () => {
      render(<KindOfRoom />);

      const button = screen.getByText('방');
      fireEvent.click(button);

      // 선택된 버튼에 선택 스타일 적용 확인
      expect(button.parentElement).toHaveClass('rounded-lg');
      expect(button.parentElement).toHaveClass('border-2');
      expect(button.parentElement).toHaveClass('border-black');
      expect(button.parentElement).toHaveClass('bg-neutral-01');
    });

    test('집 전체 버튼 클릭 시 상태 변경', () => {
      render(<KindOfRoom />);

      const button = screen.getByText('집 전체');
      fireEvent.click(button);

      // 선택된 버튼에 선택 스타일 적용 확인
      expect(button.parentElement).toHaveClass('rounded-lg');
      expect(button.parentElement).toHaveClass('border-2');
      expect(button.parentElement).toHaveClass('border-black');
      expect(button.parentElement).toHaveClass('bg-neutral-01');
    });

    test('다른 버튼 클릭 시 이전 선택 버튼 스타일 변경', () => {
      render(<KindOfRoom />);

      const allTypeButton = screen.getByText('모든 유형');
      const roomButton = screen.getByText('방');

      // 모든 유형 선택
      fireEvent.click(allTypeButton);

      // 방 선택
      fireEvent.click(roomButton);

      // 모든 유형 버튼 스타일 확인
      expect(allTypeButton.parentElement).not.toHaveClass('border-2');
      expect(allTypeButton.parentElement).not.toHaveClass('border-black');
      expect(allTypeButton.parentElement).not.toHaveClass('bg-neutral-01');

      // 방 버튼 스타일 확인
      expect(roomButton.parentElement).toHaveClass('rounded-lg');
      expect(roomButton.parentElement).toHaveClass('border-2');
      expect(roomButton.parentElement).toHaveClass('border-black');
      expect(roomButton.parentElement).toHaveClass('bg-neutral-01');
    });
  });
});
