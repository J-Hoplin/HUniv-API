const UserEmailAlreadyExist = require('./UserEmailAlreadyExist');
const UserNicknameAlreadyExist = require('./UserNicknameAlreadyExist');
const UserRegisterFailed = require('./UserRegisterFailed');
const PasswordUnmatched = require('./PasswordUnmatched');

module.exports = {
    ...UserEmailAlreadyExist,
    ...UserNicknameAlreadyExist,
    ...UserRegisterFailed,
    ...PasswordUnmatched,
};
