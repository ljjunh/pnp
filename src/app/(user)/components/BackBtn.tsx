import Link from 'next/link';
import { IoIosArrowBack } from 'react-icons/io';

interface BackBtnProps {
  url: string;
}

export function BackBtn({ url }: BackBtnProps) {
  return (
    <Link
      href={url}
      className="rounded-full p-1 hover:bg-gray-100"
    >
      <IoIosArrowBack className="size-6" />
    </Link>
  );
}
