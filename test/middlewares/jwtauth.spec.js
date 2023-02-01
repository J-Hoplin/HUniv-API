const middleware = require('../../middlewares/jwtauth');
const Codes = require('../../Code');
const redis = require('../../redis');

describe('JWT middleware test', () => {
    const req = {
        user: { id: 'jestesid' },
    };
    const res = {
        status: jest.fn(() => res),
        json: jest.fn((x) => x),
    };
    const next = jest.fn();
    let token = '';

    test('Generate token with ID', async () => {
        token = (await middleware.generateToken(req, res, next)).token;
        expect(res.status).toBeCalledWith(Codes.OK.httpCode);
        expect(res.json).toBeCalledWith(Codes.messageWithToken(Codes.OK, token));
    });

    test('Check redis has refreshtoken of user', async () => {
        const result = await redis.get(req.user.id);
        expect(result === undefined).toBe(false);
    });
});
