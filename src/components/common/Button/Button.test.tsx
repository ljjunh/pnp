import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Button from '@/components/common/Button/Button';

describe('Button 컴포넌트', () => {
  test('기본 버튼이 정상적으로 렌더링된다', () => {
    // Given
    const buttonText = '버튼';

    // When
    render(<Button>{buttonText}</Button>);
    // Then
    expect(screen.getByText(buttonText)).toBeInTheDocument();
  });

  test('variant에 따라 스타일이 변경된다', () => {
    // Given
    const { rerender } = render(<Button variant="primary">버튼</Button>);
    // When & Then
    expect(screen.getByRole('button')).toHaveClass('bg-button-02');

    // When
    rerender(<Button variant="secondary">버튼</Button>);
    // Then
    expect(screen.getByRole('button')).toHaveClass('bg-shade-02');
    // When
    rerender(<Button variant="tertiary">버튼</Button>);
    // Then
    expect(screen.getByRole('button')).toHaveClass('border-shade-02');
  });

  test('size prop에 따라 버튼 크기가 변경된다', () => {
    // Given
    const { rerender } = render(<Button size="small">버튼</Button>);
    // When & Then
    expect(screen.getByRole('button')).toHaveClass('px-6');

    // When
    rerender(<Button size="full">버튼</Button>);
    // Then
    expect(screen.getByRole('button')).toHaveClass('w-full');
  });

  test('로딩 상태일 때 버튼에 children 대신 로딩 ui가 표시된다.', () => {
    // Given
    render(<Button isLoading>버튼</Button>);

    // When & Then
    expect(screen.getByRole('status')).toBeInTheDocument();
    expect(screen.queryByText('버튼')).not.toBeInTheDocument();
  });

  test('비활성화 상태일 때 버튼이 비활성화된다', () => {
    // Given
    render(<Button isDisabled>버튼</Button>);

    // When & Then
    expect(screen.getByRole('button')).toBeDisabled();
  });

  test('클릭 이벤트가 정상적으로 동작한다', async () => {
    // Given
    const user = userEvent.setup();
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>버튼</Button>);

    // When
    await user.click(screen.getByRole('button'));

    // Then
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test('비활성화 상태에서는 클릭 이벤트가 발생하지 않는다', async () => {
    // Given
    const user = userEvent.setup();
    const handleClick = jest.fn();
    render(
      <Button
        onClick={handleClick}
        isDisabled
      >
        버튼
      </Button>,
    );

    // When
    await user.click(screen.getByRole('button'));

    // Then
    expect(handleClick).toHaveBeenCalledTimes(0);
  });

  test('로딩 상태에서는 클릭 이벤트가 발생하지 않는다', async () => {
    // Given
    const user = userEvent.setup();
    const handleClick = jest.fn();
    render(
      <Button
        onClick={handleClick}
        isLoading
      >
        버튼
      </Button>,
    );

    // When
    await user.click(screen.getByRole('button'));

    // Then
    expect(handleClick).toHaveBeenCalledTimes(0);
  });

  test('로딩 상태에서 secondary variant일 때 적절한 스타일이 적용된다', () => {
    // Given
    render(
      <Button
        isLoading
        variant="secondary"
      >
        버튼
      </Button>,
    );

    // Then
    expect(screen.getByRole('button')).toHaveClass('cursor-wait');
    expect(screen.getByRole('button')).not.toHaveClass('bg-neutral-03');
  });
});
