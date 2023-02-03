const { BaseClass } = require('../base');

exports.UserEmailAlreadyExist = class UserEmailAlreadyExist extends BaseClass {
    constructor(value) {
        super(`Email ${value} already in used`, 1200, 400);
    }
};
