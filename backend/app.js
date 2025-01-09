require('dotenv').config();
const express = require('express');
const sequelize = require('./db'); // db.js에서 가져오기

// 모델 동기화
(async () => {
    try {
        await sequelize.sync();
        console.log('모델 동기화 성공!');
    } catch (error) {
        console.error('모델 동기화 실패:', error);
    }
})();


const app = express();

app.get('/', (req, res) => {
    res.send('CI CD 테스트 완료, devbranch 로 변경합니다.');
});

app.listen(process.env.PORT, () => {
    console.log(`Server is running on http://localhost:${process.env.PORT}`);
});