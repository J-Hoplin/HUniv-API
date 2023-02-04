const request = require('supertest');
const app = require('../../../app');
const Codes = require('../../../Code');
const { UnsupportedRegion } = require('../../../Exceptions').api.v1.WeatherException;

describe('Weather API test', () => {
    test('1. Request about unsupported campus', async () => {
        const wrongtype = 'unsupported';
        const wrongtypeExceptionMessage = new UnsupportedRegion(wrongtype);
        const response = await request(app).get(`/api/v1/weather/${wrongtype}`);
        expect(response.status).toBe(wrongtypeExceptionMessage.code);
        expect(response.body.msg).toBe(wrongtypeExceptionMessage.message);
    });

    test('2. Request to supported campus', async () => {
        const supportedtype = 'sejongcampus';
        const response = await request(app).get(`/api/v1/weather/${supportedtype}`);
        expect(response.status).toBe(Codes.OK.httpCode);
        expect(response.body.msg).toBe(Codes.OK.msg);
    });
});
