import { auth } from '@/auth';
import { server } from '@/mocks/node';
import { HttpResponse, http } from 'msw';
import { createRoomId, updateRoomRegister } from '@/apis/register/action';

jest.mock('@/auth', () => ({
  auth: jest.fn(),
}));

describe('register action test', () => {
  describe('updateRoomRegister test', () => {
    const mockUpdateData = {
      title: 'mockTitle',
      description: 'mockDescription',
    };

    test('성공적으로 숙소 데이터를 업데이트 한다.', async () => {
      // 로그인 된 상태로 가정
      (auth as jest.Mock).mockResolvedValue({ user: { id: 1 } });

      const response = await updateRoomRegister(1, mockUpdateData);

      expect(response.success).toBe(true);
      expect(response.status).toBe(200);
      expect(response.message).toBe('OK');
    });

    test("updateData가 없을 때 '업데이트 정보를 입력해 주세요.' 메시지를 반환한다.", async () => {
      (auth as jest.Mock).mockResolvedValue({ user: { id: 1 } });

      const error = await updateRoomRegister(1);

      expect(error.success).toBe(false);
      expect(error.status).toBe(400);
      expect(error.message).toBe('업데이트 정보를 입력해 주세요.');
    });

    test("client에서 로그인이 되어있지 않을 때 '로그인이 필요합니다.' 메시지를 반환한다.", async () => {
      // 로그인 되어있지 않은 상태로 가정
      (auth as jest.Mock).mockResolvedValue(null);

      const error = await updateRoomRegister(1, mockUpdateData);

      expect(error.success).toBe(false);
      expect(error.status).toBe(401);
      expect(error.message).toBe('로그인이 필요합니다.');
    });

    test("400 에러 발생 시 '유효하지 않은 ID 형식입니다.' 메시지를 반환한다.", async () => {
      (auth as jest.Mock).mockResolvedValue({ user: { id: 1 } });

      const error = await updateRoomRegister(400, mockUpdateData);

      expect(error.success).toBe(false);
      expect(error.status).toBe(400);
      expect(error.message).toBe('유효하지 않은 ID 형식입니다.');
    });

    test("401 에러 발생 시 '로그인이 필요합니다.' 메시지를 반환한다.", async () => {
      // client에서 로그인이 되어있다고 가정하고 401에러 발생
      (auth as jest.Mock).mockResolvedValue({ user: { id: 1 } });

      const error = await updateRoomRegister(401, mockUpdateData);

      expect(error.success).toBe(false);
      expect(error.status).toBe(401);
      expect(error.message).toBe('로그인이 필요합니다.');
    });

    test("403 에러 발생 시 '본인의 숙소만 수정할 수 있습니다.' 메시지를 반환한다.", async () => {
      (auth as jest.Mock).mockResolvedValue({ user: { id: 1 } });

      const error = await updateRoomRegister(403, mockUpdateData);

      expect(error.success).toBe(false);
      expect(error.status).toBe(403);
      expect(error.message).toBe('본인의 숙소만 수정할 수 있습니다.');
    });

    test("404 에러 발생 시 '존재하지 않는 리소스입니다' 메시지를 반환한다.", async () => {
      (auth as jest.Mock).mockResolvedValue({ user: { id: 1 } });

      const error = await updateRoomRegister(404, mockUpdateData);

      expect(error.success).toBe(false);
      expect(error.status).toBe(404);
      expect(error.message).toBe('존재하지 않는 리소스입니다');
    });

    test("500 서버 에러 발생 시 '서버 에러가 발생했습니다.' 메시지를 반환한다.", async () => {
      (auth as jest.Mock).mockResolvedValue({ user: { id: 1 } });

      const error = await updateRoomRegister(500, mockUpdateData);

      expect(error.success).toBe(false);
      expect(error.status).toBe(500);
      expect(error.message).toBe('서버 에러가 발생했습니다.');
    });

    test("501 네트워크 에러 발생 시 '숙소 정보 수정 중 에러가 발생했습니다. 잠시 후 다시 시도해 주세요.' 메시지를 반환한다.", async () => {
      (auth as jest.Mock).mockResolvedValue({ user: { id: 1 } });

      const error = await updateRoomRegister(501, mockUpdateData);

      expect(error.success).toBe(false);
      expect(error.status).toBe(500);
      expect(error.message).toBe(
        '숙소 정보 수정 중 에러가 발생했습니다. 잠시 후 다시 시도해 주세요.',
      );
    });

    test('서버 응답에 message가 없을 때 기본 메시지를 반환한다.', async () => {
      (auth as jest.Mock).mockResolvedValue({ user: { id: 1 } });

      const error = await updateRoomRegister(502, mockUpdateData);

      expect(error.success).toBe(false);
      expect(error.status).toBe(500);
      expect(error.message).toBe('숙소 정보 수정에 실패했습니다. 잠시 후 다시 시도해 주세요.');
    });
  });

  describe('getRoomId test', () => {
    test('성공적으로 roomId를 생성한다', async () => {
      (auth as jest.Mock).mockResolvedValue({ user: { id: 1 } });

      server.use(
        http.post('/api/rooms', () => {
          return HttpResponse.json({
            success: true,
            status: 201,
            data: {
              roomId: 9999,
            },
          });
        }),
      );

      const response = await createRoomId();

      expect(response.success).toBe(true);
      expect(response.status).toBe(201);
      expect(response.data?.roomId).toBe(9999);
    });

    test('client에서 로그인이 되어있지 않을 때 "로그인이 필요합니다." 메시지를 반환한다.', async () => {
      (auth as jest.Mock).mockResolvedValue(null);

      const error = await createRoomId();

      expect(error.success).toBe(false);
      expect(error.status).toBe(401);
      expect(error.message).toBe('로그인이 필요합니다.');
    });

    test("401 에러 발생 시 '로그인이 필요합니다.' 메시지를 반환한다.", async () => {
      // client에서 로그인이 되어있다고 가정하고 401에러 발생
      (auth as jest.Mock).mockResolvedValue({ user: { id: 1 } });

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
      (auth as jest.Mock).mockResolvedValue({ user: { id: 1 } });

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
      (auth as jest.Mock).mockResolvedValue({ user: { id: 1 } });

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
      (auth as jest.Mock).mockResolvedValue({ user: { id: 1 } });

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
      (auth as jest.Mock).mockResolvedValue({ user: { id: 1 } });

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
});
