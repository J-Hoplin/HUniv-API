const format = (msg, apiCode, httpCode = 200) => ({
    httpCode,
    apiCode,
    msg,
});

exports.buildFormat = (msg, apiCode, httpCode = 200) => format(msg, apiCode, httpCode);

exports.messageCommon = (Code) => ({
    code: Code.apiCode,
    msg: Code.msg,
});

exports.messageWithData = (Code, data) => ({
    code: Code.apiCode,
    msg: Code.msg,
    data,
});

exports.messageWithToken = (Code, token) => ({
    code: Code.apiCode,
    msg: Code.msg,
    token,
});

exports.OK = format('OK', 200, 200);
exports.OK_POST = format('OK', 201, 201);

// HTTP Common
exports.API_FORBIDDEN = format('Forbidden api', 403, 403);
exports.API_BLOCKED = format('Blocked api', 403, 403);
exports.API_DEPRECATED = format('API Deprecated', 410, 410);
exports.API_UNAUTHORIZED = format('Unauthorized', 401, 401);

// token apiCode : 1000
exports.JWT_EXPIRED = format('token expired', 1000, 419);
exports.INVALID_TOKEN = format('invalid token', 1001, 419);
// Notice API
exports.NOTICE_UNABLE_TO_FIND = format('Unable to find notice', 1100, 400);
