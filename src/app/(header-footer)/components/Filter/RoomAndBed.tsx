import { useReducer } from 'react';
import { CiCircleMinus, CiCirclePlus } from 'react-icons/ci';

const initialState = {
  bedRoom: '상관없음',
  bed: '상관없음',
  bathRoom: '상관없음',
};

interface State {
  bedRoom: string | number;
  bed: string | number;
  bathRoom: string | number;
}

type Action =
  | { type: 'BEDROOM'; payload: string | number }
  | { type: 'BED'; payload: string | number }
  | { type: 'BATHROOM'; payload: string | number };

export default function RoomAndBed() {
  function roomReducer(state: State, action: Action) {
    switch (action.type) {
      case 'BEDROOM':
        return { ...state, bedRoom: action.payload };
      case 'BED':
        return { ...state, bed: action.payload };
      case 'BATHROOM':
        return { ...state, bathRoom: action.payload };
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

      if (nowValue === 7 && isIncrement) {
        return '8+';
      }

      if (nowValue === '8+') {
        return isIncrement ? '8+' : 7;
      }

      return isIncrement ? Number(nowValue) + 1 : Number(nowValue) - 1;
    };

    const newValue = changeValue();

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
              color={state.bedRoom === '상관없음' ? 'LightGray' : 'Gray'}
              className="cursor-pointer"
              onClick={() => {
                handleRoomChange('bedRoom', false);
              }}
              data-testid="bedroom-minus-button"
            />
            <p className="px-4">{state.bedRoom}</p>
            <CiCirclePlus
              size={36}
              color={state.bedRoom === '8+' ? 'LightGray' : 'Gray'}
              className="cursor-pointer"
              onClick={() => {
                handleRoomChange('bedRoom', true);
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
            <p className="px-4">{state.bed}</p>
            <CiCirclePlus
              size={36}
              color={state.bed === '8+' ? 'LightGray' : 'Gray'}
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
              color={state.bathRoom === '상관없음' ? 'LightGray' : 'Gray'}
              className="cursor-pointer"
              onClick={() => {
                handleRoomChange('bathRoom', false);
              }}
              data-testid="bathroom-minus-button"
            />
            <p className="px-4">{state.bathRoom}</p>
            <CiCirclePlus
              size={36}
              color={state.bathRoom === '8+' ? 'LightGray' : 'Gray'}
              className="cursor-pointer"
              onClick={() => {
                handleRoomChange('bathRoom', true);
              }}
              data-testid="bathroom-plus-button"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
