require('dotenv').config();
const express = require('express');
const sequelize = require('./db'); // db.js에서 Sequelize 인스턴스 가져오기

const app = express();

app.get('/test-db', async (req, res) => {
    try {
        // test 테이블에서 id = 1의 created_at 데이터 조회
        const [result] = await sequelize.query('SELECT created_at FROM test WHERE id = 1;');

        if (result.length > 0) {
            res.json({
                success: true,
                createdAt: result[0].created_at,
            });
        } else {
            res.status(404).json({
                success: false,
                message: 'No data found for id = 1.',
            });
        }
    } catch (error) {
        console.error('Database query failed:', error);
        res.status(500).json({
            success: false,
            message: 'Database query failed.',
        });
    }
});

app.get('/', (req, res) => {
    res.send('CI CD 테스트 완료, devbranch 로 변경합니다.');
});

app.listen(process.env.PORT, () => {
    console.log(`Server is running on http://localhost:${process.env.PORT}`);
});