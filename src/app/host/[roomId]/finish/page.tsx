export default async function Finish() {
  return (
    <div className="flex h-full items-center justify-center">
      <div className="flex flex-col space-y-5">
        <span className="text-4xl font-semibold">도영님, 축하합니다!</span>
        <span className="text-xl text-neutral-07">
          에어비앤비 호스트가 되신 것을 진심으로 환영합니다. 숙소 호스팅을 통해 <br />
          게스트에게 놀라운 경험을 선사하는 데 동참해주셔서 감사합니다.
        </span>
      </div>
      <input
        type="hidden"
        name="step"
        value="finish"
      />
    </div>
  );
}
