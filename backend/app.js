const express = require('express');

const app = express();

const PORT = 3000;

app.get('/', (req, res) => {
    res.send('CI CD 테스트 중입니다.');
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});