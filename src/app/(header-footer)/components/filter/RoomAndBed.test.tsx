import React from 'react';
import RoomAndBed from '@/app/(header-footer)/components/filter/RoomAndBed';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

interface TestConfig {
  name: string;
  testIds: {
    plus: string;
    minus: string;
  };
}

const mockHandleFilter = jest.fn();

const roomAndBedTest = ({ name, testIds }: TestConfig) => {
  describe(`${name} 상태 변경`, () => {
    const user = userEvent.setup();

    test(`${name} + 버튼 클릭 시 1로 변경`, async () => {
      render(<RoomAndBed handleFilter={mockHandleFilter} />);
      const plusButton = screen.getByRole(testIds.plus);
      await user.click(plusButton);
      expect(screen.getByText('1+')).toBeInTheDocument();
    });

    test(`${name} - 버튼 클릭 시 상태 변경`, async () => {
      render(<RoomAndBed handleFilter={mockHandleFilter} />);
      const plusButton = screen.getByRole(testIds.plus);
      const minusButton = screen.getByRole(testIds.minus);

      await user.click(plusButton);
      await user.click(minusButton);

      expect(screen.getAllByText('상관없음')[0]).toBeInTheDocument();
      expect(minusButton).toHaveStyle({ color: 'LightGray' });
    });

    test(`${name} 최대값 8+ 도달`, async () => {
      render(<RoomAndBed handleFilter={mockHandleFilter} />);
      const plusButton = screen.getByRole(testIds.plus);

      for (let i = 0; i < 8; i++) {
        await user.click(plusButton);
      }

      expect(screen.getByText('8+')).toBeInTheDocument();
      expect(plusButton).toHaveStyle({ color: 'LightGray' });
    });
  });
};

describe('RoomAndBed 컴포넌트', () => {
  test('초기 상태가 "상관없음"으로 렌더링되는지 확인', () => {
    render(<RoomAndBed handleFilter={mockHandleFilter} />);

    const bedRoomText = screen.getAllByText('상관없음')[0];
    const bedText = screen.getAllByText('상관없음')[1];
    const bathRoomText = screen.getAllByText('상관없음')[2];

    expect(bedRoomText).toBeInTheDocument();
    expect(bedText).toBeInTheDocument();
    expect(bathRoomText).toBeInTheDocument();
  });

  roomAndBedTest({
    name: '침실',
    testIds: { plus: 'bedroom-plus-button', minus: 'bedroom-minus-button' },
  });

  roomAndBedTest({
    name: '침대',
    testIds: { plus: 'bed-plus-button', minus: 'bed-minus-button' },
  });

  roomAndBedTest({
    name: '욕실',
    testIds: { plus: 'bathroom-plus-button', minus: 'bathroom-minus-button' },
  });
});
