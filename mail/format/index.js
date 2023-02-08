const issuedTokenRefreshed = require('./issuedTokenRefreshed');
const newTokenIssued = require('./newTokenIssued');

module.exports = {
    ...issuedTokenRefreshed,
    ...newTokenIssued,
};
