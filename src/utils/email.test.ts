import { getWebmailUrl } from '@/utils/email';

describe('getWebmailUrl', () => {
  it('returns correct URL for Gmail', () => {
    expect(getWebmailUrl('test@gmail.com')).toBe('https://mail.google.com');
  });

  it('returns correct URL for Naver', () => {
    expect(getWebmailUrl('user@naver.com')).toBe('https://mail.naver.com');
  });

  it('returns correct URL for Daum', () => {
    expect(getWebmailUrl('user@daum.net')).toBe('https://mail.daum.net');
  });

  it('returns correct URL for Kakao', () => {
    expect(getWebmailUrl('user@kakao.com')).toBe('https://mail.kakao.com');
  });

  it('returns correct URL for Yahoo', () => {
    expect(getWebmailUrl('user@yahoo.com')).toBe('https://mail.yahoo.com');
  });

  it('returns correct URL for Outlook domains', () => {
    const outlookDomains = ['outlook.com', 'hotmail.com', 'msn.com'];
    outlookDomains.forEach((domain) => {
      expect(getWebmailUrl(`user@${domain}`)).toBe('https://outlook.live.com');
    });
  });

  it('handles mixed case email addresses', () => {
    expect(getWebmailUrl('user@GMAIL.com')).toBe('https://mail.google.com');
    expect(getWebmailUrl('user@Gmail.COM')).toBe('https://mail.google.com');
  });

  it('returns fallback URL for unknown domains', () => {
    expect(getWebmailUrl('user@company.com')).toBe('https://company.com');
    expect(getWebmailUrl('test@unknown-domain.org')).toBe('https://unknown-domain.org');
  });
});
