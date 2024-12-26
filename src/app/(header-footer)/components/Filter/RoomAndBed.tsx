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
        <div className="flex flex-row items-center justify-between">
          <span>침실</span>
          <div className="flex w-40 flex-row items-center justify-between">
            <CiCircleMinus
              size={36}
              color={state.bedroom === '상관없음' ? 'LightGray' : 'Gray'}
              className="cursor-pointer"
              onClick={() => {
                handleRoomChange('bedroom', false);
              }}
              data-testid="bedroom-minus-button"
            />
            <p className="px-4">
              {state.bedroom}
              {state.bedroom !== ROOM_DEFAULT && '+'}
            </p>
            <CiCirclePlus
              size={36}
              color={state.bedroom === ROOM_MAX ? 'LightGray' : 'Gray'}
              className="cursor-pointer"
              onClick={() => {
                handleRoomChange('bedroom', true);
              }}
              data-testid="bedroom-plus-button"
            />
          </div>
        </div>
        <div className="flex flex-row items-center justify-between">
          <span>침대</span>
          <div className="flex w-40 flex-row items-center justify-between">
            <CiCircleMinus
              size={36}
              color={state.bed === '상관없음' ? 'LightGray' : 'Gray'}
              className="cursor-pointer"
              onClick={() => {
                handleRoomChange('bed', false);
              }}
              data-testid="bed-minus-button"
            />
            <p className="px-4">
              {state.bed}
              {state.bed !== ROOM_DEFAULT && '+'}
            </p>
            <CiCirclePlus
              size={36}
              color={state.bed === ROOM_MAX ? 'LightGray' : 'Gray'}
              className="cursor-pointer"
              onClick={() => {
                handleRoomChange('bed', true);
              }}
              data-testid="bed-plus-button"
            />
          </div>
        </div>
        <div className="flex flex-row items-center justify-between">
          <span>욕실</span>
          <div className="flex w-40 flex-row items-center justify-between">
            <CiCircleMinus
              size={36}
              color={state.bathroom === '상관없음' ? 'LightGray' : 'Gray'}
              className="cursor-pointer"
              onClick={() => {
                handleRoomChange('bathroom', false);
              }}
              data-testid="bathroom-minus-button"
            />
            <p className="px-4">
              {state.bathroom}
              {state.bathroom !== ROOM_DEFAULT && '+'}
            </p>
            <CiCirclePlus
              size={36}
              color={state.bathroom === ROOM_MAX ? 'LightGray' : 'Gray'}
              className="cursor-pointer"
              onClick={() => {
                handleRoomChange('bathroom', true);
              }}
              data-testid="bathroom-plus-button"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
