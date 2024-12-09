import { ROUTES } from '@/constants/routeURL';

export const LOGGED_IN_MENU_ITEMS = [
  { id: 'messages', label: '메시지', href: ROUTES.HOME },
  { id: 'trips', label: '여행', href: ROUTES.HOME },
  { id: 'wishlist', label: '위시리스트', href: ROUTES.HOME, hasDivider: true },
  { id: 'host-home', label: '당신의 공간을 에어비앤비하세요', href: ROUTES.HOME },
  { id: 'host-experience', label: '체험 호스팅하기', href: ROUTES.HOME },
  { id: 'refer-host', label: '호스트 추천하기', href: ROUTES.HOME },
  { id: 'account', label: '계정', href: ROUTES.HOME, hasDivider: true },
  { id: 'help', label: '도움말 센터', href: ROUTES.HOME },
  { id: 'logout', label: '로그아웃' },
];

export const LOGGED_OUT_MENU_ITEMS = [
  { id: 'login', label: '로그인', href: ROUTES.LOGIN},
  { id: 'signup', label: '회원 가입', href: ROUTES.LOGIN, hasDivider: true },
  { id: 'host-home', label: '당신의 공간을 에어비앤비하세요', href: ROUTES.HOME },
  { id: 'host-experience', label: '체험 호스팅하기', href: ROUTES.HOME },
  { id: 'help', label: '도움말 센터', href: ROUTES.HOME },
];
