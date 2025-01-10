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

sequelize.authenticate()
    .then(() => console.log('데이터베이스 연결 성공'))
    .catch((err) => console.error('데이터베이스 연결 실패:', err));

module.exports = sequelize;