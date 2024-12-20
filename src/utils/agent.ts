import { UAParser } from 'ua-parser-js';

export type DeviceType = 'desktop' | 'android' | 'ios' | 'mobile';

export const deviceParser = (userAgent: string): DeviceType => {
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
};
