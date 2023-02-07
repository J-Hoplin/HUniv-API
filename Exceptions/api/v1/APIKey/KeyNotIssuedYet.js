const { BaseClass } = require('../base');

exports.KeyNotIssuedYet = class KeyNotIssuedYet extends BaseClass {
    constructor() {
        super('Key not issued yet', 1503, 400);
    }
};
