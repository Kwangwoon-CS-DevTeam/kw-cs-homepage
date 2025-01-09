const swaggerJSDoc = require('swagger-jsdoc');

const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'KW CS Homepage API',
            version: '1.0.0',
            description: 'API documentation for KW CS Homepage',
        },
        servers: [
            {
                url: 'http://www.kwangwoon-cie.com', // 로컬 서버 URL
                description: 'Local server',
            },
        ],
    },
    apis: ['./routes/*.js'], // API 경로 (Swagger 주석이 포함된 파일)
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);

module.exports = swaggerSpec;