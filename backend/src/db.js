const { Sequelize } = require('sequelize');
require('dotenv').config();

// 환경 변수 확인
if (!process.env.DB_URL) {
    throw new Error('DATABASE_URL 환경 변수가 설정되지 않았습니다.');
}

// Sequelize 초기화
const sequelize = new Sequelize(process.env.DB_URL, {
    dialect: 'postgres',
    logging: false, // 로깅 비활성화
});

module.exports = sequelize;