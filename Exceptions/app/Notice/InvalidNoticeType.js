exports.InvalidNoticeType = class InvalidNoticeType extends Error {
    code = 400;

    constructor(value) {
        super(`Invalid notice type ${value}`);
    }
};
