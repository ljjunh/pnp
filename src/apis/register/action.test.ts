import mockRegisterRoom from '@/mocks/fixtures/registerRoom.json';
import { server } from '@/mocks/node';
import { HttpResponse, http } from 'msw';
import {
  createImageUrl,
  createRoomId,
  sendS3Url,
  updateRoomRegister,
} from '@/apis/register/action';

const mockGet = jest.fn();

jest.mock('next/headers', () => ({
  cookies: () => ({
    get: mockGet,
  }),
}));

jest.mock('next/navigation', () => ({
  notFound: jest.fn(),
}));

describe('register action test', () => {
  describe('updateRoomRegister test', () => {
    const mockUpdateData = {
      title: 'mockTitle',
      description: 'mockDescription',
    };

    beforeEach(() => {
      jest.clearAllMocks();
    });

    test('성공적으로 숙소 데이터를 업데이트 한다.', async () => {
      // 로그인 된 상태로 가정
      mockGet.mockReturnValue({ value: 'mock-access-token' });

      const response = await updateRoomRegister(1, mockUpdateData);

      expect(response.success).toBe(true);
      expect(response.status).toBe(200);
      expect(response.message).toBe('OK');
    });

    test("updateData가 없을 때 '업데이트 정보를 입력해 주세요.' 메시지를 반환한다.", async () => {
      mockGet.mockReturnValue({ value: 'mock-access-token' });

      const error = await updateRoomRegister(1);

      expect(error.success).toBe(false);
      expect(error.status).toBe(400);
      expect(error.message).toBe('업데이트 정보를 입력해 주세요.');
    });

    test("client에서 로그인이 되어있지 않을 때 '로그인이 필요합니다.' 메시지를 반환한다.", async () => {
      // 로그인 되어있지 않은 상태로 가정
      mockGet.mockReturnValue(null);

      const error = await updateRoomRegister(1, mockUpdateData);

      expect(error.success).toBe(false);
      expect(error.status).toBe(401);
      expect(error.message).toBe('로그인이 필요합니다.');
    });

    test("400 에러 발생 시 '유효하지 않은 ID 형식입니다.' 메시지를 반환한다.", async () => {
      mockGet.mockReturnValue({ value: 'mock-access-token' });

      const error = await updateRoomRegister(400, mockUpdateData);

      expect(error.success).toBe(false);
      expect(error.status).toBe(400);
      expect(error.message).toBe('유효하지 않은 ID 형식입니다.');
    });

    test("401 에러 발생 시 '로그인이 필요합니다.' 메시지를 반환한다.", async () => {
      // client에서 로그인이 되어있다고 가정하고 401에러 발생
      mockGet.mockReturnValue({ value: 'mock-access-token' });

      const error = await updateRoomRegister(401, mockUpdateData);

      expect(error.success).toBe(false);
      expect(error.status).toBe(401);
      expect(error.message).toBe('로그인이 필요합니다.');
    });

    test("403 에러 발생 시 '본인의 숙소만 수정할 수 있습니다.' 메시지를 반환한다.", async () => {
      mockGet.mockReturnValue({ value: 'mock-access-token' });

      const error = await updateRoomRegister(403, mockUpdateData);

      expect(error.success).toBe(false);
      expect(error.status).toBe(403);
      expect(error.message).toBe('본인의 숙소만 수정할 수 있습니다.');
    });

    test("404 에러 발생 시 '존재하지 않는 리소스입니다' 메시지를 반환한다.", async () => {
      mockGet.mockReturnValue({ value: 'mock-access-token' });

      const error = await updateRoomRegister(404, mockUpdateData);

      expect(error.success).toBe(false);
      expect(error.status).toBe(404);
      expect(error.message).toBe('존재하지 않는 리소스입니다');
    });

    test("500 서버 에러 발생 시 '서버 에러가 발생했습니다.' 메시지를 반환한다.", async () => {
      mockGet.mockReturnValue({ value: 'mock-access-token' });

      const error = await updateRoomRegister(500, mockUpdateData);

      expect(error.success).toBe(false);
      expect(error.status).toBe(500);
      expect(error.message).toBe('서버 에러가 발생했습니다.');
    });

    test("501 네트워크 에러 발생 시 '숙소 정보 수정 중 에러가 발생했습니다. 잠시 후 다시 시도해 주세요.' 메시지를 반환한다.", async () => {
      mockGet.mockReturnValue({ value: 'mock-access-token' });

      const error = await updateRoomRegister(501, mockUpdateData);

      expect(error.success).toBe(false);
      expect(error.status).toBe(500);
      expect(error.message).toBe(
        '숙소 정보 수정 중 에러가 발생했습니다. 잠시 후 다시 시도해 주세요.',
      );
    });

    test('서버 응답에 message가 없을 때 기본 메시지를 반환한다.', async () => {
      mockGet.mockReturnValue({ value: 'mock-access-token' });

      const error = await updateRoomRegister(502, mockUpdateData);

      expect(error.success).toBe(false);
      expect(error.status).toBe(500);
      expect(error.message).toBe('숙소 정보 수정에 실패했습니다. 잠시 후 다시 시도해 주세요.');
    });
  });

  describe('createRoomId test', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    test('성공적으로 roomId를 생성한다', async () => {
      mockGet.mockReturnValue({ value: 'mock-access-token' });

      server.use(
        http.post('/api/rooms', () => {
          return HttpResponse.json({
            success: true,
            status: 201,
            data: 9999,
          });
        }),
      );

      const response = await createRoomId();

      expect(response.success).toBe(true);
      expect(response.status).toBe(201);
      expect(response.data).toBe(9999);
    });

    test('client에서 로그인이 되어있지 않을 때 "로그인이 필요합니다." 메시지를 반환한다.', async () => {
      mockGet.mockReturnValue(null);

      const error = await createRoomId();

      expect(error.success).toBe(false);
      expect(error.status).toBe(401);
      expect(error.message).toBe('로그인이 필요합니다.');
    });

    test("401 에러 발생 시 '로그인이 필요합니다.' 메시지를 반환한다.", async () => {
      // client에서 로그인이 되어있다고 가정하고 401에러 발생
      mockGet.mockReturnValue({ value: 'mock-access-token' });

      server.use(
        http.post('/api/rooms', () => {
          return HttpResponse.json({
            success: false,
            status: 401,
            message: '로그인이 필요합니다.',
          });
        }),
      );

      const error = await createRoomId();

      expect(error.success).toBe(false);
      expect(error.status).toBe(401);
      expect(error.message).toBe('로그인이 필요합니다.');
    });

    test("429 에러 발생 시 '숙소 등록은 5분에 한 번만 가능합니다.' 메시지를 반환한다.", async () => {
      mockGet.mockReturnValue({ value: 'mock-access-token' });

      server.use(
        http.post('/api/rooms', () => {
          return HttpResponse.json({
            success: false,
            status: 429,
            message: '숙소 등록은 5분에 한 번만 가능합니다.',
          });
        }),
      );

      const error = await createRoomId();

      expect(error.success).toBe(false);
      expect(error.status).toBe(429);
      expect(error.message).toBe('숙소 등록은 5분에 한 번만 가능합니다.');
    });

    test("500 서버 에러 발생 시 '서버 에러가 발생했습니다.' 메시지를 반환한다.", async () => {
      mockGet.mockReturnValue({ value: 'mock-access-token' });

      server.use(
        http.post('/api/rooms', () => {
          return HttpResponse.json({
            success: false,
            status: 500,
            message: '서버 에러가 발생했습니다.',
          });
        }),
      );

      const error = await createRoomId();

      expect(error.success).toBe(false);
      expect(error.status).toBe(500);
      expect(error.message).toBe('서버 에러가 발생했습니다.');
    });

    test("네트워크 에러 발생 시 '네트워크 문제로 숙소 등록에 실패했습니다. 인터넷 연결을 확인하고 다시 시도해 주세요.' 메시지를 반환한다.", async () => {
      mockGet.mockReturnValue({ value: 'mock-access-token' });

      server.use(
        http.post('/api/rooms', () => {
          // 네트워크 에러 시뮬레이션
          return new Response(null, { status: 500 });
        }),
      );

      const error = await createRoomId();

      expect(error.success).toBe(false);
      expect(error.status).toBe(500);
      expect(error.message).toBe(
        '네트워크 문제로 숙소 등록에 실패했습니다. 인터넷 연결을 확인하고 다시 시도해 주세요.',
      );
    });

    test("서버 응답에 message가 없을 때 '숙소 등록에 실패했습니다. 잠시 후 다시 시도해 주세요.' 메시지를 반환한다.", async () => {
      mockGet.mockReturnValue({ value: 'mock-access-token' });

      server.use(
        http.post('/api/rooms', () => {
          return HttpResponse.json({
            success: false,
            status: 500,
          });
        }),
      );

      const error = await createRoomId();

      expect(error.success).toBe(false);
      expect(error.status).toBe(500);
      expect(error.message).toBe('숙소 등록에 실패했습니다. 잠시 후 다시 시도해 주세요.');
    });
  });

  describe('createImageUrl test', () => {
    const mockImageUrls: string[] = ['image1.jpg', 'image2.jpg'];

    test('성공적으로 이미지 url을 생성한다.', async () => {
      mockGet.mockReturnValue({ value: 'mock-access-token' });

      const response = await createImageUrl(1, mockImageUrls);

      expect(response.success).toBe(true);
      expect(response.status).toBe(200);
      expect(Array.isArray(response.data)).toBe(true);
    });

    test('client에서 로그인이 되어있지 않을 때 "로그인이 필요합니다." 메시지를 반환한다.', async () => {
      mockGet.mockReturnValue(null);

      const error = await createImageUrl(1, mockImageUrls);

      expect(error.success).toBe(false);
      expect(error.status).toBe(401);
      expect(error.message).toBe('로그인이 필요합니다.');
    });

    test('403 에러 발생 시 "이미지 업로드 권한이 없습니다." 메시지를 반환한다.', async () => {
      mockGet.mockReturnValue({ value: 'mock-access-token' });

      const error = await createImageUrl(403, mockImageUrls);

      expect(error.success).toBe(false);
      expect(error.status).toBe(403);
      expect(error.message).toBe('이미지 업로드 권한이 없습니다.');
    });

    test('404 에러 발생 시 "숙소가 없습니다." 메시지를 반환한다.', async () => {
      mockGet.mockReturnValue({ value: 'mock-access-token' });

      const error = await createImageUrl(404, mockImageUrls);

      expect(error.success).toBe(false);
      expect(error.status).toBe(404);
      expect(error.message).toBe('숙소가 없습니다.');
    });

    test('500 서버 에러 발생 시 "서버 에러가 발생했습니다." 메시지를 반환한다.', async () => {
      mockGet.mockReturnValue({ value: 'mock-access-token' });

      const error = await createImageUrl(500, mockImageUrls);

      expect(error.success).toBe(false);
      expect(error.status).toBe(500);
      expect(error.message).toBe('서버 에러가 발생했습니다.');
    });

    test('네트워크 에러 발생 시 "네트워크 문제로 이미지 업로드에 실패했습니다. 인터넷 연결을 확인하고 다시 시도해 주세요." 메시지를 반환한다.', async () => {
      mockGet.mockReturnValue({ value: 'mock-access-token' });

      const error = await createImageUrl(501, mockImageUrls);

      expect(error.success).toBe(false);
      expect(error.status).toBe(500);
      expect(error.message).toBe(
        '네트워크 문제로 이미지 업로드에 실패했습니다. 인터넷 연결을 확인하고 다시 시도해 주세요.',
      );
    });

    test("서버 응답에 message가 없을 때 '이미지 업로드에 실패했습니다. 잠시 후 다시 시도해 주세요.' 메시지를 반환한다.", async () => {
      mockGet.mockReturnValue({ value: 'mock-access-token' });

      const error = await createImageUrl(502, mockImageUrls);

      expect(error.success).toBe(false);
      expect(error.status).toBe(500);
      expect(error.message).toBe('이미지 업로드에 실패했습니다. 잠시 후 다시 시도해 주세요.');
    });
  });

  describe('sendS3Url test', () => {
    const mockS3Url: string[] = [
      'https://pre-signed-url.com/image1.jpg',
      'https://pre-signed-url.com/image2.jpg',
    ];

    test('성공적으로 s3 url을 백엔드로 보내준다.', async () => {
      mockGet.mockReturnValue({ value: 'mock-access-token' });

      const response = await sendS3Url(1, mockS3Url);

      expect(response.success).toBe(true);
      expect(response.status).toBe(200);
      expect(response.data).toEqual(mockRegisterRoom);
    });

    test('client에서 로그인이 되어있지 않을 때 "로그인이 필요합니다." 메시지를 반환한다.', async () => {
      mockGet.mockReturnValue(null);

      const error = await sendS3Url(1, mockS3Url);

      expect(error.success).toBe(false);
      expect(error.status).toBe(401);
      expect(error.message).toBe('로그인이 필요합니다.');
    });

    test('response.data가 없을 때 500 에러로 간주하여 에러를 반환한다.', async () => {
      mockGet.mockReturnValue({ value: 'mock-access-token' });

      const error = await sendS3Url(2, mockS3Url);

      expect(error.success).toBe(false);
      expect(error.status).toBe(500);
      expect(error.message).toBe('이미지 업데이트에 실패했습니다. 잠시 후 다시 시도해 주세요.');
    });

    test('403 에러 발생 시 "이미지 업데이트 권한이 없습니다." 메시지를 반환한다.', async () => {
      mockGet.mockReturnValue({ value: 'mock-access-token' });

      const error = await sendS3Url(403, mockS3Url);

      expect(error.success).toBe(false);
      expect(error.status).toBe(403);
      expect(error.message).toBe('이미지 업데이트 권한이 없습니다.');
    });

    test('404 에러 발생 시 "숙소가 없습니다." 메시지를 반환한다.', async () => {
      mockGet.mockReturnValue({ value: 'mock-access-token' });

      const error = await sendS3Url(404, mockS3Url);

      expect(error.success).toBe(false);
      expect(error.status).toBe(404);
      expect(error.message).toBe('숙소가 없습니다.');
    });

    test('500 서버 에러 발생 시 "서버 에러가 발생했습니다." 메시지를 반환한다.', async () => {
      mockGet.mockReturnValue({ value: 'mock-access-token' });

      const error = await sendS3Url(500, mockS3Url);

      expect(error.success).toBe(false);
      expect(error.status).toBe(500);
      expect(error.message).toBe('서버 에러가 발생했습니다.');
    });

    test('네트워크 에러 발생 시 "네트워크 문제로 이미지 업데이트에 실패했습니다. 인터넷 연결을 확인하고 다시 시도해 주세요." 메시지를 반환한다.', async () => {
      mockGet.mockReturnValue({ value: 'mock-access-token' });

      const error = await sendS3Url(501, mockS3Url);

      expect(error.success).toBe(false);
      expect(error.status).toBe(500);
      expect(error.message).toBe(
        '네트워크 문제로 이미지 업데이트에 실패했습니다. 인터넷 연결을 확인하고 다시 시도해 주세요.',
      );
    });

    test("서버 응답에 message가 없을 때 '이미지 업데이트에 실패했습니다. 잠시 후 다시 시도해 주세요.' 메시지를 반환한다.", async () => {
      mockGet.mockReturnValue({ value: 'mock-access-token' });

      const error = await sendS3Url(502, mockS3Url);

      expect(error.success).toBe(false);
      expect(error.status).toBe(500);
      expect(error.message).toBe('이미지 업데이트에 실패했습니다. 잠시 후 다시 시도해 주세요.');
    });
  });
});
