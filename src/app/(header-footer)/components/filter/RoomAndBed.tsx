'use client';

import { useReducer } from 'react';
import { FilterType } from '@/schemas/rooms';
import { CiCircleMinus, CiCirclePlus } from 'react-icons/ci';

type RoomValue = '상관없음' | number;
const ROOM_DEFAULT = '상관없음' as const;
const ROOM_MAX = 8 as const;

interface State {
  bedroom: RoomValue;
  bed: RoomValue;
  bathroom: RoomValue;
}

type Action =
  | { type: 'BEDROOM'; payload: RoomValue }
  | { type: 'BED'; payload: RoomValue }
  | { type: 'BATHROOM'; payload: RoomValue };

interface RoomAndBedProps {
  bedroom?: RoomValue;
  bed?: RoomValue;
  bathroom?: RoomValue;
  handleFilter: (newState: RoomValue | null, type: keyof FilterType) => void;
}

const ROOM_TYPES = [
  { key: 'bedroom' as const, label: '침실' },
  { key: 'bed' as const, label: '침대' },
  { key: 'bathroom' as const, label: '욕실' },
] as const;

export default function RoomAndBed({ bedroom, bed, bathroom, handleFilter }: RoomAndBedProps) {
  const initialState = {
    bedroom: bedroom ?? ROOM_DEFAULT,
    bed: bed ?? ROOM_DEFAULT,
    bathroom: bathroom ?? ROOM_DEFAULT,
  };

  function roomReducer(state: State, action: Action) {
    switch (action.type) {
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

  const [state, dispatch] = useReducer(roomReducer, initialState);

  const handleRoomChange = (type: keyof State, isIncrement: boolean) => {
    const nowValue = state[type];

    const changeValue = () => {
      if (nowValue === '상관없음') {
        return isIncrement ? 1 : '상관없음';
      }

      if (nowValue === 1 && !isIncrement) {
        return '상관없음';
      }

      if (nowValue === ROOM_MAX) {
        return isIncrement ? ROOM_MAX : 7;
      }

      return isIncrement ? Number(nowValue) + 1 : Number(nowValue) - 1;
    };

    const newValue = changeValue();

    handleFilter(newValue === ROOM_DEFAULT ? null : newValue, type as keyof FilterType);

    dispatch({
      type: type.toUpperCase() as Action['type'],
      payload: newValue,
    });
  };

  return (
    <div className="px-6 py-8">
      <div className="pb-4">
        <span className="text-lg font-semibold">침실과 침대</span>
      </div>
      <div className="space-y-4">
        {ROOM_TYPES.map((room) => (
          <div
            key={room.key}
            className="flex flex-row items-center justify-between"
          >
            <span>{room.label}</span>
            <div className="flex w-40 flex-row items-center justify-between">
              <CiCircleMinus
                size={36}
                color={state[room.key] === '상관없음' ? 'LightGray' : 'Gray'}
                className="cursor-pointer"
                onClick={() => handleRoomChange(room.key, false)}
                role={`${room.key}-minus-button`}
              />
              <p className="px-4">
                {state[room.key]}
                {state[room.key] !== ROOM_DEFAULT && '+'}
              </p>
              <CiCirclePlus
                size={36}
                color={state[room.key] === ROOM_MAX ? 'LightGray' : 'Gray'}
                className="cursor-pointer"
                onClick={() => handleRoomChange(room.key, true)}
                role={`${room.key}-plus-button`}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
