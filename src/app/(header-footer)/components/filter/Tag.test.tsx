import Tag from '@/app/(header-footer)/components/filter/Tag';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('Tag 컴포넌트', () => {
  const mockHandleClick = jest.fn();
  const user = userEvent.setup();

  test('태그 텍스트가 정상적으로 렌더링 된다', () => {
    // Given
    const tag = 'SYSTEM_WI_FI';

    // When
    render(
      <Tag
        tag={tag}
        handleClick={mockHandleClick}
        isChecked={false}
      />,
    );

    // Then
    expect(screen.getByText('와이파이')).toBeInTheDocument();
  });

  test('태그 아이콘이 정상적으로 렌더링 된다.', () => {
    // Given
    const tag = 'SYSTEM_WI_FI';

    // When
    const { container } = render(
      <Tag
        tag={tag}
        handleClick={mockHandleClick}
        isChecked={false}
      />,
    );

    // Then
    expect(container.querySelector('img')).toBeInTheDocument();
  });

  test('체크 상태에 따라 스타일이 적절히 적용된다', () => {
    const tag = 'SYSTEM_WI_FI';

    // 체크 된 상태일 때
    const { rerender } = render(
      <Tag
        tag={tag}
        handleClick={mockHandleClick}
        isChecked={true}
      />,
    );

    const wifiButton = screen.getByText('와이파이');

    expect(wifiButton.parentElement).toHaveClass('border-black');

    // 체크 되지 않은 상태일 때
    rerender(
      <Tag
        tag={tag}
        handleClick={mockHandleClick}
        isChecked={false}
      />,
    );

    expect(wifiButton.parentElement).not.toHaveClass('border-black');
  });

  test('태그 클릭 시 handleClick 함수가 호출된다', async () => {
    const tag = 'SYSTEM_WI_FI';

    render(
      <Tag
        tag={tag}
        handleClick={mockHandleClick}
        isChecked={false}
      />,
    );

    const wifiButton = screen.getByText('와이파이');

    await user.click(wifiButton);

    expect(mockHandleClick).toHaveBeenCalledWith('SYSTEM_WI_FI');
  });
});
