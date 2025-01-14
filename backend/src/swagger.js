const swaggerJSDoc = require('swagger-jsdoc');

const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'KW CS Homepage API',
            version: '1.0.0',
            description: 'API documentation for KW CS Homepage',
        },  
        components: {
            schemas: {
                Resource: {
                    type: 'object',
                    properties: {
                        id: { type: 'integer' },
                        title: { type: 'string' },
                        category_id: { type: 'integer' },
                        content: { type: 'string' },
                        file_url: { type: 'string' },
                        isDeleted: { type: 'integer' },
                    },
                },
            },
        },
        servers: [
            {
                url: 'http://localhost:3000', // 서버 URL
            },
        ],
    },
    apis: ['./src/*.js', './src/controllers/*.js'], // 여러 경로 추가
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);

module.exports = swaggerSpec;