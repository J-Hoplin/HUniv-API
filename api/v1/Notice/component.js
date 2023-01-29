const Codes = require('../../../Code');

const resultFieldMapper = (result) => {
    const fields = ['no', 'title', 'author', 'atts', 'createdAt', 'views', 'type'];
    return result.map((x) => x.reduce((acc, cur, index) => {
        acc[fields[index]] = cur;
        return acc;
    }, {}));
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
        return res.status(Codes.OK.httpCode).json(
            Codes.messageWithData(Codes.OK, result),
        );
    } catch (err) {
        return next(err);
    }
};
