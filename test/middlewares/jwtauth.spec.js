const jwt = require('jsonwebtoken');
const middleware = require('../../middlewares/jwtauth');
const Codes = require('../../Code');
const redis = require('../../redis');

const TokenFormat = (token) => `Bearer ${token}`;
const req = {
    user: { id: 'jestesid' },
};
const res = {
    status: jest.fn(() => res),
    json: jest.fn((x) => x),
};
const next = jest.fn();
let token = '';

describe('JWT middleware test', () => {
    test('Generate token with ID', async () => {
        token = (await middleware.generateToken(req, res, next)).token;
        expect(res.status).toBeCalledWith(Codes.OK.httpCode);
        expect(res.json).toBeCalledWith(Codes.messageWithToken(Codes.OK, token));
    });

    test('Check redis has refreshtoken of user', async () => {
        const result = await redis.get(req.user.id);
        expect(result === undefined).toBe(false);
    });

    test('If token not exist in header or invalid', async () => {
        await middleware.verifyToken(req, res, next);
        expect(res.status).toBeCalledWith(Codes.JWT_INVALID_TOKEN.httpCode);
        expect(res.json).toBeCalledWith(Codes.messageCommon(Codes.JWT_INVALID_TOKEN));
    });

    test('If token is expired token', async () => {
        const testToken = jwt.sign(
            {
                id: req.user.id,
            },
            process.env.JWT_SECRET,
            {
                expiresIn: '0s',
                issuer: process.env.JWT_ISSUER,
            },
        );
        req.headers = {
            authorization: TokenFormat(testToken),
        };
        await middleware.verifyToken(req, res, next);
        expect(res.status).toBeCalledWith(Codes.JWT_EXPIRED.httpCode);
        expect(res.json).toBeCalledWith(Codes.messageCommon(Codes.JWT_EXPIRED));
    });

    test('If token is expired token and refreshtoken not exist. User try to refresh token', async () => {
        await middleware.refreshTokenPreprocess(req, res, next);
        expect(next).toBeCalledTimes(1);
        delete req.headers;
    });

    test('User fail to refresh token. Because refresh token not exist in redis.', async () => {
        req.refresh = {
            id: req.user.id,
            token: undefined,
        };
        await middleware.refreshTokenRegenrate(req, res, next);
        expect(res.status).toBeCalledWith(Codes.JWT_EXPIRED.httpCode);
        expect(res.json).toBeCalledWith(Codes.messageCommon(Codes.JWT_EXPIRED));
        delete req.refresh;
    });

    test('Verify if token is available', async () => {
        req.headers = {
            authorization: TokenFormat(token),
        };
        await middleware.verifyToken(req, res, next);
        // mock function이 위에서부터 몇번 호출됐는지를 센다.
        expect(next).toBeCalledTimes(2);
    });

    test('Refreshtoken Pre-process', async () => {
        await middleware.refreshTokenPreprocess(req, res, next);
        expect(next).toBeCalledTimes(3);
    });

    test('Get refreshed token', async () => {
        req.refresh = {
            id: req.user.id,
            token: (await redis.get(req.user.id)),
        };
        const refreshedToken = (await middleware.refreshTokenRegenrate(req, res, next)).token;
        expect(res.status).toBeCalledWith(Codes.OK.httpCode);
        expect(refreshedToken).not.toBeUndefined();
    });
});

afterAll(async () => {
    await redis.del(req.user.id);
});
