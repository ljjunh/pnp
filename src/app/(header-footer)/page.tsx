import Card from '@/components/common/Card/Card';

// 테스트용 이미지 데이터
const DUMMY_IMAGES = [
  '/images/01.avif',
  '/images/02.avif',
  '/images/03.avif',
  '/images/04.avif',
  '/images/05.avif',
  '/images/06.avif',
];

export default function Home() {
  return (
    <div className="mx-auto max-w-sm p-4">
      <Card
        id={1}
        images={DUMMY_IMAGES}
        location="한국 Jangam-myeon,Buyeo"
        distance="149"
        dates="12월 15일~20일"
        price={239647}
        rating={4.92}
        review="정말정말 잘 쉬다가 갑니다"
      />
    </div>
  );
}
