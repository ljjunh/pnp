import { ReactNode, useEffect, useRef } from 'react';
import { ModalIdType, useModal } from '@/hooks/useModal';

interface ModalProviderProps {
  children: ReactNode;
  modalId: ModalIdType;
}

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
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [modalState]);

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
