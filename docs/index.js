const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');

const option = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Board API',
            version: '1.0',
            description: 'Board api using express.js',
            contact: {
                name: 'J-hoplin1',
                email: 'jhoplin7259@gmail.com',
                url: 'https://github.com/J-hoplin1/Board-API',
            },
        },
        servers: [
            {
                url: 'http://127.0.0.1:4000',
                description: 'Dev Container localhost',
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
            },
            schemas: {
                200: {
                    type: 'object',
                    properties: {
                        msg: {
                            type: 'string',
                            example: 'OK',
                        },
                    },
                },
                401: {
                    type: 'object',
                    properties: {
                        msg: {
                            type: 'string',
                            example: 'Unauthorized user or request',
                        },
                    },
                },
                403: {
                    type: 'object',
                    properties: {
                        msg: {
                            type: 'string',
                            example: 'Forbidden API',
                        },
                    },
                },
                410: {
                    type: 'object',
                    properties: {
                        msg: {
                            type: 'string',
                            example: 'This API has been deprecated',
                        },
                    },
                },
                419: {
                    type: 'object',
                    properties: {
                        msg: {
                            type: 'string',
                            example: 'Token expired',
                        },
                    },
                },
                500: {
                    type: 'object',
                    properties: {
                        msg: {
                            type: 'string',
                            example: 'API logic error',
                        },
                    },
                },
                '200-with-token': {
                    type: 'object',
                    properties: {
                        msg: {
                            type: 'string',
                            example: 'OK',
                        },
                        token: {
                            type: 'string',
                            example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImMwNzVhYzE4LWI1ODMtNDUzNS1iM2U0LWNmMTM3MGQxMTQzYSIsImlhdCI6MTY3MzQ5MDI1MCwiZXhwIjoxNjczNDkwNTUwLCJpc3MiOiJIb3BsaW4ifQ.cm4I0JHQe_NIhlJ-9fAEy9sJVwtGuhIOqMIDUn74zOI',
                        },
                    },
                },
                '200-true': {
                    type: 'object',
                    properties: {
                        msg: {
                            type: 'boolean',
                            example: true,
                        },
                    },
                },
                '200-false': {
                    type: 'object',
                    properties: {
                        msg: {
                            type: 'boolean',
                            example: false,
                        },
                    },
                },
                '400-user-level-range-unavailable': {
                    type: 'object',
                    properties: {
                        msg: {
                            type: 'string',
                            example: 'User level range unavailable',
                        },
                    },
                },
                '400-user-password-unmatched': {
                    type: 'object',
                    properties: {
                        msg: {
                            type: 'string',
                            example: 'Password not matched',
                        },
                    },
                },
                '400-user-already-exist': {
                    type: 'object',
                    properties: {
                        msg: {
                            type: 'string',
                            example: 'User email or nickname already exist',
                        },
                    },
                },
                '400-user-not-exist': {
                    type: 'object',
                    properties: {
                        msg: {
                            type: 'string',
                            example: 'User not exist',
                        },
                    },
                },
                '400-post-not-exist': {
                    type: 'object',
                    properties: {
                        msg: {
                            type: 'string',
                            example: 'Post not exist',
                        },
                    },
                },
                '400-post-id-not-given': {
                    type: 'object',
                    properties: {
                        msg: {
                            type: 'string',
                            example: 'Post ID not given',
                        },
                    },
                },
                '400-comment-not-found': {
                    type: 'object',
                    properties: {
                        msg: {
                            type: 'string',
                            example: 'Comment not found',
                        },
                    },
                },
                '403-blocked': {
                    type: 'object',
                    properties: {
                        msg: {
                            type: 'string',
                            example: 'This API has been blocked',
                        },
                    },
                },
                '403-token-invalid': {
                    type: 'object',
                    properties: {
                        msg: {
                            type: 'string',
                            example: 'Invalid token',
                        },
                    },
                },
            },
        },
        security: [
            {
                bearerAuth: [],
            },
        ],
    },
    apis: ['../api/*.js', './index.js'],
};

const specs = swaggerJsDoc(option);
module.exports = {
    swaggerUI,
    specs,
};
