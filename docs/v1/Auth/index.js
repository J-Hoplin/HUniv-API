const authCheckEmail = {
    '/api/v1/auth/check-email': {
        post: {
            summary: 'Check if email already in used',
            tags: ['/api/v1/auth'],
            requestBody: {
                required: true,
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            properties: {
                                email: {
                                    type: 'string',
                                    example: 'string',
                                },
                            },
                            required: ['email'],
                        },
                    },
                },
            },
            responses: {
                200: {
                    description: 'OK',
                    content: {
                        'application/json': {
                            schema: {
                                $ref: '#/components/schemas/200',
                            },
                        },
                    },
                },
                400: {
                    description: 'Email already in used',
                    content: {
                        'application/json': {
                            schema: {
                                $ref: '#/components/schemas/400-user-email-already-exist',
                            },
                        },
                    },
                },
            },
        },
    },
};

const authCheckNickname = {
    '/api/v1/auth/check-nickname': {
        post: {
            summary: 'Check if nickname already in used',
            tags: ['/api/v1/auth'],
            requestBody: {
                required: true,
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            properties: {
                                nickname: {
                                    type: 'string',
                                    example: 'string',
                                },
                            },
                            required: ['nickname'],
                        },
                    },
                },
            },
            responses: {
                200: {
                    description: 'OK',
                    content: {
                        'application/json': {
                            schema: {
                                $ref: '#/components/schemas/200',
                            },
                        },
                    },
                },
                400: {
                    description: 'Nickname already in used',
                    content: {
                        'application/json': {
                            schema: {
                                $ref: '#/components/schemas/400-user-nickname-already-exist',
                            },
                        },
                    },
                },
            },
        },
    },
};

const authJoin = {
    '/api/v1/auth/join': {
        post: {
            summary: 'Join Service',
            tags: ['/api/v1/auth'],
            requestBody: {
                required: true,
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            properties: {
                                nickname: {
                                    type: 'string',
                                    example: 'nickname',
                                },
                                email: {
                                    type: 'string',
                                    example: 'email',
                                },
                                password: {
                                    type: 'string',
                                    example: 'password',
                                },
                            },
                            required: ['nickname', 'email', 'password'],
                        },
                    },
                },
            },
            responses: {
                200: {
                    description: 'OK',
                    content: {
                        'application/json': {
                            schema: {
                                $ref: '#/components/schemas/200',
                            },
                        },
                    },
                },
                400: {
                    description: 'Nickname already in used',
                    content: {
                        'application/json': {
                            schema: {
                                $ref: '#/components/schemas/400-fail-to-register-user',
                            },
                        },
                    },
                },
            },
        },
    },
};

const authLogin = {
    '/api/v1/auth/login': {
        post: {
            summary: 'Login Service',
            tags: ['/api/v1/auth'],
            requestBody: {
                required: true,
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            properties: {
                                nickname: {
                                    type: 'string',
                                    example: 'nickname',
                                },
                                password: {
                                    type: 'string',
                                    example: 'password',
                                },
                            },
                            required: ['nickname', 'email', 'password'],
                        },
                    },
                },
            },
            responses: {
                200: {
                    description: 'OK',
                    content: {
                        'application/json': {
                            schema: {
                                $ref: '#/components/schemas/200-with-token',
                            },
                        },
                    },
                },
                401: {
                    description: 'Password unmatched',
                    content: {
                        'application/json': {
                            schema: {
                                $ref: '#/components/schemas/401-user-password-unmatched',
                            },
                        },
                    },
                },
            },
        },
    },
};

const authRefresh = {
    '/api/v1/auth/refresh': {
        post: {
            summary: 'Refresh Token',
            tags: ['/api/v1/auth'],
            responses: {
                200: {
                    description: 'OK',
                    content: {
                        'application/json': {
                            schema: {
                                $ref: '#/components/schemas/200-with-token',
                            },
                        },
                    },
                },
                419: {
                    description: 'Token Expired',
                    content: {
                        'application/json': {
                            schema: {
                                $ref: '#/components/schemas/419',
                            },
                        },
                    },
                },
            },
        },
    },
};

const authLogout = {
    '/api/v1/auth/logout': {
        post: {
            summary: 'Refresh Token',
            tags: ['/api/v1/auth'],
            responses: {
                200: {
                    description: 'OK',
                    content: {
                        'application/json': {
                            schema: {
                                $ref: '#/components/schemas/200',
                            },
                        },
                    },
                },
            },
        },
    },
};

const authWithdraw = {
    '/api/v1/auth/withdraw': {
        delete: {
            summary: 'Refresh Token',
            tags: ['/api/v1/auth'],
            requestBody: {
                required: true,
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            properties: {
                                password: {
                                    type: 'string',
                                    example: 'password',
                                },
                            },
                            required: ['password'],
                        },
                    },
                },
            },
            responses: {
                200: {
                    description: 'OK',
                    content: {
                        'application/json': {
                            schema: {
                                $ref: '#/components/schemas/200',
                            },
                        },
                    },
                },
                401: {
                    description: 'Token Expired',
                    content: {
                        'application/json': {
                            schema: {
                                $ref: '#/components/schemas/401-user-password-unmatched',
                            },
                        },
                    },
                },
            },
        },
    },
};

module.exports = {
    ...authCheckEmail,
    ...authCheckNickname,
    ...authJoin,
    ...authLogin,
    ...authRefresh,
    ...authLogout,
    ...authWithdraw,
};
