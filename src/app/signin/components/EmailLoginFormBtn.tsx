'use client';

import { useFormStatus } from 'react-dom';

export function EmailLoginFormBtn() {
  const { pending } = useFormStatus();

  return (
    <button
      disabled={pending}
      className="w-full rounded-md bg-button-01 py-3 text-white hover:bg-button-02 disabled:cursor-not-allowed disabled:opacity-50"
    >
      {pending ? '이메일 전송 중' : '계속'}
    </button>
  );
}
