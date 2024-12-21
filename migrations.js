/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require('fs');
const path = require('path');
const mysql = require('mysql2/promise');
const { DynamoDB } = require('@aws-sdk/client-dynamodb');
const { CreateTableCommand } = require('@aws-sdk/client-dynamodb');
require('dotenv').config();

const dynamoConfig = {
  region: 'local',
  endpoint: 'http://localhost:8000',
  credentials: {
    accessKeyId: 'dummy',
    secretAccessKey: 'dummy',
  },
};

const dynamoClient = new DynamoDB(dynamoConfig);

async function runDynamoMigrations() {
  try {
    const migrationDirPath = path.join(__dirname, 'migrations');

    // 마이그레이션 파일 필터링 및 정렬
    const migrationFiles = fs
      .readdirSync(migrationDirPath)
      .filter((file) => file.endsWith('.json'))
      .sort();

    for (const file of migrationFiles) {
      const filePath = path.join(migrationDirPath, file);
      const tableConfig = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

      console.log(`실행할 마이그레이션 파일: ${file}`);

      try {
        const createTableCommand = new CreateTableCommand(tableConfig);
        await dynamoClient.send(createTableCommand);
        console.log(`테이블 생성 완료: ${tableConfig.TableName}`);
      } catch (createError) {
        if (createError.name === 'ResourceInUseException') {
          console.log(`테이블 ${tableConfig.TableName}이 이미 존재합니다.`);
        } else {
          throw createError;
        }
      }
    }

    console.log('모든 DynamoDB 마이그레이션 완료');
  } catch (error) {
    console.error('DynamoDB 마이그레이션 중 오류 발생:', error);
  }
}

async function runMigrations() {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    multipleStatements: true,
  });

  try {
    const sqlDirPath = path.join(__dirname, 'sql');

    const sqlFiles = fs
      .readdirSync(sqlDirPath)
      .filter((file) => file.endsWith('.sql'))
      .sort();

    for (const file of sqlFiles) {
      const filePath = path.join(sqlDirPath, file);
      const sqlQuery = fs.readFileSync(filePath, 'utf-8');
      console.log('실행할 쿼리 파일이름: ', file);
      await connection.query(sqlQuery);
      console.log('마이그레이션 완료:', file);
    }

    console.log('모든 마이그레이션 완료');
  } catch (error) {
    console.error('마이그레이션 중 오류 발생:', error);
  } finally {
    await connection.end();
  }
}

runMigrations();
runDynamoMigrations();
