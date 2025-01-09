const express = require('express');

const app = express();

const PORT = 3000;

app.get('/', (req, res) => {
    res.send('CI CD 테스트 완료, devbranch 로 변경합니다.');
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});