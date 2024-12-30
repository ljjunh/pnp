import Amenity from '@/app/(header-footer)/components/filter/Amenity';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {
  CHARACTERISTIC_AMENITIES,
  ESSENTIAL_AMENITIES,
  LOCATION_AMENITIES,
  SAFETY_AMENITIES,
  TAG_LIST,
} from '@/constants/amenity';

const AMENITY_DATA = {
  ESSENTIAL_AMENITIES,
  CHARACTERISTIC_AMENITIES,
  LOCATION_AMENITIES,
  SAFETY_AMENITIES,
};

describe('Amenity 컴포넌트 테스트', () => {
  const mockHandleFilter = jest.fn();
  const mockAmenityArray: string[] = [];
  const user = userEvent.setup();

  test('초기 상태 Amenity 태그 테스트', () => {
    render(
      <Amenity
        handleFilter={mockHandleFilter}
        amenityArray={mockAmenityArray}
      />,
    );

    expect(screen.queryByText('와이파이')).toBeInTheDocument();
    expect(screen.queryByText('주방')).toBeInTheDocument();
    expect(screen.queryByText('세탁기')).toBeInTheDocument();
    expect(screen.queryByText('건조기')).toBeInTheDocument();
    expect(screen.queryByText('에어컨')).toBeInTheDocument();
    expect(screen.queryByText('난방')).toBeInTheDocument();

    // 더 표시 버튼 렌더링 확인
    const moreButton = screen.queryByText('더 표시');
    expect(moreButton).toBeInTheDocument();
  });

  test('더 표시 버튼 클릭 시 아코디언 열림 테스트', async () => {
    render(
      <Amenity
        handleFilter={mockHandleFilter}
        amenityArray={mockAmenityArray}
      />,
    );

    const moreButton = screen.getByText('더 표시');
    await user.click(moreButton);

    // 모든 편의시설 섹션 확인
    expect(screen.queryByText('필수')).toBeInTheDocument();
    expect(screen.queryByText('특징')).toBeInTheDocument();
    expect(screen.queryByText('위치')).toBeInTheDocument();
    expect(screen.queryByText('안전')).toBeInTheDocument();

    // "접기" 버튼 렌더링 확인
    const foldButton = screen.queryByText('접기');
    expect(foldButton).toBeInTheDocument();
  });

  test('더 표시 버튼 클릭 시 모든 태그 렌더링 테스트', async () => {
    render(
      <Amenity
        handleFilter={mockHandleFilter}
        amenityArray={mockAmenityArray}
      />,
    );

    const moreButton = screen.getByText('더 표시');
    await user.click(moreButton);

    // 필수 편의시설 태그 확인
    const essentialTags = AMENITY_DATA.ESSENTIAL_AMENITIES.map((amenity) =>
      screen.getAllByText(TAG_LIST[amenity].name),
    );
    expect(essentialTags).toHaveLength(10);

    // 특징 편의시설 태그 확인
    const characteristicTags = AMENITY_DATA.CHARACTERISTIC_AMENITIES.map((amenity) =>
      screen.getAllByText(TAG_LIST[amenity].name),
    );
    expect(characteristicTags).toHaveLength(11);

    // 위치 편의시설 태그 확인
    const locationTags = AMENITY_DATA.LOCATION_AMENITIES.map((amenity) =>
      screen.getAllByText(TAG_LIST[amenity].name),
    );
    expect(locationTags).toHaveLength(2);

    // 안전 편의시설 태그 확인
    const safetyTags = AMENITY_DATA.SAFETY_AMENITIES.map((amenity) =>
      screen.getAllByText(TAG_LIST[amenity].name),
    );
    expect(safetyTags).toHaveLength(2);
  });

  test('접기 버튼 클릭 시 아코디언 닫힘 테스트', async () => {
    render(
      <Amenity
        handleFilter={mockHandleFilter}
        amenityArray={mockAmenityArray}
      />,
    );

    const moreButton = screen.getByText('더 표시');
    await user.click(moreButton);

    const foldButton = screen.getByText('접기');
    await user.click(foldButton);

    // "더 표시" 버튼 렌더링 확인
    expect(screen.queryByText('더 표시')).toBeInTheDocument();
  });

  test('태그 클릭 시 handleFilter 함수 호출 테스트', async () => {
    render(
      <Amenity
        handleFilter={mockHandleFilter}
        amenityArray={mockAmenityArray}
      />,
    );

    const tag = screen.getByText('세탁기');
    await user.click(tag);

    expect(mockHandleFilter).toHaveBeenCalledWith(['SYSTEM_WASHER'], 'amenityArray');
  });
});
