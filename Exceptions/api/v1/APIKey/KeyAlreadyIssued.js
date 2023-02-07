const { BaseClass } = require('../base');

exports.KeyAlreadyIssued = class KeyAlreadyIssued extends BaseClass {
    constructor() {
        super('Key already issued', 1502, 400);
    }
};
