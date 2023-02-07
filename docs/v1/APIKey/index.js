const getCheckToken = {
    '/api/v1/api-token/check-token': {
        get: {
            summary: 'Check issued token. If token not issued, error will return',
            tags: ['/api/v1/api-token'],
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
                400: {
                    description: 'User api Key not issued but request for get issued token',
                    content: {
                        'application/json': {
                            schema: {
                                $ref: '#/components/schemas/400-key-not-issued',
                            },
                        },
                    },
                },
            },
        },
    },
};

const getAPIKey = {
    '/api/v1/api-token/issue': {
        get: {
            summary: 'Get API token. Token will be expired 90d after token has been issued.',
            tags: ['/api/v1/api-token'],
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
                400: {
                    description: 'User api Key already issued but request for issue again',
                    content: {
                        'application/json': {
                            schema: {
                                $ref: '#/components/schemas/400-key-already-issued',
                            },
                        },
                    },
                },
            },
        },
    },
};

const getRefreshedToken = {
    '/api/v1/api-token/refresh': {
        get: {
            summary: 'Refresh API Token. If user api token not issued, error will return',
            tags: ['/api/v1/api-token'],
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
                400: {
                    description: 'User api Key not issued but request for refresh',
                    content: {
                        'application/json': {
                            schema: {
                                $ref: '#/components/schemas/400-key-not-issued',
                            },
                        },
                    },
                },
            },
        },
    },
};

module.exports = {
    ...getCheckToken,
    ...getAPIKey,
    ...getRefreshedToken,
};
