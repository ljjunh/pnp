'use client';

interface ErrorProps {
  error: Error & { digest: string };
  reset: () => void;
}

export default function ErrorPage({ error, reset }: ErrorProps) {
  return (
    <div>
      <span>{error.message}</span>
      <button onClick={reset}>reset</button>
    </div>
  );
}
