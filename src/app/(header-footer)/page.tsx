import Link from 'next/link';
import Button from '@/components/common/Button/Button';

export default function Home() {
  return (
    <div>
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
