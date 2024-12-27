import UserMenuItem from '@/components/common/Header/UserMenuItem';
import { LOGGED_IN_MENU_ITEMS, LOGGED_OUT_MENU_ITEMS } from '@/constants/menuItems';

interface UserMenuProps {
  isLoggedIn: boolean;
  isOpen: boolean;
  onToggleOpen: () => void;
}

export default function UserMenu({ isLoggedIn, isOpen, onToggleOpen }: UserMenuProps) {
  if (!isOpen) return null;
  const menuItems = isLoggedIn ? LOGGED_IN_MENU_ITEMS : LOGGED_OUT_MENU_ITEMS;

  return (
    <div
      role="menu"
      aria-orientation="vertical"
      className="absolute right-0 top-14 z-20 w-[240px] rounded-xl bg-shade-01 text-sm shadow-[0px_0px_15px_rgba(0,0,0,0.1)]"
    >
      <div className="flex cursor-pointer flex-col">
        {menuItems.map((item) => (
          <UserMenuItem
            key={item.id}
            id={item.id}
            label={item.label}
            href={item.href}
            hasDivider={item.hasDivider}
            onToggleOpen={onToggleOpen}
          />
        ))}
      </div>
    </div>
  );
}
