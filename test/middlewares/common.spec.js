const request = require('supertest');
const middleware = require('../../middlewares/common');
const Codes = require('../../Code');
const app = require('../../app');
const redis = require('../../redis');
const { sequelize } = require('../../models');

const req = {
    url: '/api/v1/notice/normal',
    originalUrl: '/api/v1/notice/normal',
};
const res = {
    status: jest.fn(() => res),
    json: jest.fn((x) => x),
};
const next = jest.fn();
let cache = '';

beforeAll(async () => {
    // remove value before test
    await redis.del(req.url);
    await sequelize.sync();
});

describe('Common middleware check', () => {
    test('If url unable to cache', async () => {
        await middleware.cacheHit(req, res, next);
        expect(next).toBeCalledTimes(1);
    });

    test('Request to example url. This will make cache data and save to redis', async () => {
        const response = await request(app).get(req.url);
        cache = response.body.data;
        expect(response.body.code).toEqual(Codes.OK.apiCode);
        expect(response.statusCode).toEqual(Codes.OK.httpCode);
    });

    test('Check if cache hit successful', async () => {
        await middleware.cacheHit(req, res, next);
        expect(res.status).toBeCalledWith(Codes.OK.httpCode);
        expect(res.json).toBeCalledWith(Codes.messageWithData(Codes.OK, cache));
    });
});
