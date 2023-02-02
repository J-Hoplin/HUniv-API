const { BaseClass } = require('../base');

exports.UserNicknameAlreadyExist = class UserNicknameAlreadyExist extends BaseClass {
    constructor(value) {
        super(`Nickname with ${value} already in used`, 1201, 400);
    }
};
