import { fireEvent, render, screen } from '@testing-library/react';
import CheckList from '@/app/(header-footer)/components/filter/CheckList';

describe('CheckList 컴포넌트 테스트', () => {
  test('체크박스가 prop받은 title에 맞게 렌더링 되는지 확인', () => {
    const title = '체크박스 테스트';

    render(<CheckList title={title} />);

    expect(screen.queryByText(title)).toBeInTheDocument();
  });

  test('체크박스 클릭 테스트', () => {
    const title = '체크박스 테스트';
    render(<CheckList title={title} />);

    const checkList = screen.getByTestId('check-list');

    expect(screen.getByTestId('uncheck')).toBeInTheDocument();

    fireEvent.click(checkList);

    expect(screen.getByTestId('check')).toBeInTheDocument();
  });
});
