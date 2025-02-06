import { CustomError } from '@/errors';
import { server } from '@/mocks/node';
import { HttpResponse, http } from 'msw';
import { getProgressRoomId } from '@/apis/register/queries';

const mockGet = jest.fn();

jest.mock('next/headers', () => ({
  cookies: () => ({
    get: mockGet,
  }),
}));

describe('getProgressRoomId test', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('등록 준비 중인 숙소의 id를 가져온다', async () => {
    mockGet.mockReturnValue({ value: 'mock-access-token' });

    server.use(
      http.get('/api/rooms/in-progress', () => {
        return HttpResponse.json({
          success: true,
          data: 1,
          status: 200,
          message: 'OK',
        });
      }),
    );

    const response = await getProgressRoomId();

    expect(response).toBe(1);
  });

  test('response.data가 null이면 400 에러로 간주하여 CustomError를 던진다', async () => {
    mockGet.mockReturnValue({ value: 'mock-access-token' });

    server.use(
      http.get('/api/rooms/in-progress', () => {
        return HttpResponse.json({
          success: true,
          status: 200,
          message: 'OK',
          data: null,
        });
      }),
    );

    await expect(getProgressRoomId()).rejects.toThrow(CustomError);
    await expect(getProgressRoomId()).rejects.toMatchObject({
      message: '등록 중인 숙소 조회에 실패하였습니다.',
      statusCode: 400,
    });
  });

  test('response.success가 false이면 CustomError를 던진다', async () => {
    mockGet.mockReturnValue({ value: 'mock-access-token' });

    server.use(
      http.get('/api/rooms/in-progress', () => {
        return HttpResponse.json({
          success: false,
          status: 401,
          message: '로그인이 필요합니다.',
        });
      }),
    );

    await expect(getProgressRoomId()).rejects.toThrow(CustomError);
    await expect(getProgressRoomId()).rejects.toMatchObject({
      message: '로그인이 필요합니다.',
      statusCode: 401,
    });
  });

  test('네트워크 에러 발생 시 CustomError를 던진다', async () => {
    mockGet.mockReturnValue({ value: 'mock-access-token' });

    server.use(
      http.get('/api/rooms/in-progress', () => {
        return HttpResponse.error();
      }),
    );

    await expect(getProgressRoomId()).rejects.toThrow(CustomError);
    await expect(getProgressRoomId()).rejects.toMatchObject({
      message: '네트워크 에러 입니다. 잠시 후 다시 시도해주세요.',
      statusCode: 500,
    });
  });
});
