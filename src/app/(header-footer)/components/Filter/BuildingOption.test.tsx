import { fireEvent, render, screen } from '@testing-library/react';
import BuildingOption from '@/app/(header-footer)/components/filter/BuildingOption';

describe('BuildingOption 컴포넌트 테스트', () => {
  test('초기 상태에서 BuildingOption 아코디언이 열렸는지 확인', () => {
    render(<BuildingOption />);

    expect(screen.queryByText('단독 또는 다세대 주택')).toBeInTheDocument();
  });

  test('건물 유형 클릭 시 아코디언 닫힘 테스트', () => {
    render(<BuildingOption />);

    const openButton = screen.getByTestId('building-option');
    fireEvent.click(openButton);

    expect(screen.queryByText('단독 또는 다세대 주택')).not.toBeInTheDocument();
  });
});
