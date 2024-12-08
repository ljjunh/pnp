'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Button from '@/components/common/Button/Button';
import CompactSearchBar from '@/components/common/Header/CompactSearchBar';
import ExpandedSearchBar from '@/components/common/Header/ExpandedSearchBar';

type Section = 'location' | 'checkIn' | 'checkOut' | 'guests';

export default function Home() {
  const [activeSection, setActiveSection] = useState<Section | null>(null);
  const handleSectionChange = (section: Section | null) => {
    setActiveSection(section);
  };
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
      <CompactSearchBar />
      <ExpandedSearchBar
        activeSection={activeSection}
        onSectionChange={handleSectionChange}
      />
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
