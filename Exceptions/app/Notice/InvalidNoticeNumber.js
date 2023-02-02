exports.InvalidNoticeNumber = class InvalidNoticeNumber extends Error {
    code = 500;

    constructor(value) {
        super(`Invalid notice number '${value}'`);
    }
};
