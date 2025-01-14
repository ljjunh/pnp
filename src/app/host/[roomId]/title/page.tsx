export default function Title() {
  return (
    <div className="flex h-full w-full flex-col items-start justify-center px-80">
      <p className="mb-4 text-3xl font-semibold">이제 주택에 이름을 지⁠어⁠주⁠세⁠요</p>
      <span className="text-lg text-neutral-07">
        숙소 이름은 짧을수록 효과적입니다. 나중에 언제든지 변경할 수 있으니, 너무 걱정하지 마세요.
        최대 32자까지 입력할 수 있습니다.
      </span>
      <input
        className="mt-8 h-24 w-full rounded-xl border-[1.5px] border-neutral-07 p-4 text-xl focus:border-black focus:outline-none"
        type="text"
        name="title"
        maxLength={32}
        aria-label="숙소 이름"
        placeholder="숙소 이름을 입력해주세요"
        required
      />
      <input
        type="hidden"
        name="step"
        value="title"
      />
    </div>
  );
}
