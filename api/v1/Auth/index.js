const { Router } = require('express');
const component = require('./component');
const Codes = require('../../../Code');
const {
    verifyToken,
    generateToken,
    refreshTokenPreprocess,
    refreshTokenRegenrate,
    commonRateLimiter,
    bodyValidate,
} = require('../../../middlewares');
const validator = require('../../../validator').Auth;

const router = Router();

router.post('/check-email', commonRateLimiter, bodyValidate(validator.validateCheckEmail), async (req, res, next) => {
    try {
        await component.authCheckEmail(req);
        return res.send(Codes.OK.httpCode).json(Codes.messageCommon(Codes.OK));
    } catch (err) {
        return next(err);
    }
});

router.post('/check-nickname', commonRateLimiter, bodyValidate(validator.validateCheckNickname), async (req, res, next) => {
    try {
        await component.authCheckNickname(req);
        return res.status(Codes.OK.httpCode).json(Codes.messageCommon(Codes.OK));
    } catch (err) {
        return next(err);
    }
});

router.post('/join', commonRateLimiter, bodyValidate(validator.validateJoin), async (req, res, next) => {
    try {
        const id = await component.authJoin(req);
        return res.status(Codes.OK.httpCode).json(Codes.messageWithData(Codes.OK, { id }));
    } catch (err) {
        return next(err);
    }
});

router.post(
    '/login',
    commonRateLimiter,
    bodyValidate(validator.validateLogin),
    async (req, res, next) => {
        try {
            const id = await component.authLogin(req);
            req.user = { id };
            return next();
        } catch (err) {
            return next(err);
        }
    },
    generateToken,
);

router.post('/refresh', commonRateLimiter, refreshTokenPreprocess, refreshTokenRegenrate);
router.post('/logout', commonRateLimiter, verifyToken, async (req, res, next) => {
    try {
        await component.logout(req);
        return res.status(Codes.OK.httpCode).json(
            Codes.messageCommon(Codes.OK),
        );
    } catch (err) {
        return next(err);
    }
});

router.delete('/withdraw', commonRateLimiter, verifyToken, bodyValidate(validator.validateWithdraw), async (req, res, next) => {
    try {
        await component.authWithdraw(req);
        return res.status(Codes.OK.httpCode).json(Codes.messageCommon(Codes.OK));
    } catch (err) {
        return next(err);
    }
});

module.exports = router;
