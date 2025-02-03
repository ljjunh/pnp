'use client';

import { useRouter } from 'next/navigation';
import { CustomError } from '@/errors';
import { useRoomStore } from '@/store/useRoomStore';
import { createImageUrl, sendS3Url } from '@/apis/register/action';
import { ROUTES } from '@/constants/routeURL';
import { useToast } from './use-toast';

export const useImageUpdate = (roomId: number) => {
  const router = useRouter();
  const { setRoom } = useRoomStore();
  const { toast } = useToast();

  const imageUpdate = async (images: File[]) => {
    try {
      const getS3Url = async () => {
        const imageNames = images.map((image) => image.name);
        const getS3Response = await createImageUrl(roomId, imageNames);

        if (!getS3Response.success) {
          throw new CustomError(
            getS3Response.message || '이미지 업로드에 실패했습니다. 잠시 후 다시 시도해 주세요.',
            getS3Response.status,
          );
        }

        // 데이터가 없을 경우 500 에러로 간주
        if (!getS3Response.data) {
          throw new CustomError(
            getS3Response.message || '이미지 업로드에 실패했습니다. 잠시 후 다시 시도해 주세요.',
            500,
          );
        }

        return getS3Response.data;
      };

      const preSignedUrls = await getS3Url();

      const uploadPromises = images.map(async (image, index) => {
        const preSignedUrl = preSignedUrls[index];

        const s3Response = await fetch(preSignedUrl, {
          method: 'PUT',
          body: image,
        });

        if (!s3Response.ok) {
          throw new CustomError(
            '이미지 업로드에 실패했습니다. 잠시 후 다시 시도해 주세요.',
            s3Response.status,
          );
        }

        return s3Response.url.split('?')[0];
      });

      const imageUrls = await Promise.all(uploadPromises);

      const sendS3UrlToBack = async (roomId: number, imageUrls: string[]) => {
        const sendResponse = await sendS3Url(roomId, imageUrls);

        if (!sendResponse.success) {
          throw new CustomError(
            sendResponse.message || '이미지 업로드에 실패했습니다. 잠시 후 다시 시도해 주세요.',
            sendResponse.status,
          );
        }

        // 데이터가 없을 경우 500 에러로 간주
        if (!sendResponse.data) {
          throw new CustomError(
            sendResponse.message || '이미지 업로드에 실패했습니다. 잠시 후 다시 시도해 주세요.',
            500,
          );
        }

        return sendResponse.data;
      };

      const roomResponse = await sendS3UrlToBack(roomId, imageUrls);
      setRoom(roomResponse);

      router.push(ROUTES.REGISTER_STEP(String(roomId)).TITLE);
    } catch (error) {
      if (error instanceof CustomError) {
        if (error.statusCode === 401) {
          router.push(ROUTES.LOGIN);
          return;
        }

        toast({
          title: '이미지 업로드 실패',
          description: error.message,
          variant: 'destructive',
        });
      }

      toast({
        title: '이미지 업로드 실패',
        description: '이미지 업로드에 실패했습니다. 잠시 후 다시 시도해 주세요.',
        variant: 'destructive',
      });
    }
  };

  return { imageUpdate };
};
