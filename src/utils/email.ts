/**
* 이메일 주소에 해당하는 웹메일 서비스의 URL을 반환합니다.
* 지원되는 메일 서비스: Gmail, Naver, Daum, Kakao, Yahoo, Outlook(Live), Hotmail, MSN
* 
* @param {string} email - 이메일 주소
* @returns {string} 웹메일 서비스 URL
* - 지원되는 메일 서비스의 경우 해당 웹메일 URL 반환
* - 지원되지 않는 도메인의 경우 'https://{도메인}' 형식의 URL 반환
* 
* @example
* // 'https://mail.google.com' 반환
* getWebmailUrl('user@gmail.com')
* 
* // 'https://mail.naver.com' 반환
* getWebmailUrl('user@naver.com')
* 
* // 'https://example.com' 반환
* getWebmailUrl('user@example.com')
*/

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