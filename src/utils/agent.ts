import { UAParser } from 'ua-parser-js';

export type DeviceType = 'desktop' | 'android' | 'ios' | 'mobile';

export const deviceParser = (userAgent: string): DeviceType => {
  if (!userAgent) {
    return 'desktop';
  }
  try {
    const parser = new UAParser(userAgent);
    const device = parser.getDevice();
    const os = parser.getOS();

    if (device.type === 'mobile' || device.type === 'tablet') {
      if (os.name === 'iOS') {
        return 'ios';
      }
      if (os.name === 'Android') {
        return 'android';
      }
      return 'mobile';
    }

    return 'desktop';
  } catch (error) {
    console.error('UserAgent 파싱 중 에러 발생');
    return 'desktop';
  }
};
