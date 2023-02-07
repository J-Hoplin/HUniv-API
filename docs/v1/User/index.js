const getCheckInfo = {
    '/api/v1/user/get-info': {
        get: {
            summary: 'Get user information with id',
            tags: ['/api/v1/user'],
            parameters: [{
                in: 'query',
                name: 'id',
                required: true,
                schema: {
                    type: 'string',
                },
                description: 'User\'s ID',
            }],
            responses: {
                200: {
                    description: 'OK',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    code: {
                                        type: 'integer',
                                        example: 200,
                                    },
                                    msg: {
                                        type: 'string',
                                        example: 'OK',
                                    },
                                    data: {
                                        type: 'object',
                                        properties: {
                                            id: {
                                                type: 'string',
                                                example: 'cad4a46c-fd00-4beb-88d3-2d469af384f1',
                                            },
                                            nickname: {
                                                type: 'string',
                                                example: 'nickname',
                                            },
                                            email: {
                                                type: 'string',
                                                example: 'email@email.com',
                                            },
                                            role: {
                                                type: 'string',
                                                example: 'user',
                                            },
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
            },
        },
    },
};

const getUserList = {
    '/api/v1/user/get-list': {
        get: {
            summary: 'Get user list',
            tags: ['/api/v1/user'],
            parameters: [{
                in: 'query',
                name: 'limit',
                schema: {
                    type: 'integer',
                    example: 10,
                },
                description: 'Limit',
            }, {
                in: 'query',
                name: 'offset',
                schema: {
                    type: 'offset',
                    example: 0,
                },
                description: 'Offset',
            }],
            responses: {
                200: {
                    description: 'OK',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    code: {
                                        type: 'integer',
                                        example: 200,
                                    },
                                    msg: {
                                        type: 'string',
                                        example: 'OK',
                                    },
                                    data: {
                                        type: 'object',
                                        properties: {
                                            id: {
                                                type: 'string',
                                                example: 'cad4a46c-fd00-4beb-88d3-2d469af384f1',
                                            },
                                            nickname: {
                                                type: 'string',
                                                example: 'nickname',
                                            },
                                            email: {
                                                type: 'string',
                                                example: 'email@email.com',
                                            },
                                            role: {
                                                type: 'string',
                                                example: 'user',
                                            },
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
            },
        },
    },
};

const putChangePassword = {
    '/api/v1/user/change-password': {
        put: {
            summary: 'Get user list',
            tags: ['/api/v1/user'],
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
                                newpassword: {
                                    type: 'string',
                                    example: 'newpassword',
                                },
                            },
                            required: ['password', 'newpassword'],
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

module.exports = {
    ...getCheckInfo,
    ...getUserList,
    ...putChangePassword,
};
