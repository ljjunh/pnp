import { useRef, useState } from 'react';
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

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function PriceRange() {
  const minPrice = 14000;
  const maxPrice = 490000;
  const [range, setRange] = useState([minPrice, maxPrice]);
  const sliderRef = useRef<HTMLDivElement>(null);

  const data = {
    labels: Array(50).fill(''),
    datasets: [
      {
        data: [
          10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 90, 80, 70, 60, 50, 40, 30, 20, 10, 5, 15, 25,
          35, 45, 55, 65, 75, 85, 95, 100, 95, 85, 75, 65, 55, 45, 35, 25, 15, 5, 10, 20, 30, 40,
          50, 60, 70, 80, 90, 100,
        ],
        backgroundColor: [
          ...Array(50)
            .fill('')
            .map((_, index) => {
              const percentage = (index / 49) * 100;
              
              return percentage >= ((range[0] - 14000) / (490000 - 14000)) * 100 &&
                percentage <= ((range[1] - 14000) / (490000 - 14000)) * 100
                ? '#FF385C'
                : '#DDDDDD';
            }),
        ],
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

    // sliderRef.current가 null이 아님을 보장
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
