const { BaseClass } = require('../base');

exports.UserNotFound = class UserNotFound extends BaseClass {
    constructor(id) {
        super(`User with id ${id} not found`, 1600, 400);
    }
};
