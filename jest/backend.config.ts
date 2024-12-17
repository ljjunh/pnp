import nextJest from 'next/jest';
import type { Config } from 'jest';
import { resolve } from 'path';

const createJestConfig = nextJest({
  dir: resolve(__dirname, '../'),
});

const config: Config = {
  rootDir: resolve(__dirname, '../'),
  testEnvironment: 'node',
  setupFilesAfterEnv: ['<rootDir>/jest/backend.setup.ts'],
  testMatch: ['<rootDir>/__tests__/service/**/*.ts', '<rootDir>/__tests__/schema/**/*.ts'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  collectCoverage: true,
  coverageProvider: 'v8',
  coverageDirectory: 'coverage',
  coverageThreshold: {
    // 프로젝트 전체에 대한 글로벌 설정
    global: {
      branches: 95, // if/else 같은 조건문의 분기 커버리지
      functions: 95, // 함수의 실행 커버리지
      lines: 95, // 코드 라인 실행 커버리지
      statements: 95, // 모든 구문 실행 커버리지
    },
  },
  collectCoverageFrom: [
    '!src/app/!(api)/**/*.{ts,tsx}',
    '!src/components/**/*.{ts,tsx}',
    '!src/app/**/*.{ts,tsx}',
    '!src/apis/**/*.ts',
    '!src/utils/**/*.ts',
    '!src/hooks/**/*.ts',
    'src/app/api/**/*.ts',
    'src/lib/server/**/*.ts',
    'src/services/**/*.ts',
    'src/schemas/**/*.ts',
  ],
};

export default createJestConfig(config);
