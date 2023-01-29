exports.KeynotExist = class KeynotExist extends Error {
    constructor(value) {
        super(`Key not found : ${value}`);
    }
};

exports.AxiosError = class AxiosRequestError extends Error {
    constructor() {
        super('Axios error while request');
    }
};

exports.OffsetUnitMultiple = class OffsetUnitMultiple extends Error {
    constructor(unit) {
        super(`Offset should be multiple of ${unit}`);
    }
};

exports.InvalidNoticeType = class InvalidNoticeType extends Error {
    constructor(value) {
        super(`Invalid notice type ${value}`);
    }
};

exports.InvalidNoticeNumber = class InvalidNoticeNumber extends Error {
    constructor(value) {
        super(`Invalid notice number '${value}'`);
    }
};
