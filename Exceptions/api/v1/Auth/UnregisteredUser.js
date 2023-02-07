const { BaseClass } = require('../base');

exports.UnregisteredUser = class UnregisteredUser extends BaseClass {
    constructor(nickname) {
        super(`User with ${nickname} not registered yet`, 1601, 400);
    }
};
