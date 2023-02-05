exports.JoiValidationException = class JoiValidationException extends Error {
    constructor(message) {
        super(message);
        this.apiCode = 1400;
        this.code = 400;
    }
};
