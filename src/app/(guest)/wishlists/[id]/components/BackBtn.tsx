import Link from 'next/link';
import { ROUTES } from '@/constants/routeURL';
import { IoIosArrowBack } from 'react-icons/io';

export function BackBtn() {
  return (
    <Link
      href={ROUTES.USER.WISHLISTS}
      className="rounded-full p-1 hover:bg-gray-100"
    >
      <IoIosArrowBack className="size-6" />
    </Link>
  );
}
