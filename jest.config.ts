import type { Config } from "jest";
import nextJest from "next/jest";

const createJestConfig = nextJest({
  // next.config.js와 .env 파일을 로드하기 위한 Next.js 앱의 경로
  dir: "./",
});

const customJestConfig: Config = {
  // Jest 실행 전에 먼저 실행될 설정 파일
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],

  // 테스트 환경 설정
  testEnvironment: "jsdom",

  // 모듈 경로 별칭 설정
  moduleNameMapper: {
    // 절대 경로 설정
    "^@/(.*)$": "<rootDir>/src/$1",
  },

  // 테스트 파일 위치 설정
  // __tests__ 폴더 내의 모든 ts/tsx 파일
  // 파일명이 .test.ts/tsx 또는 .spec.ts/tsx로 끝나는 파일
  testMatch: ["**/__tests__/**/*.ts?(x)", "**/?(*.)+(spec|test).ts?(x)"],

  // 테스트 제외 경로(.next, nodo_modules 폴더 제외)
  testPathIgnorePatterns: ["<rootDir>/.next/", "<rootDir>/node_modules/"],

  // 커버리지 설정
  collectCoverage: true,

  // 커버리지 수집방법
  coverageProvider: "v8",

  // 커버리지 리포트가 생성될 디렉토리 설정
  coverageDirectory: "coverage",

  // 커버리지 최소 임계값 설정
  coverageThreshold: {
    // 프로젝트 전체에 대한 글로벌 설정
    global: {
      branches: 95, // if/else 같은 조건문의 분기 커버리지
      functions: 95, // 함수의 실행 커버리지
      lines: 95, // 코드 라인 실행 커버리지
      statements: 95, // 모든 구문 실행 커버리지
    },
  },

  // 커버리지를 측정할 파일 경로 설정
  // src 폴더 내의 모든 js/jsx/ts/tsx 파일 대상
  // .d.ts, node_modules, layout.tsx 제외
  collectCoverageFrom: [
    "src/**/*.{js,jsx,ts,tsx}",
    "!src/**/*.d.ts",
    "!**/node_modules/**",
    "!src/app/**/layout.tsx",
    "!src/app/layout.tsx",
  ],
};

module.exports = createJestConfig(customJestConfig);
