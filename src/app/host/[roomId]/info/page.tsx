'use client';

import { useReducer } from 'react';
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
  const initialState = {
    guest: MIN_VALUE,
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

  const handleChange = (type: keyof State, isIncrement: boolean) => {
    const nowValue = state[type];

    const changeValue = () => {
      if (type === 'bathroom') {
        if (nowValue === MIN_VALUE) {
          return isIncrement ? nowValue + BATHROOM_INCREMENT : MIN_VALUE;
        }

        if (nowValue === MAX_VALUE) {
          return isIncrement ? MAX_VALUE : nowValue - BATHROOM_INCREMENT;
        }

        return isIncrement ? nowValue + BATHROOM_INCREMENT : nowValue - BATHROOM_INCREMENT;
      }

      if (nowValue === MIN_VALUE) {
        return isIncrement ? nowValue + 1 : MIN_VALUE;
      }

      if (nowValue === MAX_VALUE) {
        return isIncrement ? MAX_VALUE : MAX_VALUE - 1;
      }

      return isIncrement ? nowValue + 1 : nowValue - 1;
    };

    dispatch({ type: type.toUpperCase() as Action['type'], payload: changeValue() });
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
                    className="cursor-pointer"
                    onClick={() => handleChange(key, false)}
                    role={`${key}-minus-button`}
                  />
                  <p className="px-4">{state[key]}</p>
                  <CiCirclePlus
                    size={36}
                    color={state[key] === MAX_VALUE ? 'LightGray' : 'Gray'}
                    className="cursor-pointer"
                    onClick={() => handleChange(key, true)}
                    role={`${key}-plus-button`}
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
