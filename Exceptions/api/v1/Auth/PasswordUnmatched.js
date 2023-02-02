const { BaseClass } = require('../base');

exports.PasswordUnmatched = class PasswordUnmatched extends BaseClass {
    constructor() {
        super('User password unmatched', 1203, 401);
    }
};
