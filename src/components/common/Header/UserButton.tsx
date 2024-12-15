import Image from 'next/image';
import { FaUserCircle } from 'react-icons/fa';
import { RxHamburgerMenu } from 'react-icons/rx';

interface UserButtonProps {
  isLoggedIn: boolean;
  onClick: () => void;
  profileImage?: string;
}

export default function UserButton({ isLoggedIn, onClick, profileImage }: UserButtonProps) {
  return (
    <div>
      <button
        onClick={onClick}
        aria-label="사용자 메뉴 열기"
        className="flex items-center gap-3 rounded-full border border-gray-300 py-2 pl-3.5 pr-2 hover:shadow-md"
      >
        <RxHamburgerMenu size={16} />
        <div className="ml-1 *:rounded-full">
          {isLoggedIn && profileImage ? (
            <Image
              src={profileImage}
              alt="Profile"
              width={32}
              height={32}
              className="object-cover"
              priority={false}
              loading='lazy'
            />
          ) : (
            <FaUserCircle
              size={32}
              className="text-gray-500"
            />
          )}
        </div>
      </button>
    </div>
  );
}
