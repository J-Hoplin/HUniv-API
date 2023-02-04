const Codes = require('../../../Code');
const redis = require('../../../redis');
const { UnsupportedRegion } = require('../../../Exceptions/api').v1.WeatherException;

exports.getTypeInstance = (req, res, next) => {
    const {
        campus,
    } = req.params;
    req.instance = req.app.get(`weather_${campus}`);
    return next();
};

exports.getWeatherInformation = async (req) => {
    const ins = req.instance;
    if (!ins) {
        throw new UnsupportedRegion(req.params.campus);
    }
    const result = await ins.getWeatherInfo();
    await redis.setEx(
        req.originalUrl,
        parseInt(process.env.WEATHER_CACHE_EXPIRE_TIME, 10),
        JSON.stringify(result),
    );
    return result;
};
