import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import RoomAndBed from './RoomAndBed';

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

  // 침실 테스트
  describe('침실 상태 변경', () => {
    test('침실 + 버튼 클릭 시 1로 변경', () => {
      render(<RoomAndBed />);

      const plusButton = screen.getByTestId('bedroom-plus-button');
      fireEvent.click(plusButton);

      expect(screen.getByText('1')).toBeInTheDocument();
    });

    test('침실 - 버튼 클릭 시 상태 변경', () => {
      render(<RoomAndBed />);

      const plusButton = screen.getByTestId('bedroom-plus-button');
      const minusButton = screen.getByTestId('bedroom-minus-button');

      // 1로 변경
      fireEvent.click(plusButton);

      // 상관없음으로 변경
      fireEvent.click(minusButton);

      // 상관없음으로 변경되었고, 색이 LightGray로 변경되었는지 확인
      expect(screen.getAllByText('상관없음')[0]).toBeInTheDocument();
      expect(minusButton).toHaveStyle({ color: 'LightGray' });
    });

    test('침실 최대값 8+ 도달', () => {
      render(<RoomAndBed />);

      const plusButton = screen.getByTestId('bedroom-plus-button');

      for (let i = 0; i < 7; i++) {
        fireEvent.click(plusButton);
      }

      fireEvent.click(plusButton);

      // 8+로 변경되었고, 색이 LightGray로 변경되었는지 확인
      expect(screen.getByText('8+')).toBeInTheDocument();
      expect(plusButton).toHaveStyle({ color: 'LightGray' });
    });
  });

  // 침대 테스트
  describe('침대 상태 변경', () => {
    test('침대 + 버튼 클릭 시 1로 변경', () => {
      render(<RoomAndBed />);

      const plusButton = screen.getByTestId('bed-plus-button');
      fireEvent.click(plusButton);

      expect(screen.getByText('1')).toBeInTheDocument();
    });

    test('침대 - 버튼 클릭 시 상태 변경', () => {
      render(<RoomAndBed />);

      const plusButton = screen.getByTestId('bed-plus-button');
      const minusButton = screen.getByTestId('bed-minus-button');

      // 1로 변경
      fireEvent.click(plusButton);

      // 상관없음으로 변경
      fireEvent.click(minusButton);

      expect(screen.getAllByText('상관없음')[0]).toBeInTheDocument();
      expect(minusButton).toHaveStyle({ color: 'LightGray' });
    });

    test('침대 최대값 8+ 도달', () => {
      render(<RoomAndBed />);

      const plusButton = screen.getByTestId('bed-plus-button');

      for (let i = 0; i < 7; i++) {
        fireEvent.click(plusButton);
      }

      fireEvent.click(plusButton);

      expect(screen.getByText('8+')).toBeInTheDocument();
      expect(plusButton).toHaveStyle({ color: 'LightGray' });
    });
  });

  // 욕실 테스트
  describe('욕실 상태 변경', () => {
    test('욕실 + 버튼 클릭 시 1로 변경', () => {
      render(<RoomAndBed />);

      const plusButton = screen.getByTestId('bathroom-plus-button');
      fireEvent.click(plusButton);

      expect(screen.getByText('1')).toBeInTheDocument();
    });

    test('욕실 - 버튼 클릭 시 상태 변경', () => {
      render(<RoomAndBed />);

      const plusButton = screen.getByTestId('bathroom-plus-button');
      const minusButton = screen.getByTestId('bathroom-minus-button');

      // 1로 변경
      fireEvent.click(plusButton);

      // 상관없음으로 변경
      fireEvent.click(minusButton);

      expect(screen.getAllByText('상관없음')[0]).toBeInTheDocument();
      expect(minusButton).toHaveStyle({ color: 'LightGray' });
    });

    test('욕실 최대값 8+ 도달', () => {
      render(<RoomAndBed />);

      const plusButton = screen.getByTestId('bathroom-plus-button');

      for (let i = 0; i < 7; i++) {
        fireEvent.click(plusButton);
      }

      fireEvent.click(plusButton);

      expect(screen.getByText('8+')).toBeInTheDocument();
      expect(plusButton).toHaveStyle({ color: 'LightGray' });
    });
  });
});
