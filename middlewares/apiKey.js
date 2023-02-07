const { APIKey } = require('../mongo/schema');
const Codes = require('../Code');

// API key should be at header with key name 'hkey'
exports.validateAPIKey = async (req, res, next) => {
    const key = req.headers.hkey;
    /**
     * If (Schema).find() -> Array
     *
     * If (Schema).findOne() -> Object
     */
    const findKey = await APIKey.findOne({ apikey: key });
    if (!findKey) {
        return res.status(Codes.API_KEY_NEED_TO_BE_ISSUE.httpCode).json(
            Codes.messageCommon(Codes.API_KEY_NEED_TO_BE_ISSUE),
        );
    }
    return next();
};
