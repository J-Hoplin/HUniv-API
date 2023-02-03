const { Router } = require('express');
const component = require('./component');
const Codes = require('../../../Code');
const {
    verifyToken,
    generateToken,
    refreshTokenPreprocess,
    refreshTokenRegenrate,
} = require('../../../middlewares');

const router = Router();

router.post('/check-email', async (req, res, next) => {
    try {
        await component.authCheckEmail(req);
        return res.send(Codes.OK.httpCode).json(Codes.messageCommon(Codes.OK));
    } catch (err) {
        return next(err);
    }
});

router.post('/check-nickname', async (req, res, next) => {
    try {
        await component.authCheckNickname(req);
        return res.status(Codes.OK.httpCode).json(Codes.messageCommon(Codes.OK));
    } catch (err) {
        return next(err);
    }
});

router.post('/join', async (req, res, next) => {
    try {
        const id = await component.authJoin(req);
        return res.status(Codes.OK.httpCode).json(Codes.messageWithData(Codes.OK, { id }));
    } catch (err) {
        return next(err);
    }
});

router.post(
    '/login',
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

router.post('/refresh', refreshTokenPreprocess, refreshTokenRegenrate);
router.post('/logout', verifyToken, async (req, res, next) => {
    try {
        await component.logout(req);
        return res.status(Codes.OK.httpCode).json(
            Codes.messageCommon(Codes.OK),
        );
    } catch (err) {
        return next(err);
    }
});

router.delete('/withdraw', verifyToken, async (req, res, next) => {
    try {
        await component.authWithdraw(req);
        return res.status(Codes.OK.httpCode).json(Codes.messageCommon(Codes.OK));
    } catch (err) {
        return next(err);
    }
});

module.exports = router;
