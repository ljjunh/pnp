import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Tag from '@/app/(header-footer)/components/filter/Tag';

describe('Tag 컴포넌트', () => {
  test('태그 텍스트가 정상적으로 렌더링 된다', () => {
    // Given
    const tag = 'wifi';

    // When
    render(<Tag tag={tag} />);

    // Then
    expect(screen.getByText('와이파이')).toBeInTheDocument();
  });

  test('태그 아이콘이 정상적으로 렌더링 된다.', () => {
    // Given
    const tag = 'wifi';

    // When
    const { container } = render(<Tag tag={tag} />);

    // Then
    expect(container.querySelector('svg')).toBeInTheDocument();
  });
});
