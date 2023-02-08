const RateLimit = require('express-rate-limit');
const qs = require('querystring');
const redis = require('../redis');
const Code = require('../Code');
const { User } = require('../models');

// Check user role and save in req.userRole
exports.checkUserRole = async (req, res, next) => {
    const {
        id,
    } = req.decoded;
    req.userRole = await User.findOne({
        attributes: ['role'],
        raw: true,
        where: {
            id,
        },
    });
    return next();
};

// Cache Checking
exports.cacheHit = async (req, res, next) => {
    try {
        const search = await redis.get(req.originalUrl);
        if (search) {
            return res.status(Code.OK.httpCode).json(
                // Convert stringfied json to JS object
                // To save Object to redis, require to stringfy object
                Code.messageWithData(Code.OK, JSON.parse(search)),
            );
        }
        return next();
    } catch (err) {
        return next(err);
    }
};
// for deprecated API
exports.deprecated = async (req, res) => res.status(Code.API_DEPRECATED.httpCode).json(
    Code.messageCommon(Code.API_DEPRECATED),
);

/**
 * windowMs : 기준시간. ms단위로 넣어준다
 * max : 허용횟수. 숫자로 해도되고, 함수를 넣어주어도 된다.
 * handler : 제한 초과시 콜백함수
 * keyGenerator : 제한 횟수를 카운트 할 키를 지정한다. 기본값은 IP이다.
 */

// Rate limiter for normal APIs
exports.commonRateLimiter = RateLimit({
    windowMs: 60 * 1000,
    max: 60,
    handler: (req, res) => res
        .status(Code.API_LIMIT_LOCK.httpCode)
        .json(Code.messageCommon(Code.API_LIMIT_LOCK)),
    keyGenerator: (req, res) => req.ip,
});

// Rate limiter for service APIs
// This limiter require to be after verifyToken middleware
exports.serviceRateLimiter = RateLimit({
    windowMs: 60 * 1000,
    max: (req, res) => (req.userRole === 'admin' ? 300 : 70),
    handler: (req, res) => res
        .status(Code.API_LIMIT_LOCK.httpCode)
        .json(Code.messageCommon(Code.API_LIMIT_LOCK)),
    keyGenerator: (req, res) => req.query.key,
});
