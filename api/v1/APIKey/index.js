const { Router } = require('express');
const component = require('./component');
const Codes = require('../../../Code');
const {
    verifyToken,
    commonRateLimiter,
} = require('../../../middlewares');

const router = Router();

router.get(
    '/check-token',
    verifyToken,
    commonRateLimiter,
    async (req, res, next) => {
        try {
            const checkToken = await component.getCheckToken(req);
            return res
                .status(Codes.OK.httpCode)
                .json(Codes.messageWithToken(Codes.OK, checkToken));
        } catch (err) {
            return next(err);
        }
    },
);

router.get(
    '/issue',
    verifyToken,
    commonRateLimiter,
    async (req, res, next) => {
        try {
            const token = await component.getIssueAPIToken(req);
            return res.status(Codes.OK.httpCode).json(
                Codes.messageWithToken(Codes.OK, token),
            );
        } catch (err) {
            return next(err);
        }
    },
);

router.get(
    '/refresh',
    verifyToken,
    commonRateLimiter,
    async (req, res, next) => {
        try {
            const token = await component.getRefreshedToken(req);
            return res.status(Codes.OK.httpCode).json(
                Codes.messageWithToken(Codes.OK, token),
            );
        } catch (err) {
            return next(err);
        }
    },
);

module.exports = router;
