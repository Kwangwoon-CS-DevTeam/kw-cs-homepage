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
                url: 'http://localhost:3000', // 서버 URL
            },
        ],
        components: {
            schemas: {
                Notice: {
                    type: 'object',
                    properties: {
                        id: {
                            type: 'integer',
                            example: 1,
                        },
                        admin_id: {
                            type: 'string',
                            example: 'admin123',
                        },
                        category_id: {
                            type: 'integer',
                            example: 1,
                        },
                        title: {
                            type: 'string',
                            example: '공지사항 제목',
                        },
                        content: {
                            type: 'string',
                            example: '<p>공지 내용입니다.</p>',
                        },
                        url: {
                            type: 'string',
                            example: 'http://example.com',
                        },
                        max_participants: {
                            type: 'integer',
                            example: 100,
                        },
                        current_participants: {
                            type: 'integer',
                            example: 50,
                        },
                        created_at: {
                            type: 'string',
                            format: 'date-time',
                            example: '2025-01-11T12:34:56.789Z',
                        },
                        updated_at: {
                            type: 'string',
                            format: 'date-time',
                            example: '2025-01-11T12:34:56.789Z',
                        },
                        isDeleted: {
                            type: 'integer',
                            example: 0,
                        },
                    },
                },
            },
        },
    },
    apis: ['./src/controllers/*.js'], // 여러 경로 추가
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);

module.exports = swaggerSpec;