import { ReactNode, useEffect, useRef } from 'react';
import { ModalIdType, useModal } from '@/hooks/useModal';

interface ModalProviderProps {
  children: ReactNode;
  modalId: ModalIdType;
}

/**
 * 모달 표시와 동작을 처리하는 재사용 가능한 모달 제공자 컴포넌트
 *
 * @component
 * @example
 * ```tsx
 * <ModalProvider modalId={MODAL_ID.example-modal}>
 *   <div>모달 내용</div>
 * </ModalProvider>
 * ```
 *
 * @param props - 컴포넌트 props
 * @param props.children - 모달 내부에 렌더링될 내용
 * @param props.modalId - 모달 인스턴스의 고유 식별자
 *
 * @features
 * - 외부 클릭 시 닫기 처리
 * - ESC 키 누를 시 닫기 처리
 * - 모달 열림/닫힘 시 body 스크롤 제어
 * - 모달 외부 배경 딤드 처리
 *
 * @returns 모달 UI를 포함한 React 컴포넌트
 */
const ModalProvider = ({ children, modalId }: ModalProviderProps) => {
  const { modalState, handleCloseModal } = useModal(modalId);
  const modalRef = useRef<HTMLDivElement>(null);
  const handleOutsideClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      handleCloseModal();
    }
  };

  useEffect(() => {
    if (modalState) {
      document.body.style.overflow = 'hidden';

      const handleEscKey = (event: KeyboardEvent) => {
        if (event.key === 'Escape') {
          handleCloseModal();
        }
      };
      document.addEventListener('keydown', handleEscKey);

      return () => {
        document.body.style.overflow = 'unset';
        document.removeEventListener('keydown', handleEscKey);
      };
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [modalState, handleCloseModal]);

  return (
    <>
      {modalState && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
          onClick={handleOutsideClick}
        >
          <div
            ref={modalRef}
            className="relative flex overflow-y-auto rounded-xl bg-white"
          >
            {children}
          </div>
        </div>
      )}
    </>
  );
};

export default ModalProvider;
