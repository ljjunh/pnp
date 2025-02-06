import { getImageUrlHandler } from '@/mocks/handlers/register/getImageUrl';
import { sendS3UrlHandler } from '@/mocks/handlers/register/sendS3Url';
import { updateRoomRegister } from '@/mocks/handlers/register/updateRoomRegister';

export const registerHandlers = [updateRoomRegister, getImageUrlHandler, sendS3UrlHandler];
