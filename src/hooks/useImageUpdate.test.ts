import { CustomError } from '@/errors';
import { act, renderHook } from '@testing-library/react';
import { createImageUrl, sendS3Url } from '@/apis/register/action';
import { useImageUpdate } from '@/hooks/useImageUpdate';

const mockGet = jest.fn();
jest.mock('next/headers', () => ({
  cookies: () => ({
    get: mockGet,
  }),
}));

const mockPush = jest.fn();
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

const mockSetRoom = jest.fn();
jest.mock('@/store/useRoomStore', () => ({
  useRoomStore: () => ({
    setRoom: mockSetRoom,
  }),
}));

const mockToast = jest.fn();
jest.mock('./use-toast', () => ({
  useToast: () => ({
    toast: mockToast,
  }),
}));

jest.mock('@/apis/register/action');

describe('useImageUpdate test', () => {
  const mockFiles = [
    new File(['test1'], 'test1.jpg', { type: 'image/jpeg' }),
    new File(['test2'], 'test2.jpg', { type: 'image/jpeg' }),
  ];

  const mockPreSignedUrls = [
    'https://test-bucket.s3.amazonaws.com/test1.jpg?signature',
    'https://test-bucket.s3.amazonaws.com/test2.jpg?signature',
  ];

  beforeEach(() => {
    jest.clearAllMocks();
    global.fetch = jest.fn(); // S3 업로드 모킹
  });

  test('이미지 업로드 성공 시 다음 단계로 이동한다', async () => {
    mockGet.mockReturnValue({ value: 'mock-access-token' });

    (createImageUrl as jest.Mock).mockResolvedValue({
      success: true,
      status: 200,
      data: mockPreSignedUrls,
    });

    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      url: mockPreSignedUrls[0],
    });

    (sendS3Url as jest.Mock).mockResolvedValue({
      success: true,
      data: { id: 1, images: mockPreSignedUrls },
    });

    const { result } = renderHook(() => useImageUpdate(1));

    await act(async () => {
      await result.current.imageUpdate(mockFiles);
    });

    expect(mockSetRoom).toHaveBeenCalledWith({ id: 1, images: mockPreSignedUrls });
    expect(mockPush).toHaveBeenCalledWith('/host/1/title');
  });

  test('createImageUrl 실패 시 에러 토스트를 표시한다', async () => {
    mockGet.mockReturnValue({ value: 'mock-access-token' });

    (createImageUrl as jest.Mock).mockResolvedValue({
      success: false,
      status: 500,
      message: '이미지 업로드에 실패했습니다. 잠시 후 다시 시도해 주세요.',
    });

    const { result } = renderHook(() => useImageUpdate(1));

    await act(async () => {
      await result.current.imageUpdate(mockFiles);
    });

    expect(mockToast).toHaveBeenCalledWith({
      title: '이미지 업로드 실패',
      description: '이미지 업로드에 실패했습니다. 잠시 후 다시 시도해 주세요.',
      variant: 'destructive',
    });
  });

  test('createImageUrl이 에러메시지가 없는 실패일때는 기본 에러 메시지 토스트를 표시한다', async () => {
    mockGet.mockReturnValue({ value: 'mock-access-token' });

    (createImageUrl as jest.Mock).mockResolvedValue({
      success: false,
      status: 500,
    });

    const { result } = renderHook(() => useImageUpdate(1));

    await act(async () => {
      await result.current.imageUpdate(mockFiles);
    });

    expect(mockToast).toHaveBeenCalledWith({
      title: '이미지 업로드 실패',
      description: '이미지 업로드에 실패했습니다. 잠시 후 다시 시도해 주세요.',
      variant: 'destructive',
    });
  });

  test('401 에러 발생 시 로그인 페이지로 이동한다', async () => {
    mockGet.mockReturnValue({ value: null });

    (createImageUrl as jest.Mock).mockRejectedValue(new CustomError('로그인이 필요합니다', 401));

    const { result } = renderHook(() => useImageUpdate(1));

    await act(async () => {
      await result.current.imageUpdate(mockFiles);
    });

    expect(mockPush).toHaveBeenCalledWith('/signin');
  });

  test('createS3Url의 response의 data가 없을 경우 500 에러로 간주하여 CustomError를 던진다', async () => {
    mockGet.mockReturnValue({ value: 'mock-access-token' });

    (createImageUrl as jest.Mock).mockResolvedValue({
      success: true,
      status: 200,
    });

    const { result } = renderHook(() => useImageUpdate(1));

    await act(async () => {
      await result.current.imageUpdate(mockFiles);
    });

    expect(mockToast).toHaveBeenCalledWith({
      title: '이미지 업로드 실패',
      description: '이미지 업로드에 실패했습니다. 잠시 후 다시 시도해 주세요.',
      variant: 'destructive',
    });
  });

  test('S3 업로드 실패 시 에러 토스트를 표시한다', async () => {
    mockGet.mockReturnValue({ value: 'mock-access-token' });

    (createImageUrl as jest.Mock).mockResolvedValue({
      success: true,
      data: mockPreSignedUrls,
    });

    (global.fetch as jest.Mock).mockResolvedValue({
      ok: false,
      status: 500,
      url: null,
    });

    const { result } = renderHook(() => useImageUpdate(1));

    await act(async () => {
      await result.current.imageUpdate(mockFiles);
    });

    expect(mockToast).toHaveBeenCalledWith({
      title: '이미지 업로드 실패',
      description: '이미지 업로드에 실패했습니다. 잠시 후 다시 시도해 주세요.',
      variant: 'destructive',
    });
  });

  test('sendS3Url의 response의 success가 false일 경우 에러 토스트를 표시한다', async () => {
    mockGet.mockReturnValue({ value: 'mock-access-token' });

    (createImageUrl as jest.Mock).mockResolvedValue({
      success: true,
      data: mockPreSignedUrls,
    });

    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      url: mockPreSignedUrls[0],
    });

    (sendS3Url as jest.Mock).mockResolvedValue({
      success: false,
      status: 500,
      message: '이미지 업로드에 실패했습니다. 잠시 후 다시 시도해 주세요.',
    });

    const { result } = renderHook(() => useImageUpdate(1));

    await act(async () => {
      await result.current.imageUpdate(mockFiles);
    });

    expect(mockToast).toHaveBeenCalledWith({
      title: '이미지 업로드 실패',
      description: '이미지 업로드에 실패했습니다. 잠시 후 다시 시도해 주세요.',
      variant: 'destructive',
    });
  });

  test('sendS3Url의 response의 data가 비어있을 경우 500 에러로 간주하여 CustomError를 던진다', async () => {
    mockGet.mockReturnValue({ value: 'mock-access-token' });

    (createImageUrl as jest.Mock).mockResolvedValue({
      success: true,
      data: mockPreSignedUrls,
    });

    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      url: mockPreSignedUrls[0],
    });

    (sendS3Url as jest.Mock).mockResolvedValue({
      success: true,
      data: null,
    });

    const { result } = renderHook(() => useImageUpdate(1));

    await act(async () => {
      await result.current.imageUpdate(mockFiles);
    });

    expect(mockToast).toHaveBeenCalledWith({
      title: '이미지 업로드 실패',
      description: '이미지 업로드에 실패했습니다. 잠시 후 다시 시도해 주세요.',
      variant: 'destructive',
    });
  });
});
