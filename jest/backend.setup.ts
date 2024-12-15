import { prisma } from '@/lib/server';
import { readFileSync } from 'fs';
import { resolve } from 'path';
import { GenericContainer, StartedTestContainer } from 'testcontainers';

let container: StartedTestContainer;

// integration 테스트인 경우에만 컨테이너 실행
beforeAll(async () => {
  // 현재 실행 중인 테스트 파일 경로를 확인
  const isIntegrationTest = expect.getState().testPath?.includes('integration');

  if (isIntegrationTest) {
    container = await new GenericContainer('mysql:8.0')
      .withExposedPorts(3306)
      .withEnvironment({
        MYSQL_ROOT_PASSWORD: 'test',
        MYSQL_DATABASE: 'test_db',
      })
      .start();

    process.env.DATABASE_URL = `mysql://root:test@localhost:${container.getMappedPort(3306)}/test_db`;
  }

  await prisma.$connect();
});

afterAll(async () => {
  await prisma.$disconnect();
  if (container) {
    await container.stop();
  }
});

afterEach(async () => {
  const isIntegrationTest = expect.getState().testPath?.includes('integration');

  if (isIntegrationTest) {
    const truncateSql = readFileSync(resolve(process.cwd(), 'sql/00.truncate.sql'), 'utf-8');

    await prisma.$executeRawUnsafe(truncateSql);
  }
});
