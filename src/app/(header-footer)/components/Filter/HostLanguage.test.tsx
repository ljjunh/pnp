import { fireEvent, render, screen } from '@testing-library/react';
import HostLanguage from '@/app/(header-footer)/components/filter/HostLanguage';

describe('HostLanguage 컴포넌트 테스트', () => {
  test('초기 상태에서 HostLanguage 아코디언이 열리지 않았는지 확인', () => {
    render(<HostLanguage />);

    expect(screen.queryByText('중국어')).not.toBeInTheDocument();
  });

  test('호스트 언어 클릭 시 아코디언 열림 테스트', () => {
    render(<HostLanguage />);

    const openButton = screen.getByTestId('host-language');
    fireEvent.click(openButton);

    expect(screen.queryByText('중국어')).toBeInTheDocument();

    // 다시 클릭 시 아코디언 닫힘 테스트
    fireEvent.click(openButton);
    expect(screen.queryByText('중국어')).not.toBeInTheDocument();
  });

  test('언어 체크박스 선택/해제 동작 테스트', () => {
    render(<HostLanguage />);

    fireEvent.click(screen.getByTestId('host-language'));

    const chineseCheckbox = screen.getByText('중국어');
    fireEvent.click(chineseCheckbox);

    expect(screen.getByTestId('check')).toBeInTheDocument();
  });
});
