import { useState } from 'react';
import Tag from '@/app/(header-footer)/components/filter/Tag';
import { FilterType } from '@/schemas/rooms';
import { RESERVATION } from '@/constants/amenity';

interface ReservationOptionProps {
  option: string[];
  handleFilter: (newState: string[], type: keyof FilterType) => void;
}

export default function ReservationOption({ option, handleFilter }: ReservationOptionProps) {
  const [reservationOption, setReservationOption] = useState<string[]>(option);

  const handleOption = (option: string) => {
    const newOption = reservationOption.includes(option)
      ? reservationOption.filter((prevOption) => prevOption !== option)
      : [...reservationOption, option];

    setReservationOption(newOption);
    handleFilter(newOption, 'option');
  };

  return (
    <div className="px-6 py-8">
      <div className="pb-4">
        <span className="text-lg font-semibold">예약 옵션</span>
      </div>
      <div className="flex flex-wrap gap-3">
        {RESERVATION.map((reservationItem, index) => (
          <Tag
            tag={reservationItem}
            key={`${reservationItem}-${index}`}
            handleClick={handleOption}
            isChecked={reservationOption.includes(reservationItem)}
          />
        ))}
      </div>
    </div>
  );
}
