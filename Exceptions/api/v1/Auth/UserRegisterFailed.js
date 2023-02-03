const { BaseClass } = require('../base');

exports.UserRegisterFailed = class UserRegisterFailed extends BaseClass {
    constructor() {
        super('Email or Nickname already in used', 1202, 400);
    }
};
