import { Star } from 'lucide-react';

interface RatingProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
}

export default function RoomReviewRating({ label, value, onChange }: RatingProps) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-sm text-gray-600">{label}</span>
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            onClick={() => onChange(star)}
            className="p-0.5"
            type="button"
          >
            <Star
              size={20}
              className={`${
                star <= value ? 'fill-pink-500 text-primary-01' : 'fill-gray-200 text-gray-200'
              }`}
            />
          </button>
        ))}
      </div>
    </div>
  );
}
