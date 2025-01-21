import { PROPERTY } from '@/constants/property';
import { BiCategory } from 'react-icons/bi';

export default function Structure() {
  return (
    <div className="px-80 py-11 pb-28">
      <p className="pb-11 text-3xl">다음 중 숙소를 가장 잘 설명하는 것은 무엇인가요?</p>
      <input
        type="hidden"
        name="step"
        value="structure"
      />
      <div className="grid grid-cols-3 gap-4">
        {PROPERTY.map((content, index) => (
          <div
            key={`${content}-${index}`}
            className="relative"
          >
            <input
              id={content}
              type="radio"
              name="structure"
              value={content}
              className="peer hidden"
            />
            <label
              htmlFor={content}
              className="flex cursor-pointer flex-col space-y-1.5 rounded-xl border border-neutral-03 p-6 hover:border-black hover:bg-neutral-02 peer-checked:border-2 peer-checked:border-black peer-checked:bg-neutral-02"
            >
              <BiCategory size={24} />
              <span className="whitespace-nowrap text-lg">{content}</span>
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}
