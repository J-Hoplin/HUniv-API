const redis = require('../redis');
const Code = require('../Code');

// Cache Checking
exports.cacheChecking = async (req, res, next) => {
    try {
        const search = await redis.get(req.url);
        if (search) {
            return res.status(Code.OK.httpCode).json(
                Code.messageCommon(Code.OK),
            );
        }
        return next();
    } catch (err) {
        return next(err);
    }
};
