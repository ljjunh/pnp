'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Button from '@/components/common/Button';

export default function Home() {
  const [message, setMessage] = useState('');
  useEffect(() => {
    fetch('/sample')
      .then((res) => res.json())
      .then((data) => setMessage(data.message));
  }, []);
  return (
    <div>
      <h1>Hello</h1>
      <p>{message}</p>
      <Button
        variant="tertiary"
        isLoading
      >
        Tertiary Focus Test
      </Button>
      <Link href="/test">Test</Link>
    </div>
  );
}
