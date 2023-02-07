const { Router } = require('express');
const component = require('./component');
const Codes = require('../../../Code');
const {
    verifyToken,
    commonRateLimiter,
    bodyValidate,
    queryValidate,
} = require('../../../middlewares');
const {
    validateChangePassword,
    validateGetUserInfo,
    validateUserList,
} = require('../../../validator').User;

const router = Router();

router.get(
    '/get-info',
    commonRateLimiter,
    queryValidate(validateGetUserInfo),
    async (req, res, next) => {
        try {
            const user = await component.getUserInfo(req);
            return res.status(Codes.OK.httpCode).json(
                Codes.messageWithData(Codes.OK, user),
            );
        } catch (err) {
            return next(err);
        }
    },
);

router.get(
    '/get-list',
    commonRateLimiter,
    queryValidate(validateUserList),
    async (req, res, next) => {
        try {
            const userlist = await component.getUserList(req);
            return res.status(Codes.OK.httpCode).json(
                Codes.messageWithData(Codes.OK, userlist),
            );
        } catch (err) {
            return next(err);
        }
    },
);

router.put(
    '/change-password',
    commonRateLimiter,
    verifyToken,
    bodyValidate(validateChangePassword),
    async (req, res, next) => {
        try {
            await component.changePassword(req);
            return res.status(Codes.OK.httpCode).json(
                Codes.messageCommon(Codes.OK),
            );
        } catch (err) {
            return next(err);
        }
    },
);

module.exports = router;
