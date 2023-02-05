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

const mockUser3 = {
    nickname: 'mockuser3',
    password: 'mockpassword3',
    role: 'user',
    email: 'mockemail3@mail.com',
};
const mockUser3Info = {
    id: '',
    token: '',
};
const TokenFormat = (token) => `Bearer ${token}`;
beforeAll(async () => {
    // remove value before test
    await redis.del(req.url);
    await sequelize.sync();
});

describe('Common middleware check', () => {
    test('Enroll mockuser1', async () => {
        const response = await request(app)
            .post('/api/v1/auth/join')
            .set('Accept', 'application/json')
            .type('application/json')
            .send(mockUser3);
        mockUser3Info.id = response.body.data.id;
        expect(mockUser3Info.id).not.toBeUndefined();
        expect(response.status).toBe(Codes.OK.httpCode);
        expect(response.body).toEqual(Codes.messageWithData(Codes.OK, {
            id: mockUser3Info.id,
        }));
    });
    test('User login : Correct password', async () => {
        const response = await request(app)
            .post('/api/v1/auth/login')
            .set('Accept', 'application/json')
            .type('application/json')
            .send(mockUser3);
        mockUser3Info.token = TokenFormat(response.body.token);
        expect(response.status).toBe(Codes.OK.httpCode);
        expect(response.body.token).not.toBeUndefined();
        // delete key of test url for next step
        await redis.del(req.originalUrl);
    });

    test('If url unable to cache', async () => {
        await middleware.cacheHit(req, res, next);
        expect(next).toBeCalledTimes(1);
    });

    test('Request to example url. This will make cache data and save to redis', async () => {
        const response = await request(app)
            .get(req.url)
            .set('Authorization', mockUser3Info.token);
        cache = response.body.data;
        expect(response.body.code).toEqual(Codes.OK.apiCode);
        expect(response.statusCode).toEqual(Codes.OK.httpCode);
    });

    test('Check if cache hit successful', async () => {
        await middleware.cacheHit(req, res, next);
        expect(res.status).toBeCalledWith(Codes.OK.httpCode);
        expect(res.json).toBeCalledWith(Codes.messageWithData(Codes.OK, cache));
    });
    test('User withdraw', async () => {
        const response = await request(app)
            .delete('/api/v1/auth/withdraw')
            .set('Accept', 'application/json')
            .set('Authorization', mockUser3Info.token)
            .type('application/json')
            .send(mockUser3);
        expect(response.status).toBe(Codes.OK.httpCode);
    });
});
