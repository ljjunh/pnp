'use client';

import { useReducer } from 'react';
import { CiCircleMinus, CiCirclePlus } from 'react-icons/ci';

const MIN_VALUE = 0 as const;
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

export default function Info() {
  const initialState = {
    guest: MIN_VALUE,
    bedroom: MIN_VALUE,
    bed: MIN_VALUE,
    bathroom: MIN_VALUE,
  };

  function infoReducer(state: State, action: Action) {
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
  }

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
      <p className="pb-3 text-3xl">숙소 기본 정보를 알려주세요</p>
      <div className="mt-4 w-full space-y-8 text-lg">
        <p>침대 유형과 같은 세부 사항은 나중에 추가하실 수 있습니다.</p>
        <div className="space-y-4">
          <div className="flex flex-row items-center justify-between">
            <span>게스트</span>
            <div className="flex w-40 flex-row items-center justify-between">
              <CiCircleMinus
                size={36}
                color={state.guest === MIN_VALUE ? 'LightGray' : 'Gray'}
                className="cursor-pointer"
                onClick={() => {
                  handleChange('guest', false);
                }}
                role="guest-minus-button"
              />
              <p className="px-4">{state.guest}</p>
              <CiCirclePlus
                size={36}
                color={state.guest === MAX_VALUE ? 'LightGray' : 'Gray'}
                className="cursor-pointer"
                onClick={() => {
                  handleChange('guest', true);
                }}
                role="guest-plus-button"
              />
            </div>
          </div>
          <hr />
          <div className="flex flex-row items-center justify-between">
            <span>침실</span>
            <div className="flex w-40 flex-row items-center justify-between">
              <CiCircleMinus
                size={36}
                color={state.bedroom === MIN_VALUE ? 'LightGray' : 'Gray'}
                className="cursor-pointer"
                onClick={() => {
                  handleChange('bedroom', false);
                }}
                role="bedroom-minus-button"
              />
              <p className="px-4">{state.bedroom}</p>
              <CiCirclePlus
                size={36}
                color={state.bedroom === MAX_VALUE ? 'LightGray' : 'Gray'}
                className="cursor-pointer"
                onClick={() => {
                  handleChange('bedroom', true);
                }}
                role="bedroom-plus-button"
              />
            </div>
          </div>
          <hr />
          <div className="flex flex-row items-center justify-between">
            <span>침대</span>
            <div className="flex w-40 flex-row items-center justify-between">
              <CiCircleMinus
                size={36}
                color={state.bed === MIN_VALUE ? 'LightGray' : 'Gray'}
                className="cursor-pointer"
                onClick={() => {
                  handleChange('bed', false);
                }}
                role="bed-minus-button"
              />
              <p className="px-4">{state.bed}</p>
              <CiCirclePlus
                size={36}
                color={state.bed === MAX_VALUE ? 'LightGray' : 'Gray'}
                className="cursor-pointer"
                onClick={() => {
                  handleChange('bed', true);
                }}
                role="bed-plus-button"
              />
            </div>
          </div>
          <hr />
          <div className="flex flex-row items-center justify-between">
            <span>욕실</span>
            <div className="flex w-40 flex-row items-center justify-between">
              <CiCircleMinus
                size={36}
                color={state.bathroom === MIN_VALUE ? 'LightGray' : 'Gray'}
                className="cursor-pointer"
                onClick={() => {
                  handleChange('bathroom', false);
                }}
                role="bathroom-minus-button"
              />
              <p className="px-4">{state.bathroom}</p>
              <CiCirclePlus
                size={36}
                color={state.bathroom === MAX_VALUE ? 'LightGray' : 'Gray'}
                className="cursor-pointer"
                onClick={() => {
                  handleChange('bathroom', true);
                }}
                role="bathroom-plus-button"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
