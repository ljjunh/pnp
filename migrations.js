/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require('fs');
const path = require('path');
const mysql = require('mysql2/promise');

async function runMigrations() {
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'pnp',
        password: 'pnp',
        database: 'pnp',
        multipleStatements: true,
    });

    try {
        const sqlDirPath = path.join(__dirname, 'sql');
        
        const sqlFiles = fs.readdirSync(sqlDirPath)
            .filter(file => file.endsWith('.sql'))
            .sort();

        for (const file of sqlFiles) {
            const filePath = path.join(sqlDirPath, file);
            const sqlQuery = fs.readFileSync(filePath, 'utf-8');
            console.log("실행할 쿼리 파일이름: ", file);
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