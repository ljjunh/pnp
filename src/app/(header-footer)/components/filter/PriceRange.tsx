import { useEffect, useRef, useState } from 'react';
import { FilterType } from '@/schemas/rooms';
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { PriceFilterRange } from '@/types/room';
import { getFilterPrice } from '@/apis/filters/action';
import { useToast } from '@/hooks/use-toast';
import { useModal } from '@/hooks/useModal';
import { MODAL_ID } from '@/constants/modal';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface PriceRangeProps {
  roomType?: 'Entire' | 'Private' | null;
  property?: number | null;
  handleFilter: (newState: number, type: keyof FilterType) => void;
}

export default function PriceRange({ roomType, property, handleFilter }: PriceRangeProps) {
  const { toast } = useToast();
  const { modalState } = useModal(MODAL_ID.ROOM_FILTER);
  const [priceRange, setPriceRange] = useState<PriceFilterRange>({
    minPrice: 0,
    maxPrice: 0,
    distribution: [],
  });

  // roomType이 변경될 때마다 가격 범위를 조회
  useEffect(() => {
    if (!modalState) return;

    const fetchFilterPrice = async () => {
      const response = await getFilterPrice({ roomType, property });

      // 실패했을 때
      if (!response.success) {
        switch (response.status) {
          case 500:
            toast({
              title: '네트워크 문제',
              description: response.message,
              variant: 'destructive',
            });
          default:
            toast({
              title: response.message,
              variant: 'destructive',
            });
        }

        return;
      }

      // data가 없으면 500 에러로 간주
      if (!response.data) {
        toast({
          title: '가격 범위를 조회하는데 실패했습니다.',
          variant: 'destructive',
        });

        return;
      }

      setPriceRange(response.data);
      setRange([response.data.minPrice, response.data.maxPrice]);
    };

    fetchFilterPrice();
  }, [roomType, property, toast, modalState]);

  const { minPrice, maxPrice, distribution } = priceRange;

  const [range, setRange] = useState([minPrice, maxPrice]);
  const sliderRef = useRef<HTMLDivElement>(null);

  const data = {
    labels: distribution.map((item) => item.distance),
    datasets: [
      {
        data: distribution.map((item) => item.count),
        backgroundColor: distribution.map((_, index) => {
          const percentage = (index / (distribution.length - 1)) * 100;

          return percentage >= ((range[0] - minPrice) / (maxPrice - minPrice)) * 100 &&
            percentage <= ((range[1] - minPrice) / (maxPrice - minPrice)) * 100
            ? '#FF385C'
            : '#DDDDDD';
        }),
        barThickness: 6,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: { display: false },
      y: { display: false },
    },
    plugins: {
      legend: { display: false },
      tooltip: { enabled: false },
    },
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>, isMin: boolean) => {
    e.preventDefault();

    if (!sliderRef.current) return;

    const sliderRect = sliderRef.current.getBoundingClientRect();
    const sliderWidth = sliderRect.width;

    const handleMouseMove = (e: MouseEvent) => {
      if (!sliderRef.current) return;

      const percentage = Math.max(
        0,
        Math.min(100, ((e.clientX - sliderRect.left) / sliderWidth) * 100),
      );
      const value = Math.round(((maxPrice - minPrice) * percentage) / 100 + minPrice);

      setRange((prev) =>
        isMin ? [Math.min(value, prev[1]), prev[1]] : [prev[0], Math.max(value, prev[0])],
      );
    };

    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);

      setRange((currentRange) => {
        handleFilter(currentRange[0], 'minPrice');
        handleFilter(currentRange[1], 'maxPrice');
        return currentRange;
      });
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  return (
    <div className="px-6 py-8">
      <div className="flex flex-col pb-4">
        <span className="text-lg font-semibold">가격 범위</span>
        <span className="pt-2 text-sm">1박 요금(수수료 및 세금 포함)</span>
      </div>
      <div className="h-20">
        <Bar
          data={data}
          options={options}
        />
      </div>
      <div
        className="relative pt-2"
        ref={sliderRef}
      >
        <div className="relative h-1 rounded-full bg-neutral-03">
          <div
            className="absolute h-1 rounded-full bg-primary-02"
            style={{
              left: `${((range[0] - minPrice) / (maxPrice - minPrice)) * 100}%`,
              right: `${100 - ((range[1] - minPrice) / (maxPrice - minPrice)) * 100}%`,
            }}
          />
        </div>
        <div
          className="absolute -top-[2px] -ml-3 h-6 w-6 cursor-pointer rounded-full border-2 border-neutral-03 bg-white"
          style={{ left: `${((range[0] - minPrice) / (maxPrice - minPrice)) * 100}%` }}
          onMouseDown={(e) => handleMouseDown(e, true)}
        />
        <div
          className="absolute -top-[2px] -ml-3 h-6 w-6 cursor-pointer rounded-full border-2 border-neutral-03 bg-white"
          style={{ left: `${((range[1] - minPrice) / (maxPrice - minPrice)) * 100}%` }}
          onMouseDown={(e) => handleMouseDown(e, false)}
        />
      </div>
      <div className="mt-5 flex flex-row justify-between">
        <div className="flex flex-col items-center space-y-1 rounded-full border border-neutral-03 px-5 py-1.5">
          <span className="text-sm text-neutral-06">최저</span>
          <span>₩{range[0]}</span>
        </div>
        <div className="flex flex-col items-center space-y-1 rounded-full border border-neutral-03 px-5 py-1.5">
          <span className="text-sm text-neutral-06">최고</span>
          <span>₩{range[1]}</span>
        </div>
      </div>
    </div>
  );
}
