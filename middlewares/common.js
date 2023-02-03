const redis = require('../redis');
const Code = require('../Code');

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
