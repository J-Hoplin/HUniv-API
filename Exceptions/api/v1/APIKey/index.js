const KeyAlreadyIssued = require('./KeyAlreadyIssued');
const KeyNotIssuedYet = require('./KeyNotIssuedYet');

module.exports = {
    ...KeyAlreadyIssued,
    ...KeyNotIssuedYet,
};
