import { useReducer } from 'react';
import { cn } from '@/lib/utils';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CiCircleMinus, CiCirclePlus } from 'react-icons/ci';
import SearchButton from '../Button/SearchButton';
import { Section } from './ExpandedSearchBar';

type GuestValue = number;
const GUEST_MIN = 0 as const;
const GUEST_MAX = 16 as const;
const BABY_PET_MIN = 0 as const;
const BABY_PET_MAX = 5 as const;

interface State {
  adult: GuestValue;
  child: GuestValue;
  baby: GuestValue;
  pet: GuestValue;
}

type Action =
  | { type: 'ADULT'; payload: GuestValue }
  | { type: 'CHILD'; payload: GuestValue }
  | { type: 'BABY'; payload: GuestValue }
  | { type: 'PET'; payload: GuestValue };

const GUEST_TYPES = [
  { key: 'adult' as const, label: '성인' },
  { key: 'child' as const, label: '어린이' },
  { key: 'baby' as const, label: '유아' },
  { key: 'pet' as const, label: '반려동물' },
];

interface SearchGuestProps {
  section: string | null;
  setSection: (section: Section | null) => void;
}

export default function SearchGuest({ section, setSection }: SearchGuestProps) {
  const guestReducer = (state: State, action: Action) => {
    switch (action.type) {
      case 'ADULT':
        return { ...state, adult: action.payload };
      case 'CHILD':
        return { ...state, child: action.payload };
      case 'BABY':
        return { ...state, baby: action.payload };
      case 'PET':
        return { ...state, pet: action.payload };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(guestReducer, {
    adult: GUEST_MIN,
    child: GUEST_MIN,
    baby: BABY_PET_MIN,
    pet: BABY_PET_MIN,
  });

  const handleGuestChange = (type: keyof State, isIncrement: boolean) => {
    const nowValue = state[type];
    const MAX_VALUE = type === 'adult' || type === 'child' ? GUEST_MAX : BABY_PET_MAX;
    const MIN_VALUE = type === 'adult' || type === 'child' ? GUEST_MIN : BABY_PET_MIN;

    if (
      (type === 'adult' || type === 'child') &&
      state['adult'] + state['child'] === GUEST_MAX &&
      isIncrement
    )
      return;

    const changeValue = () => {
      if (nowValue === MIN_VALUE) {
        return isIncrement ? MIN_VALUE + 1 : MIN_VALUE;
      }

      if (nowValue === MAX_VALUE) {
        return isIncrement ? MAX_VALUE : MAX_VALUE - 1;
      }

      return isIncrement ? nowValue + 1 : nowValue - 1;
    };

    dispatch({ type: type.toUpperCase() as Action['type'], payload: changeValue() });
  };

  return (
    <Popover open={section === 'guests'}>
      <PopoverTrigger
        onClick={() => setSection('guests')}
        className={cn(
          'flex flex-1 items-center justify-between rounded-full transition-all duration-300',
          section === 'guests' ? 'bg-shade-01 hover:bg-shade-01' : '',
          section ? 'hover:bg-neutral-04' : 'hover:bg-neutral-02',
        )}
      >
        <div className="flex w-[180px] flex-col items-start py-3.5 pl-6 pr-12">
          <span className="text-sm">여행자</span>
          <span className="max-w-[150px] truncate text-base text-neutral-07">
            {state.adult + state.baby + state.child + state.pet !== 0
              ? [
                  state.adult + state.child > 0 && `게스트 ${state.adult + state.child}명`,
                  state.baby > 0 && `유아 ${state.baby}명`,
                  state.pet > 0 && `반려동물 ${state.pet}마리`,
                ]
                  .filter(Boolean)
                  .join(', ')
              : '게스트 추가'}
          </span>
        </div>
        <div className="pr-2">
          <SearchButton variant={section ? 'expanded' : 'filtered'} />
        </div>
      </PopoverTrigger>
      <PopoverContent
        align="end"
        className="w-[550px] rounded-3xl p-10"
      >
        <div className="space-y-4">
          {GUEST_TYPES.map((guest) => (
            <div
              key={guest.key}
              className="flex flex-row items-center justify-between"
            >
              <span>{guest.label}</span>
              <div className="flex w-40 flex-row items-center justify-between">
                <CiCircleMinus
                  size={36}
                  color={
                    state[guest.key] ===
                    (guest.key === 'adult' || guest.key === 'child' ? GUEST_MIN : BABY_PET_MIN)
                      ? 'LightGray'
                      : 'Gray'
                  }
                  className="cursor-pointer"
                  onClick={() => handleGuestChange(guest.key, false)}
                  role={`${guest.key}-minus-button`}
                />
                <p className="px-4">{state[guest.key]}</p>
                <CiCirclePlus
                  size={36}
                  color={
                    guest.key === 'adult' || guest.key === 'child'
                      ? state['adult'] + state['child'] >= GUEST_MAX
                        ? 'LightGray'
                        : 'Gray'
                      : state[guest.key] >= BABY_PET_MAX
                        ? 'LightGray'
                        : 'Gray'
                  }
                  className="cursor-pointer"
                  onClick={() => handleGuestChange(guest.key, true)}
                  role={`${guest.key}-plus-button`}
                />
              </div>
            </div>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}
