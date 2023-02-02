exports.BaseClass = class BaseClass extends Error {
    constructor(msg, apiCode, code) {
        super(msg);
        this.apiCode = apiCode;
        this.code = code;
    }
};
