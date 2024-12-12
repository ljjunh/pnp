import { HiOutlineMinus, HiOutlinePlus } from 'react-icons/hi';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';

interface GuestCounts {
  adults: number;
  children: number;
  infants: number;
  pets: number;
}

interface RoomBookingDropdownProps {
  isOpen: boolean;
  onToggle: () => void;
  guestCounts: GuestCounts;
  onGuestChange: (type: keyof GuestCounts, value: number) => void;
}

export default function RoomBookingDropdown({
  isOpen,
  onToggle,
  guestCounts,
  onGuestChange,
}: RoomBookingDropdownProps) {
  const totalGuests = guestCounts.adults + guestCounts.children;

  const handleIncrement = (type: keyof GuestCounts) => {
    onGuestChange(type, guestCounts[type] + 1);
  };

  const handleDecrement = (type: keyof GuestCounts) => {
    onGuestChange(type, guestCounts[type] - 1);
  };

  return (
    <div className="relative col-span-2">
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between px-3 py-2.5 text-left"
      >
        <div>
          <div className="text-[10px]">인원</div>
          <div className="text-sm">
            <span>게스트 {totalGuests}명</span>
            {guestCounts.infants >= 1 && <span>, 유아 {guestCounts.infants}명</span>}
            {guestCounts.pets >= 1 && <span>, 반려동물 {guestCounts.pets}마리</span>}
          </div>
        </div>
        {isOpen ? <IoIosArrowUp size={22} /> : <IoIosArrowDown size={22} />}
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0"
            onClick={onToggle}
          />

          <div className="absolute right-0 top-full z-10 w-full rounded-lg border bg-white p-4 shadow-lg">
            {/* 성인 */}
            <div className="mb-6 flex items-center justify-between">
              <div>
                <div>성인</div>
                <div className="text-sm">13세 이상</div>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => handleDecrement('adults')}
                  disabled={guestCounts.adults <= 1}
                  className={`flex h-8 w-8 items-center justify-center rounded-full border border-neutral-06 text-neutral-06 ${guestCounts.adults <= 1 ? 'cursor-not-allowed border-neutral-02 text-neutral-02' : 'hover:border-shade-02 hover:text-shade-02'}`}
                >
                  <HiOutlineMinus />
                </button>
                <span className="w-6 text-center">{guestCounts.adults}</span>
                <button
                  onClick={() => handleIncrement('adults')}
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-neutral-06 text-neutral-06 hover:border-shade-02 hover:text-shade-02"
                >
                  <HiOutlinePlus />
                </button>
              </div>
            </div>

            {/* 어린이 */}
            <div className="mb-6 flex items-center justify-between">
              <div>
                <div>어린이</div>
                <div className="text-sm">2~12세</div>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => handleDecrement('children')}
                  disabled={guestCounts.children <= 0}
                  className={`flex h-8 w-8 items-center justify-center rounded-full border border-neutral-06 text-neutral-06 ${guestCounts.children <= 0 ? 'cursor-not-allowed border-neutral-02 text-neutral-02' : 'hover:border-shade-02 hover:text-shade-02'}`}
                >
                  <HiOutlineMinus />
                </button>
                <span className="w-6 text-center">{guestCounts.children}</span>
                <button
                  onClick={() => handleIncrement('children')}
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-neutral-06 text-neutral-06 hover:border-shade-02 hover:text-shade-02"
                >
                  <HiOutlinePlus />
                </button>
              </div>
            </div>

            {/* 유아 */}
            <div className="mb-6 flex items-center justify-between">
              <div>
                <div>유아</div>
                <div className="text-sm">2세 미만</div>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => handleDecrement('infants')}
                  disabled={guestCounts.infants <= 0}
                  className={`flex h-8 w-8 items-center justify-center rounded-full border border-neutral-06 text-neutral-06 ${guestCounts.infants <= 0 ? 'cursor-not-allowed border-neutral-02 text-neutral-02' : 'hover:border-shade-02 hover:text-shade-02'}`}
                >
                  <HiOutlineMinus />
                </button>
                <span className="w-6 text-center">{guestCounts.infants}</span>
                <button
                  onClick={() => handleIncrement('infants')}
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-neutral-06 text-neutral-06 hover:border-shade-02 hover:text-shade-02"
                >
                  <HiOutlinePlus />
                </button>
              </div>
            </div>

            {/* 반려동물 */}
            <div className="flex items-center justify-between">
              <div>
                <div>반려동물</div>
                <button
                  type="button"
                  className="text-sm text-shade-02 underline hover:text-black"
                >
                  보조동물을 동반하시나요?
                </button>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => handleDecrement('pets')}
                  disabled={guestCounts.pets <= 0}
                  className={`flex h-8 w-8 items-center justify-center rounded-full border border-neutral-06 text-neutral-06 ${guestCounts.pets <= 0 ? 'cursor-not-allowed border-neutral-02 text-neutral-02' : 'hover:border-shade-02 hover:text-shade-02'}`}
                >
                  <HiOutlineMinus />
                </button>
                <span className="w-6 text-center">{guestCounts.pets}</span>
                <button
                  onClick={() => handleIncrement('pets')}
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-neutral-06 text-neutral-06 hover:border-shade-02 hover:text-shade-02"
                >
                  <HiOutlinePlus />
                </button>
              </div>
            </div>
            <div className="mt-4 flex justify-end">
              <button
                type="button"
                className="rounded-lg p-2.5 underline hover:bg-neutral-01"
                onClick={onToggle}
              >
                닫기
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
