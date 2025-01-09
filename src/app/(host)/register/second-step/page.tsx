export default function SecondStep() {
  return (
    <div className="flex flex-row items-center justify-between pt-24">
      <div className="flex flex-col justify-start space-y-6">
        <span className="text-xl font-semibold">2단계</span>
        <span className="text-6xl font-semibold">
          숙소의 매력을 <br />
          돋보이게 하세요
        </span>
        <span className="text-xl">
          이 단계에서는 숙소에 갖춰진 편의시설과 사진 5장 이상을 추가한 후 숙소 이름과 설명을
          작성하시면 됩니다.
        </span>
      </div>
      <video
        preload="auto"
        autoPlay
        muted
        className="h-3/5 w-3/5 object-cover"
      >
        <source src="https://stream.media.muscache.com/H0101WTUG2qWbyFhy02jlOggSkpsM9H02VOWN52g02oxhDVM.mp4?v_q=high" />
      </video>
    </div>
  );
}
