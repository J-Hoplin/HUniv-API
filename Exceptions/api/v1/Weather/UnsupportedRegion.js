const { BaseClass } = require('../base');

exports.UnsupportedRegion = class UnsupportedRegion extends BaseClass {
    constructor(value) {
        super(`Unsupported Region : ${value}`, 1300, 400);
    }
};
