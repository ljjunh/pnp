import { IconType } from 'react-icons';
import { BsSuitcaseLg } from 'react-icons/bs';
import { BsChatSquare } from 'react-icons/bs';
import { FaAirbnb } from 'react-icons/fa';

export interface FilterItem {
  id: number;
  label: string;
  icon: IconType;
}

export const filterItems = [
  {
    id: 1,
    label: '전체',
    icon: BsChatSquare,
  },
  {
    id: 2,
    label: '여행',
    icon: BsSuitcaseLg,
  },
  {
    id: 3,
    label: '지원',
    icon: FaAirbnb,
  },
] as const satisfies FilterItem[];
