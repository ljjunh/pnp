'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

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
      <Link href="/test">Test</Link>
    </div>
  );
}
