import { fireEvent, render, screen } from '@testing-library/react';
import Accessibility from './Accessibility';

describe('Accessibility 컴포넌트 테스트', () => {
  test('초기 상태에서 Accessibility 아코디언이 열리지 않았는지 확인', () => {
    render(<Accessibility />);

    expect(screen.queryByText('게스트 출입구 및 주차장')).not.toBeInTheDocument();
  });

  test('접근성 편의 클릭 시 아코디언 열림 테스트', () => {
    render(<Accessibility />);

    const openButton = screen.getByTestId('accessibility');
    fireEvent.click(openButton);

    expect(screen.queryByText('게스트 출입구 및 주차장')).toBeInTheDocument();
  });
});
