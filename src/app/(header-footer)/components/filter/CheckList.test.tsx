import CheckList from '@/app/(header-footer)/components/filter/CheckList';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('CheckList 컴포넌트 테스트', () => {
  const user = userEvent.setup();

  test('체크박스가 prop받은 title에 맞게 렌더링 되는지 확인', () => {
    const title = '체크박스 테스트';

    render(
      <CheckList
        id={1}
        title={title}
        handleClick={() => {
          console.log('체크박스 클릭');
        }}
      />,
    );

    expect(screen.queryByText(title)).toBeInTheDocument();
  });

  test('체크박스 클릭 테스트', async () => {
    const title = '체크박스 테스트';
    render(
      <CheckList
        id={1}
        title={title}
        handleClick={() => {
          console.log('체크박스 클릭');
        }}
      />,
    );

    const checkList = screen.getByRole('check-box');

    expect(screen.getByTestId('uncheck')).toBeInTheDocument();

    await user.click(checkList);

    expect(screen.getByTestId('check')).toBeInTheDocument();
  });
});
