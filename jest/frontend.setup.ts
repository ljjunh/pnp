import { server } from '@/mocks/node';
import '@testing-library/jest-dom';

// GeolocationPositionError 전역 정의 추가
export class CustomGeolocationPositionError extends Error {
  readonly code: number;
  readonly PERMISSION_DENIED: number;
  readonly POSITION_UNAVAILABLE: number;
  readonly TIMEOUT: number;

  static readonly PERMISSION_DENIED = 1;
  static readonly POSITION_UNAVAILABLE = 2;
  static readonly TIMEOUT = 3;

  constructor(code: number) {
    super('Geolocation Error');
    this.code = code;
    this.PERMISSION_DENIED = GeolocationPositionError.PERMISSION_DENIED;
    this.POSITION_UNAVAILABLE = GeolocationPositionError.POSITION_UNAVAILABLE;
    this.TIMEOUT = GeolocationPositionError.TIMEOUT;
    Object.setPrototypeOf(this, GeolocationPositionError.prototype);
  }
}

Object.defineProperty(global, 'GeolocationPositionError', {
  value: CustomGeolocationPositionError,
  writable: true,
  configurable: true,
});

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
