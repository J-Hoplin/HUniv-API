const request = require('supertest');
const app = require('../../../app');
const Code = require('../../../Code');

describe('Notice API check', () => {
    test('Test /api/v1/notice/{type} normal request', async () => {
        const response = await request(app).get('/api/v1/notice/normal');
        expect(response.body.code).toEqual(Code.OK.apiCode);
        expect(response.statusCode).toEqual(Code.OK.httpCode);
    });
    test('Test /api/v1/notice/{type} abnormal request', async () => {
        const response = await request(app).get('/api/v1/notice/abnormal');
        expect(response.body.code).toEqual(Code.NOTICE_INVALID_TYPE.apiCode);
        expect(response.statusCode).toEqual(Code.NOTICE_INVALID_TYPE.httpCode);
    });
    test('Test /api/v1/notice/{type}/{number} normal request', async () => {
        const response = await request(app).get('/api/v1/notice/normal/1000');
        expect(response.body.code).toEqual(Code.OK.apiCode);
        expect(response.statusCode).toEqual(Code.OK.httpCode);
    });
    test('Test /api/v1/notice/{type}/{number} abnormal request', async () => {
        const response = await request(app).get('/api/v1/notice/normal/100000');
        expect(response.body.code).toEqual(Code.NOTICE_UNABLE_TO_FIND.apiCode);
        expect(response.statusCode).toEqual(Code.NOTICE_UNABLE_TO_FIND.httpCode);
    });
});
