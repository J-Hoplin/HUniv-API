const Notice = require('./Notice');
const Auth = require('./Auth');
const Weather = require('./Weather');
const apiKey = require('./APIKey');
const User = require('./User');

module.exports = {
    ...Notice,
    ...Auth,
    ...Weather,
    ...apiKey,
    ...User,
};
