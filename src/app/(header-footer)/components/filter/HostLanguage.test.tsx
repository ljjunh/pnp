import HostLanguage from '@/app/(header-footer)/components/filter/HostLanguage';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('HostLanguage 컴포넌트 테스트', () => {
  const mockLanguage = [1, 2, 3];
  const mockHandleFilter = jest.fn();
  const user = userEvent.setup();

  test('초기 상태에서 HostLanguage 아코디언이 열리지 않았는지 확인', () => {
    render(
      <HostLanguage
        language={mockLanguage}
        handleFilter={mockHandleFilter}
      />,
    );

    expect(screen.queryByText('중국어')).not.toBeInTheDocument();
  });

  test('호스트 언어 클릭 시 아코디언 열림 테스트', async () => {
    render(
      <HostLanguage
        language={mockLanguage}
        handleFilter={mockHandleFilter}
      />,
    );

    const openButton = screen.getByRole('button');
    await user.click(openButton);

    expect(screen.queryByText('중국어')).toBeInTheDocument();

    // 다시 클릭 시 아코디언 닫힘 테스트
    await user.click(openButton);
    expect(screen.queryByText('중국어')).not.toBeInTheDocument();
  });

  test('언어 체크박스 선택/해제 동작 테스트', async () => {
    render(
      <HostLanguage
        language={mockLanguage}
        handleFilter={mockHandleFilter}
      />,
    );

    await user.click(screen.getByRole('button'));

    const chineseCheckbox = screen.getByText('중국어');
    await user.click(chineseCheckbox);

    expect(screen.getByTestId('check')).toBeInTheDocument();
  });

  test("언어 체크박스 선택 시 'handleFilter' 함수 호출 테스트", async () => {
    render(
      <HostLanguage
        language={mockLanguage}
        handleFilter={mockHandleFilter}
      />,
    );

    await user.click(screen.getByRole('button'));

    const japaneseCheckbox = screen.getByText('일본어');
    await user.click(japaneseCheckbox);

    expect(mockHandleFilter).toHaveBeenCalledWith([1, 2, 3, 4], 'language');
  });
});
