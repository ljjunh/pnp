import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import RoomAndBed from './RoomAndBed';

interface TestConfig {
  name: string;
  testIds: {
    plus: string;
    minus: string;
  };
}

const roomAndBedTest = ({ name, testIds }: TestConfig) => {
  describe(`${name} 상태 변경`, () => {
    test(`${name} + 버튼 클릭 시 1로 변경`, () => {
      render(<RoomAndBed />);
      const plusButton = screen.getByTestId(testIds.plus);
      fireEvent.click(plusButton);
      expect(screen.getByText('1')).toBeInTheDocument();
    });

    test(`${name} - 버튼 클릭 시 상태 변경`, () => {
      render(<RoomAndBed />);
      const plusButton = screen.getByTestId(testIds.plus);
      const minusButton = screen.getByTestId(testIds.minus);

      fireEvent.click(plusButton);
      fireEvent.click(minusButton);

      expect(screen.getAllByText('상관없음')[0]).toBeInTheDocument();
      expect(minusButton).toHaveStyle({ color: 'LightGray' });
    });

    test(`${name} 최대값 8+ 도달`, () => {
      render(<RoomAndBed />);
      const plusButton = screen.getByTestId(testIds.plus);

      for (let i = 0; i < 8; i++) {
        fireEvent.click(plusButton);
      }

      expect(screen.getByText('8+')).toBeInTheDocument();
      expect(plusButton).toHaveStyle({ color: 'LightGray' });
    });
  });
};

describe('RoomAndBed 컴포넌트', () => {
  test('초기 상태가 "상관없음"으로 렌더링되는지 확인', () => {
    render(<RoomAndBed />);

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
