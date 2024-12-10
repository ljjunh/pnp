export const getActiveDotIndex = (currentIndex: number, totalLength: number): number => {
  // 이미지가 없거나 1장일때는 페이지네이션 닷이 필요 없으므로 -1 반환
  if (totalLength <= 1) {
    return -1;
  }

  // 이미지가 5장 이하면 currentIndex 그대로 반환
  if (totalLength <= 5) {
    return currentIndex;
  }

  // 이미지가 5장 초과일때
  // 첫 두 슬라이드
  if (currentIndex <= 1) {
    return currentIndex;
  }

  // 마지막 두 슬라이드
  if (currentIndex >= totalLength - 2) {
    // 6,7인 경우
    return 5 - (totalLength - currentIndex);
    // 6일때: 5 - (8 - 6) = 5 - 2 = 3
    // 7일때: 5 - (8 - 7) = 5 - 1 = 4
  }

  // 중간 슬라이드들
  return 2; // 나머지는 모두 가운데 점
};

// 예시
// totalLength = 8
// 닷은 항상 ○○○○○ 다섯 개 표시
// 흰 점(●)이 현재 위치

// 1번 슬라이드: ●○○○○  (currentIndex = 0, return 0)
// 2번 슬라이드: ○●○○○  (currentIndex = 1, return 1)
// 3번 슬라이드: ○○●○○  (currentIndex = 2, return 2)
// 4번 슬라이드: ○○●○○  (currentIndex = 3, return 2)
// 5번 슬라이드: ○○●○○  (currentIndex = 4, return 2)
// 6번 슬라이드: ○○●○○  (currentIndex = 5, return 2)
// 7번 슬라이드: ○○○●○  (currentIndex = 6, return 3)
