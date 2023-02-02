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
exports.JWT_EXPIRED = format('Token expired', 1000, 419);
exports.JWT_INVALID_TOKEN = format('invalid token', 1001, 419);
exports.JWT_TOKEN_NOT_FOUND = format('JWT token not found', 1002, 401);

// Notice API
exports.NOTICE_INVALID_TYPE = format('Invalid notice type', 1100, 400);
exports.NOTICE_UNABLE_TO_FIND = format('Unable to find notice', 1101, 400);

// User Auth API
exports.USER_EMAIL_ALREADY_EXIST = format('User email already exist', 1200, 400);
exports.USER_NICKNAME_ALREADY_EXIST = format('User nickname already exist', 1201, 400);
exports.USER_NICKNAME_OR_EMAIL_ALREADY_EXIST = format('User nickname or email already exist', 1202, 400);
