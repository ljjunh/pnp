/**
 * 슬라이드 페이지네이션에서 활성화될 점의 인덱스를 계산하는 함수
 *
 * @param currentIndex - 현재 활성화된 슬라이드의 인덱스 (0부터 시작)
 * @param totalLength - 전체 슬라이드의 개수
 * @returns 5개의 점으로 구성된 페이지네이션에서 활성화될 점의 인덱스
 * @description
 * 항상 5개의 점으로 구성된 페이지네이션에서 현재 슬라이드에 해당하는 활성 점의 위치를 계산
 * 슬라이드의 총 개수와 현재 슬라이드 인덱스를 기반으로 다음과 같은 규칙을 적용
 * - 슬라이드가 1개 이하: 페이지네이션 없음 (-1 반환)
 * - 슬라이드가 5개 이하: 현재 인덱스 그대로 반환
 * - 슬라이드가 5개 초과:
 *   - 첫 두 슬라이드: 인덱스 그대로 (0 또는 1)
 *   - 중간 슬라이드들: 가운데 점 (2)
 *   - 마지막 두 슬라이드: 뒤에서 첫째/둘째 점
 *
 * @example
 * ```ts
 * // 총 8장의 슬라이드가 있는 경우
 * getActiveDotIndex(0, 8) // returns 0 (●○○○○)
 * getActiveDotIndex(1, 8) // returns 1 (○●○○○)
 * getActiveDotIndex(2, 8) // returns 2 (○○●○○)
 * getActiveDotIndex(3, 8) // returns 2 (○○●○○)
 * getActiveDotIndex(4, 8) // returns 2 (○○●○○)
 * getActiveDotIndex(5, 8) // returns 2 (○○●○○)
 * getActiveDotIndex(6, 8) // returns 3 (○○○●○)
 * getActiveDotIndex(7, 8) // returns 4 (○○○○●)
 *
 * // 총 3장의 슬라이드가 있는 경우
 * getActiveDotIndex(0, 3) // returns 0 (●○○)
 * getActiveDotIndex(1, 3) // returns 1 (○●○)
 * getActiveDotIndex(2, 3) // returns 2 (○○●)
 *
 * // 슬라이드가 1장인 경우
 * getActiveDotIndex(0, 1) // returns -1 (페이지네이션 없음)
 * ```
 *
 */
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
