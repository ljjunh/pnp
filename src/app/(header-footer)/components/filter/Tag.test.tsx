import Tag from '@/app/(header-footer)/components/filter/Tag';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

describe('Tag 컴포넌트', () => {
  const mockHandleClick = jest.fn();

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
});
