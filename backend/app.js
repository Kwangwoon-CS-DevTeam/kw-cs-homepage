require('dotenv').config();
const express = require('express');



const app = express();

app.get('/', (req, res) => {
    res.send('CI CD 테스트 완료, devbranch 로 변경합니다.');
});

app.listen(process.env.PORT, () => {
    console.log(`Server is running on http://localhost:${process.env.PORT}`);
});