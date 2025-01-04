'use client';

import { useReducer } from 'react';
import Link from 'next/link';
import { CiCircleMinus, CiCirclePlus } from 'react-icons/ci';

const MIN_VALUE = 1 as const;
const MAX_VALUE = 50 as const;

interface State {
  guest: number;
  bedroom: number;
  bed: number;
}

type Action =
  | { type: 'GUEST'; payload: number }
  | { type: 'BEDROOM'; payload: number }
  | { type: 'BED'; payload: number };

export default function Info() {
  const initialState = {
    guest: MIN_VALUE,
    bedroom: MIN_VALUE,
    bed: MIN_VALUE,
  };

  function infoReducer(state: State, action: Action) {
    switch (action.type) {
      case 'GUEST':
        return { ...state, guest: action.payload };
      case 'BEDROOM':
        return { ...state, bedroom: action.payload };
      case 'BED':
        return { ...state, bed: action.payload };
      default:
        return state;
    }
  }

  const [state, dispatch] = useReducer(infoReducer, initialState);

  const handleChange = (type: keyof State, isIncrement: boolean) => {
    const nowValue = state[type];

    const changeValue = () => {
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
    <div className="py-11">
      <p className="pb-3 text-3xl">기본 사항 작성하기</p>
      <div className="mt-4 space-y-8">
        <p>숙박 가능한 인원은 몇 명 인가요?</p>
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
        </div>
      </div>
      <div className="mt-8">
        <p>모든 침실에 잠금 장치가 설치되어 있나요?</p>
        <div className="mt-4 flex flex-col space-y-4">
          <div>
            <input
              type="radio"
              id="yes"
              name="lock"
              value="yes"
              className="mr-2"
            />
            <label htmlFor="yes">예</label>
          </div>
          <div>
            <input
              type="radio"
              id="no"
              name="lock"
              value="no"
              className="mr-2"
            />
            <label htmlFor="no">아니요</label>
          </div>
        </div>
      </div>
      <div className="fixed bottom-0 left-0 right-0 flex h-20 items-center justify-center border-t border-neutral-04 bg-white">
        <div className="flex w-full flex-row items-center justify-between px-20">
          <Link
            href={'..'}
            className="border-b border-black text-base"
          >
            뒤로
          </Link>
          <button className="rounded-xl bg-black px-8 py-3 text-white">다음</button>
        </div>
      </div>
    </div>
  );
}
