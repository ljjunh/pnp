'use client';

import { ReactNode, useContext } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { RegisterContext } from '@/app/host/[roomId]/components/RegisterContext';
import { updateRoomRegister } from '@/apis/register/action';
import { useToast } from '@/hooks/use-toast';
import { LOCATION_STEP } from '@/constants/registerStep';
import { ROUTES } from '@/constants/routeURL';

export default function RegisterFormProvider({ children }: { children: ReactNode }) {
  const { toast } = useToast();
  const router = useRouter();
  const params = useParams();
  const roomId = params.roomId as string;
  const { isInnerStep, currentStep, setCurrentStep } = useContext(RegisterContext);

  const handleRegisterAction = async (formData: FormData) => {
    console.log('formData :', formData);
    const step = formData.get('step') as string;

    // 내부 단계 있는 것들 이렇게 처리 -> 마지막 단계가 아니라면 server action 타면 안됨
    if (step === 'location') {
      if (isInnerStep) {
        if (currentStep === LOCATION_STEP.INPUT) {
          setCurrentStep(LOCATION_STEP.CONFIRM);
          return;
        }
        if (currentStep === LOCATION_STEP.CONFIRM) {
          setCurrentStep(LOCATION_STEP.LOCATION_CHECK);
          return;
        }
      }
    }

    // *TODO: photo 추가

    let updateData;

    switch (step) {
      case 'start':
        router.push(ROUTES.REGISTER_STEP(roomId).FIRST_STEP);
        return;
      case 'first':
        router.push(ROUTES.REGISTER_STEP(roomId).STRUCTURE);
        return;
      case 'structure':
        {
          const structure = formData.get('structure') as string;
          updateData = { structure };
        }
        break;
      case 'privacy':
        {
          const privacy = formData.get('privacy') as string;
          updateData = { roomType: privacy };
        }
        break;
      case 'location':
        {
          const location = formData.get('location') as string;
          const latitude = Number(formData.get('latitude'));
          const longitude = Number(formData.get('longitude'));
          updateData = { location, latitude, longitude };
        }
        break;
      case 'info':
        // const capacity = Number(formData.get('guest'));
        // const bedroom = Number(formData.get('bedroom'));
        // const bed = Number(formData.get('bed'));
        // const bathroom = Number(formData.get('bathroom'));
        // updateData = { capacity, bedroom, bed, bathroom };
        router.push(ROUTES.REGISTER_STEP(roomId).SECOND_STEP);
        return;
      case 'second':
        router.push(ROUTES.REGISTER_STEP(roomId).AMENITIES);
        return;
      case 'amenities':
        // const amenities = formData.get('amenities')?.toString().split(',') || [];
        // updateData = { amenities };
        router.push(ROUTES.REGISTER_STEP(roomId).PHOTOS);
        return;
      case 'photos':
        router.push(ROUTES.REGISTER_STEP(roomId).TITLE);
        return;
      case 'title':
        {
          const title = formData.get('title') as string;
          updateData = { title };
        }
        break;
      case 'description':
        {
          const description = formData.get('description') as string;
          updateData = { description };
        }
        break;
      case 'third':
        router.push(ROUTES.REGISTER_STEP(roomId).PRICE);
        return;
      case 'price':
        {
          const price = Number(formData.get('price'));
          updateData = { price };
        }
        break;
      case 'safety':
        router.push(ROUTES.REGISTER_STEP(roomId).FINISH);
        return;
      case 'finish':
        router.push(ROUTES.HOST);
        return;
    }

    console.log('updateData :', updateData);

    const response = await updateRoomRegister(Number(roomId), updateData);

    // code: title 객체 만들어서 한 번에 처리
    if (!response.success) {
      switch (response.status) {
        case 400:
          toast({
            title: '업데이트 실패',
            description: response.message,
            variant: 'destructive',
          });
          break;
        case 401:
          toast({
            title: '로그인 필요',
            description: response.message,
            variant: 'destructive',
          });
          break;
        case 403:
          toast({
            title: '권한 없음',
            description: response.message,
            variant: 'destructive',
          });
          break;
        case 404:
          toast({
            title: '숙소 없음',
            description: response.message,
            variant: 'destructive',
          });
          break;
        default:
          toast({
            title: response.message,
            variant: 'destructive',
          });
      }
      return;
    }

    // 성공 시에는 다음 단계로 이동
    switch (step) {
      case 'structure':
        router.push(ROUTES.REGISTER_STEP(roomId).PRIVACY);
        break;
      case 'privacy':
        router.push(ROUTES.REGISTER_STEP(roomId).LOCATION);
        break;
      case 'location':
        router.push(ROUTES.REGISTER_STEP(roomId).INFO);
        break;
      case 'info':
        router.push(ROUTES.REGISTER_STEP(roomId).SECOND_STEP);
        break;
      case 'amenities':
        router.push(ROUTES.REGISTER_STEP(roomId).PHOTOS);
        break;
      case 'photos':
        router.push(ROUTES.REGISTER_STEP(roomId).TITLE);
        break;
      case 'title':
        router.push(ROUTES.REGISTER_STEP(roomId).DESCRIPTION);
        break;
      case 'description':
        router.push(ROUTES.REGISTER_STEP(roomId).THIRD_STEP);
        break;
      case 'price':
        router.push(ROUTES.REGISTER_STEP(roomId).SAFETY);
        break;
      case 'safety':
        router.push(ROUTES.REGISTER_STEP(roomId).FINISH);
        break;
    }
  };

  return <form action={handleRegisterAction}>{children}</form>;
}
