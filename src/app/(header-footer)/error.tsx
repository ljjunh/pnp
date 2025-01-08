'use client';

interface ErrorProps {
  error: Error & { digest: string };
  reset: () => void;
}

// TODO: 나중에 디자인 하기
export default function ErrorPage({ error, reset }: ErrorProps) {
  return (
    <div>
      <span>{error.message}</span>
      <button onClick={reset}>reset</button>
    </div>
  );
}
