import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    // 테스트 할 웹 앱의 기본 url
    baseUrl: "http://localhost:3000",

    // 테스트할 브라우저 창 크기
    viewportWidth: 1280,
    viewportHeight: 720,

    // 테스트 비디오 녹화 비활성화 (CI에서 용량 줄이기 위해)
    video: false,

    // 실패 시 스크린샷 저장
    screenshotOnRunFailure: true,

    // 명령어 타임아웃 (기본값 4000ms가 좀 짧을 수 있음)
    defaultCommandTimeout: 10000,

    // 테스트 재시도 횟수
    retries: {
      runMode: 2, // CI에서 실행할 때
      openMode: 0, // 개발할 때
    },

    // 테스트 파일 패턴
    specPattern: "cypress/e2e/**/*.cy.{js,jsx,ts,tsx}",

    setupNodeEvents(on, config) {
      return config;
    },
  },
});
