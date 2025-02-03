'use client';

import { useEffect, useReducer } from 'react';
import { useRoomStore } from '@/store/useRoomStore';
import { CiCircleMinus, CiCirclePlus } from 'react-icons/ci';

const MIN_VALUE = 1 as const;
const MAX_VALUE = 50 as const;
const BATHROOM_INCREMENT = 0.5 as const;

interface State {
  guest: number;
  bedroom: number;
  bed: number;
  bathroom: number;
}

type Action =
  | { type: 'GUEST'; payload: number }
  | { type: 'BEDROOM'; payload: number }
  | { type: 'BED'; payload: number }
  | { type: 'BATHROOM'; payload: number };

const INFO_ITEMS = [
  { key: 'guest', label: '게스트' },
  { key: 'bedroom', label: '침실' },
  { key: 'bed', label: '침대' },
  { key: 'bathroom', label: '욕실' },
] as const;

export default function Info() {
  const { room } = useRoomStore();

  // 하이드레이션 완료
  useEffect(() => {
    useRoomStore.persist.hasHydrated(); 
  }, [useRoomStore.persist.hasHydrated()]);

  const initialState = {
    guest: room?.capacity || MIN_VALUE,
    bedroom: MIN_VALUE,
    bed: MIN_VALUE,
    bathroom: MIN_VALUE,
  };

  const infoReducer = (state: State, action: Action) => {
    switch (action.type) {
      case 'GUEST':
        return { ...state, guest: action.payload };
      case 'BEDROOM':
        return { ...state, bedroom: action.payload };
      case 'BED':
        return { ...state, bed: action.payload };
      case 'BATHROOM':
        return { ...state, bathroom: action.payload };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(infoReducer, initialState);

  const calculateNewValue = (
    type: keyof State,
    currentValue: number,
    isIncrement: boolean,
  ): number => {
    const isBathroom = type === 'bathroom';
    const increment = isBathroom ? BATHROOM_INCREMENT : 1;

    if (currentValue === MIN_VALUE) {
      return isIncrement ? currentValue + increment : MIN_VALUE;
    }

    if (currentValue === MAX_VALUE) {
      return isIncrement ? MAX_VALUE : currentValue - increment;
    }

    return isIncrement ? currentValue + increment : currentValue - increment;
  };

  const handleChange = (type: keyof State, isIncrement: boolean) => {
    const newValue = calculateNewValue(type, state[type], isIncrement);
    dispatch({ type: type.toUpperCase() as Action['type'], payload: newValue });
  };

  return (
    <div className="flex h-full w-full flex-col items-start justify-center px-80">
      <input
        type="hidden"
        name="step"
        value="info"
      />
      <p className="pb-3 text-3xl">숙소 기본 정보를 알려주세요</p>
      <div className="mt-4 w-full space-y-8 text-lg">
        <p>침대 유형과 같은 세부 사항은 나중에 추가하실 수 있습니다.</p>
        <div className="space-y-4">
          {INFO_ITEMS.map(({ key, label }) => (
            <div key={`${label}-${key}`}>
              <input
                type="hidden"
                name={key}
                value={state[key]}
              />
              <div className="flex flex-row items-center justify-between">
                <span>{label}</span>
                <div className="flex w-40 flex-row items-center justify-between">
                  <CiCircleMinus
                    size={36}
                    color={state[key] === MIN_VALUE ? 'LightGray' : 'Gray'}
                    className="cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
                    onClick={() => handleChange(key, false)}
                    role={`${key}-minus-button`}
                    tabIndex={0}
                    aria-label={`${label} 감소`}
                    onKeyDown={(e) => e.key === 'Enter' && handleChange(key, false)}
                  />
                  <p className="px-4">{state[key]}</p>
                  <CiCirclePlus
                    size={36}
                    color={state[key] === MAX_VALUE ? 'LightGray' : 'Gray'}
                    className="cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
                    onClick={() => handleChange(key, true)}
                    role={`${key}-plus-button`}
                    tabIndex={0}
                    aria-label={`${label} 증가`}
                    onKeyDown={(e) => e.key === 'Enter' && handleChange(key, true)}
                  />
                </div>
              </div>
              {key !== 'bathroom' && <hr className="mt-4" />}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
