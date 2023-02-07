const common = require('./common');
const jwt = require('./jwtauth');
const validate = require('./validate');
const apiKey = require('./apiKey');

module.exports = {
    ...common,
    ...jwt,
    ...validate,
    ...apiKey,
};
