const { Router } = require('express');
const component = require('./component');
const Codes = require('../../../Code');
const {
    cacheHit,
} = require('../../../middlewares');

const router = Router();

router.get('/:campus', cacheHit, component.getTypeInstance, async (req, res, next) => {
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
