'use client';

import { useFormStatus } from 'react-dom';
import { MESSAGES } from '@/constants/login';

export function EmailLoginFormBtn() {
  const { pending } = useFormStatus();

  return (
    <button
      disabled={pending}
      className="w-full rounded-md bg-button-01 py-3 text-white hover:bg-button-02 disabled:cursor-not-allowed disabled:opacity-50"
    >
      {pending ? MESSAGES.SENDING_EMAIL : MESSAGES.CONTINUE}
    </button>
  );
}
