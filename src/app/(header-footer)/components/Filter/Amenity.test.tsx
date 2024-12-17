import { fireEvent, render, screen } from '@testing-library/react';
import Amenity from './Amenity';

const AMENITY_DATA = {
  essential: [
    '와이파이',
    '주방',
    '세탁기',
    '건조기',
    '에어컨',
    '난방',
    '업무 전용 공간',
    'TV',
    '헤어드라이어',
    '다리미',
  ],
  characteristic: [
    '수영장',
    '대형 욕조',
    '무료 주차 공간',
    '전기차 충전시설',
    '아기 침대',
    '킹사이즈 침대',
    '헬스장',
    '바베큐 시설',
    '조식',
    '벽난로',
    '흡연 가능',
  ],
  location: ['해변에 인접', '수변'],
  safety: ['화재경보기', '일산화탄소 경보기'],
};

describe('Amenity 컴포넌트 테스트', () => {
  test('초기 상태 Amenity 태그 테스트', () => {
    render(<Amenity />);

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

  test('더 표시 버튼 클릭 시 아코디언 열림 테스트', () => {
    render(<Amenity />);

    const moreButton = screen.getByText('더 표시');
    fireEvent.click(moreButton);

    // 모든 편의시설 섹션 확인
    expect(screen.queryByText('필수')).toBeInTheDocument();
    expect(screen.queryByText('특징')).toBeInTheDocument();
    expect(screen.queryByText('위치')).toBeInTheDocument();
    expect(screen.queryByText('안전')).toBeInTheDocument();

    // "접기" 버튼 렌더링 확인
    const foldButton = screen.queryByText('접기');
    expect(foldButton).toBeInTheDocument();
  });

  test('더 표시 버튼 클릭 시 모든 태그 렌더링 테스트', () => {
    render(<Amenity />);

    const moreButton = screen.getByText('더 표시');
    fireEvent.click(moreButton);

    // 필수 편의시설 태그 확인
    const essentialTags = AMENITY_DATA.essential.map((amenity) => screen.getAllByText(amenity));
    expect(essentialTags).toHaveLength(10);

    // 특징 편의시설 태그 확인
    const characteristicTags = AMENITY_DATA.characteristic.map((amenity) =>
      screen.getAllByText(amenity),
    );
    expect(characteristicTags).toHaveLength(11);

    // 위치 편의시설 태그 확인
    const locationTags = AMENITY_DATA.location.map((amenity) => screen.getAllByText(amenity));
    expect(locationTags).toHaveLength(2);

    // 안전 편의시설 태그 확인
    const safetyTags = AMENITY_DATA.safety.map((amenity) => screen.getAllByText(amenity));
    expect(safetyTags).toHaveLength(2);
  });

  test('접기 버튼 클릭 시 아코디언 닫힘 테스트', () => {
    render(<Amenity />);

    const moreButton = screen.getByText('더 표시');
    fireEvent.click(moreButton);

    const foldButton = screen.getByText('접기');
    fireEvent.click(foldButton);

    // "더 표시" 버튼 렌더링 확인
    expect(screen.queryByText('더 표시')).toBeInTheDocument();
  });
});
