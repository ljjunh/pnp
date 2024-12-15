export const getWebmailUrl = (email: string): string => {
  const domain = email.split('@')[1].toLowerCase();
  
  const webmailUrls: Record<string, string> = {
    'gmail.com': 'https://mail.google.com',
    'naver.com': 'https://mail.naver.com',
    'daum.net': 'https://mail.daum.net',
    'kakao.com': 'https://mail.kakao.com',
    'yahoo.com': 'https://mail.yahoo.com',
    'outlook.com': 'https://outlook.live.com',
    'hotmail.com': 'https://outlook.live.com',
    'msn.com': 'https://outlook.live.com',
  };

  return webmailUrls[domain] || `https://${domain}`;
};