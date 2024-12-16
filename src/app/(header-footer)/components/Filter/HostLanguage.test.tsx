import { fireEvent, render, screen } from '@testing-library/react';
import HostLanguage from './HostLanguage';

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
  });
});
