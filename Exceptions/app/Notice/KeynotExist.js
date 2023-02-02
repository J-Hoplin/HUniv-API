exports.KeynotExist = class KeynotExist extends Error {
    code = 500;

    constructor(value) {
        super(`Key not found : ${value}`);
    }
};
