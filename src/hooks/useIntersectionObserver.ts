import { useCallback, useEffect, useRef } from 'react';

interface UseIntersectionObserverProps {
  onIntersect: () => void;
  disabled?: boolean;
  threshold?: number;
}

/**
 * 요소의 화면 노출 여부를 감지하고 콜백함수를 실행해주는 커스텀 훅
 * @param onIntersect 요소가 화면에 노출될 때 실행될 콜백 함수
 * @param disabled 활성화 여부 (기본값: false)
 * @param threshold 요소가 얼마나 보여야 감지할지 결정하는 비율 (0~1, 기본값: 0.5)
 * @returns 관찰할 요소에 연결할 ref 객체
 */

export function useIntersectionObserver({
  onIntersect,
  disabled = false,
  threshold = 0.5,
}: UseIntersectionObserverProps) {
  // 관찰할 요소를 참조하기 위한 ref
  const observerRef = useRef<HTMLDivElement>(null);

  // 요소가 화면에 보이면 실행될 함수
  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [target] = entries; // 관찰 대상 요소
      if (target.isIntersecting) {
        // 이 훅에서 return해주는 ref를 적용햔 요소가 화면에 교차되면
        onIntersect(); // props로 받은 콜백함수 실행
      }
    },
    [onIntersect],
  );

  useEffect(() => {
    const element = observerRef.current; // ref가 연결된 요소
    if (!element || disabled) return; // 요소가 없거나 비활성화 상태면 중단

    // IntersectionObserver(관찰되었을 때 실행할 함수, 얼마나 보여야 감지할지)생성
    const observer = new IntersectionObserver(handleObserver, {
      threshold,
    });

    // 어떤 요소를 감지할지 지정
    observer.observe(element); // 관찰 시작

    // 클린업
    return () => observer.disconnect();
  }, [handleObserver, disabled, threshold]);

  return observerRef;
}
