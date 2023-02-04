const Notice = require('./Notice');
const Auth = require('./Auth');
const Weather = require('./Weather');

module.exports = {
    ...Notice,
    ...Auth,
    ...Weather,
};
