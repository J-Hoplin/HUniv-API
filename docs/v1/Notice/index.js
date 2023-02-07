const getNoticeByTypeList = {
    '/api/v1/notice/{type}': {
        get: {
            summary: 'Get notice list by type. Default offset 0, limit 10',
            tags: ['/api/v1/notice'],
            parameters: [{
                in: 'path',
                name: 'type',
                required: true,
                schema: {
                    type: 'string',
                    enum: ['normal', 'student', 'sejong-campus', 'events'],
                },
                description: 'notice type',
            }, {
                in: 'query',
                name: 'offset',
                schema: {
                    type: 'integer',
                },
                example: 0,
                description: 'offset(Default is 0)',
            }, {
                in: 'query',
                name: 'limit',
                schema: {
                    type: 'integer',
                },
                example: 10,
                description: 'limit(Default is 10)',
            }, {
                in: 'header',
                name: 'hkey',
                required: true,
                schema: {
                    type: 'string',
                },
                example: 'cad4a46c-fd00-4beb-88d3-2d469af384f1',
                description: 'API Key',
            }],
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
                    description: 'Invalid notice type',
                    content: {
                        'application/json': {
                            schema: {
                                $ref: '#/components/schemas/400-invalid-post-type',
                            },
                        },
                    },
                },
            },
        },
    },
};

const getNoticeByTypeNumber = {
    '/api/v1/notice/{type}/{number}': {
        get: {
            summary: 'Get notice by type with notice number',
            tags: ['/api/v1/notice'],
            parameters: [{
                in: 'path',
                name: 'type',
                required: true,
                schema: {
                    type: 'string',
                    enum: ['normal', 'student', 'sejong-campus', 'events'],
                },
                description: 'notice type',
            }, {
                in: 'path',
                name: 'number',
                required: true,
                schema: {
                    type: 'integer',
                },
                example: 1000,
                description: 'Notice number',
            }, {
                in: 'header',
                name: 'hkey',
                required: true,
                schema: {
                    type: 'string',
                },
                example: 'cad4a46c-fd00-4beb-88d3-2d469af384f1',
                description: 'API Key',
            }],
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
                    description: 'Invalid notice number',
                    content: {
                        'application/json': {
                            schema: {
                                $ref: '#/components/schemas/400-invalid-notice-number',
                            },
                        },
                    },
                },
            },
        },
    },
};

module.exports = { ...getNoticeByTypeList, ...getNoticeByTypeNumber };
