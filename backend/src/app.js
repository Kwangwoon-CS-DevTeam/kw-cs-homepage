require('dotenv').config();
const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger');

const app = express();

// Swagger UI 세팅
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

/**
 * @swagger
 * /:
 *   get:
 *     summary: Welcome 메시지 반환
 *     responses:
 *       200:
 *         description: 성공적으로 메시지를 반환함
 */
app.get('/', (req, res) => {
    res.send('Welcome to the API!');
});

app.listen(process.env.PORT, () => {
    console.log(`Server is running on http://localhost:${process.env.PORT}`);
});