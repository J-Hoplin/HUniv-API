const Codes = require('../../../Code');
const redis = require('../../../redis');

const resultFieldMapper = (result) => {
    const fields = ['no', 'title', 'author', 'atts', 'createdAt', 'views', 'type'];
    return result.map((x) => x.reduce((acc, cur, index) => {
        acc[fields[index]] = cur;
        return acc;
    }, {}));
};

exports.checkInstanceAvailable = async (req, res, next) => {
    if (!req.instance) {
        return res.status(Codes.NOTICE_INVALID_TYPE.httpCode).json(
            Codes.messageCommon(Codes.NOTICE_INVALID_TYPE),
        );
    }
    return next();
};

exports.getTypeInstance = (req, res, next) => {
    try {
        const {
            type,
        } = req.params;
        req.instance = req.app.get(`scraper_${type}`);
        return next();
    } catch (err) {
        return next(err);
    }
};

exports.getNoticeByTypeListAll = async (req, res, next) => {
    try {
        const {
            instance,
        } = req;
        const result = resultFieldMapper(await instance.scanWholeBoardList());
        await redis.setEx(
            req.originalUrl,
            parseInt(process.env.CACHE_EXPIRE_TIME, 10),
            JSON.stringify(result),
        );
        return res.status(Codes.OK.httpCode).json(
            Codes.messageWithData(Codes.OK, result),
        );
    } catch (err) {
        return next(err);
    }
};

exports.getNoticeByTypeList = async (req, res, next) => {
    try {
        let {
            limit,
            offset,
        } = req.query;
        const {
            instance,
        } = req;
        limit = parseInt(limit, 10) || process.env.DEFAULT_LIMIT;
        offset = parseInt(offset, 10) * process.env.DEFAULT_PAGINATION
            || process.env.DEFAULT_OFFSET * process.env.DEFAULT_PAGINATION;
        const result = resultFieldMapper(await instance.getByLimitOffset(offset, limit));
        await redis.setEx(
            req.originalUrl,
            parseInt(process.env.CACHE_EXPIRE_TIME, 10),
            JSON.stringify(result),
        );
        return res.status(Codes.OK.httpCode).json(
            Codes.messageWithData(Codes.OK, result),
        );
    } catch (err) {
        return next(err);
    }
};

exports.getNoticeByTypeNumber = async (req, res, next) => {
    try {
        const {
            number,
        } = req.params;
        const {
            instance,
        } = req;
        const result = resultFieldMapper(await instance.searchByNoticeNumber(number));
        if (result.length <= 0) {
            return res.status(Codes.NOTICE_UNABLE_TO_FIND.httpCode).json(
                Codes.messageCommon(Codes.NOTICE_UNABLE_TO_FIND),
            );
        }
        await redis.setEx(
            req.originalUrl,
            parseInt(process.env.CACHE_EXPIRE_TIME, 10),
            JSON.stringify(result),
        );
        return res.status(Codes.OK.httpCode).json(
            Codes.messageWithData(Codes.OK, result),
        );
    } catch (err) {
        return next(err);
    }
};
