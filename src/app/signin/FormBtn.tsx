'use client';

import { useFormStatus } from 'react-dom';

export function FormBtn({ text }: { text: string }) {
  const { pending } = useFormStatus();

  return (
    <button
      disabled={pending}
      className="flex w-full items-center justify-between rounded-md border border-gray-500 px-4 py-2 hover:bg-gray-100 disabled:cursor-not-allowed disabled:bg-neutral-400 disabled:text-neutral-300"
    >
      <div />
      <div>{pending ? '로그인 중' : text}</div>
      <div />
    </button>
  );
}
