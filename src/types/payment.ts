export interface KakaoPayLink {
  tid: string;
  pcLink: string;
  mobileLink: string;
  appLink: string;
  androidLink: string;
  iosLink: string;
}

export type ProviderType = 'toss' | 'kakaopay' | 'naverpay';

export type PaymentConfirmParams = {
  provider: ProviderType;
};
