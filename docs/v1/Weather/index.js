const getWeatherInformation = {
    '/api/v1/weather/{campus}': {
        get: {
            summary: 'Get weather information about campus',
            tags: ['/api/v1/weather'],
            parameters: [{
                in: 'path',
                name: 'campus',
                required: true,
                schema: {
                    type: 'string',
                    enum: ['seoulcampus', 'sejongcampus'],
                },
                description: 'Get weather of campus',
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
                                            name: {
                                                type: 'string',
                                                example: 'Campus Name',
                                            },
                                            weather: {
                                                type: 'string',
                                                example: 'Clear',
                                            },
                                            weather_icon: {
                                                type: 'string',
                                                example: 'Weather icon URL',
                                            },
                                            descrption: {
                                                type: 'string',
                                                example: 'clear sky',
                                            },
                                            temperature: {
                                                type: 'number',
                                                example: -2.02,
                                            },
                                            temperature_humanfeel: {
                                                type: 'number',
                                                example: -2.02,
                                            },
                                            temp_min: {
                                                type: 'number',
                                                example: -2.02,
                                            },
                                            temp_max: {
                                                type: 'number',
                                                example: -2.02,
                                            },
                                            pressure: {
                                                type: 'integer',
                                                example: 1027,
                                            },
                                            humidity: {
                                                type: 'integer',
                                                example: 75,
                                            },
                                            windspeed: {
                                                type: 'number',
                                                example: 0.76,
                                            },
                                            cloudpercentage: {
                                                type: 'integer',
                                                example: 0,
                                            },
                                            sunrise: {
                                                type: 'integer',
                                                example: 1675549801,
                                            },
                                            sunset: {
                                                type: 'integer',
                                                example: 1675549801,
                                            },
                                            measuredTime: {
                                                type: 'integer',
                                                example: 1675549801,
                                            },
                                            pm2_5: {
                                                type: 'number',
                                                example: 73.58,
                                            },
                                            pm10: {
                                                type: 'number',
                                                example: 86.95,
                                            },
                                            co: {
                                                type: 'number',
                                                example: 574.11,
                                            },
                                            aqi: {
                                                type: 'string',
                                                example: '좋음',
                                            },
                                            measuredTime_airpollution: {
                                                type: 'integer',
                                                example: 1675533699,
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

module.exports = {
    ...getWeatherInformation,
};
