const { Router } = require('express');
const component = require('./component');
const Codes = require('../../../Code');
const {
    cacheHit,
    verifyToken,
    serviceRateLimiter,
    paramValidate,
} = require('../../../middlewares');
const validator = require('../../../validator').Weather;

const router = Router();

router.get('/:campus', verifyToken, paramValidate(validator.validateInstanceType), serviceRateLimiter, cacheHit, component.getTypeInstance, async (req, res, next) => {
    try {
        const data = await component.getWeatherInformation(req);
        return res.status(Codes.OK.httpCode).json(
            Codes.messageWithData(Codes.OK, data),
        );
    } catch (err) {
        return next(err);
    }
});

module.exports = router;
