'use client';

import { MouseEvent, ReactNode, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { useRouter } from 'next/navigation';
import { GrClose } from 'react-icons/gr';

export default function Modal({ children }: { children: ReactNode }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (!dialogRef.current?.open) {
      dialogRef.current?.showModal();
    }
  }, []);

  return createPortal(
    <dialog
      className="rounded-lg p-6 shadow-2xl backdrop:bg-black/30"
      onClose={() => router.back()}
      onClick={(e: MouseEvent<HTMLDialogElement>) => {
        if (e.target instanceof HTMLDialogElement) {
          router.back();
        }
      }}
      ref={dialogRef}
    >
      <button
        onClick={() => router.back()}
        className="rounded-full hover:bg-neutral-02"
      >
        <GrClose />
      </button>
      {children}
    </dialog>,
    document.getElementById('modal-root') as HTMLElement,
  );
}
